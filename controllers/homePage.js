const Post = require("../database/models/Article")

module.exports = async (req, res) => {

    const posts = await Post.find({})
    console.log(posts)
    res.render("index", { posts })
}


