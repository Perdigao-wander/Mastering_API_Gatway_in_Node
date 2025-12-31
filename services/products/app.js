const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000


app.get("/products", (req, res) => {
    res.json({
        result: true,
        message: "Produtos carregados..."
    })
});

app.listen(PORT, () => {
    console.log(`Product service is running at http://localhost:${PORT}`)
})