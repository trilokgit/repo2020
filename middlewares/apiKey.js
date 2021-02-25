function apiKey(req,res,next) {
    
    const api_key = "11255";
    console.log(req.query.api_key);
    const usrapikeys = req.query.api_key
    if (usrapikeys && (usrapikeys === api_key)) {
        next();
    } else {
        res.json({ message: "Not allowed!" });
    }
}

module.exports = apiKey;