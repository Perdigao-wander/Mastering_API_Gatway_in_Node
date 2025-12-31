const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./models/user")
const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const {authenticate} = require("./middlewares/authMiddleware");
const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 3003
const JWT_SECRET = "17d1c04d81a10b8c327535a4da0e0ebebef0a6efddef7f405d15af21c35ecac6";
app.use(express.json());

const authSchemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});


async function connectDB() {
    await mongoose.connect("mongodb://localhost:27017/auth-db")
        .then(() => console.log("MongoDB conectado"))
        .catch((err) => console.error("Erro ao conectar a base de dados. Erro: \n"+err))
}

app.post("/auth/signup", async (req, res) => {

    try {
        const data = req.body;

        const {
            error
        } =  authSchemaLogin.validate(data);

        if (error) {
            return  res.status(400).json(error)
        }
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashPassword = bcrypt.hashSync(data.password, salt);

        const user = await UserModel.create({
            password: hashPassword,
            email: data.email
        });

        res.json({
            result: true,
            message: "Utilizador criado com sucesso...",
            email: user.email
        })
    } catch (error) {
        res.json({
            result: false,
            message: "Erro, o utilizador não foi criado",
            error
        })
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const data = req.body;
        const { error } = authSchemaLogin.validate(data);
        if (error) {
            return res.status(400).json(error);
        }

        const user = await UserModel.findOne({ email: data.email });
        if (!user) {
            return res.status(401).json({
                result: false,
                message: "Credenciais inválidas!"
            });
        }


        const matchedPassword = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!matchedPassword) {
            return res.status(401).json({
                result: false,
                message: "Credenciais inválidas!"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            result: true,
            message: "Login efetuado com sucesso",
            token
        });

    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Erro interno",
        });
    }
});

app.post("/auth/profile", authenticate ,async (req,res) => {
    try {

        const user = await UserModel.findOne({
            _id: req.user.id
        }, "email");

        if (!user) {
            return res.status(401).json({
                result: false,
                error: "UnAuthorized"
            });
        }

        return res.json({
            result: true,
            data: user,
        });


    } catch (error) {
        return res.status(500).json({
            result: false,
            message: "Erro interno",
        });
    }
});


app.use((err, req, res, next) => {
    console.log(err.stack)

    res.status(500).json({
        result: false,
        error: "Internal Server Error",
        message: err.message
    })
});

async function bootstrap() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Auth service is running at http://localhost:${PORT}`)
    });
}

bootstrap();

