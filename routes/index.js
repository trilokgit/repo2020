const router = require("express").Router();
const apiKeyMiddleware = require("../middlewares/apiKey");


router.get("/", (req, res) => {
    res.render("index", {
        title: "My home page"
    });
});

router.get("/about", (req, res) => {
    res.render("about", {
        title:"About Page"
    });
});

// router.get("/api/products", apiKeyMiddleware, (req, res) => {
//     res.json([
//         {
//             id: "11",
//             name: "Chrome"
//         },
//         {
//             id: "12",
//             name: "Firebase"
//         }
//     ])
// });





module.exports = router;
