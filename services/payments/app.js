const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001


app.get("/payments/:orderId", (req, res) => {
    res.json({
        result: true,
        message: "Pagamento feito com sucesso..."
    })
});

app.listen(PORT, () => {
    console.log(`Payment service is running at http://localhost:${PORT}`)
})