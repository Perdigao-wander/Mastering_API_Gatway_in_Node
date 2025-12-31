const express = require("express");

const app = express();
const PORT = process.env.PORT || 3002


app.get("/orders", (req, res) => {
    res.json({
        result: true,
        message: "Pedido feito com sucesso..."
    })
});

app.listen(PORT, () => {
    console.log(`Order service is running at http://localhost:${PORT}`)
})