module.exports = {
    stripTags : function(input) {
        return input.replace(/<(?:.|\n)*?>/gm,'')
    },

    
    // Handlebars.registerHelper("LastArticle", function(Posts){
    //     var postTableau = Array.isArray(Posts)
    //     return postTableau.slice(-4)
    // }
}

