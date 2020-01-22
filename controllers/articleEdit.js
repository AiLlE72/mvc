const Post = require("../database/models/Article")

module.exports = async (req, res) => {
    
    
    const dbPost = await Post.findById(req.params.id)
    console.log(dbPost);
    if (req.session.userId) {
        return res.render("articles/modified", { dbPost })
    }
    res.redirect('/user/login')
}
