const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

const productRouter = require("./routes/products");

app.use(express.json());
app.set("view engine", "ejs");
const mainrouter = require("./routes/index");
app.use(productRouter);

app.use(express.static("public"));


app.use(express.urlencoded({ extended: false }));
app.use(mainrouter);

app.use((req,res,next) => {
    return res.json({ message: "page not found" });
});


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
