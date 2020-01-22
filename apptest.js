const mongoose = require('mongoose');
const Article = require ('./database/models/Article');

mongoose.connect('mongodb://localhost:27017/blog-test');

// Article.find({
//     title : "Spiderman"
// },(error,articles)=>{
//     console.log(error, articles);
    
// })


Article.findById("5e18818c759c30186a912269",(error,articles) =>{
    console.log(error, articles);
    
})
//  Article.findByIdAndUpdate("5e18818c759c30186a912269",
//  {title: 'spiderman homecoming'}, (error,post) =>{
//     console.log(error, post);
//  })


// Article.create({
//     title : "Spiderman",
//     intro: "Avis sur le film",
//     content : "Critique sur le film spider man",
// }, (error, post) => {
//     console.log(error, post);
    
// })