const Post = require("../database/models/Article")
const path = require('path')

module.exports = async (req, res) => {
    const { image } = req.files
    const uploadFile = path.resolve(__dirname,'..', 'public/articles', image.name)
    const dbPost = await Post.findById(req.params.id)
    // console.log(dbPost._id);
    





    
    image.mv(uploadFile, (error) => {
        Post.update(
            {_id: dbPost._id},
            {
                ...req.body,
                image: `/articles/${image.name}`
            }
            , (error, post) => {
                res.redirect('/')
            })
    })
}