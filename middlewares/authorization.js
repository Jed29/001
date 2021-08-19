const {Article} = require('../models')

function authorization(req,res,next){
    const id = req.params.id
    Article.findByPk(id)
    .then(article=>{
        if(article){
            if(article.UserId == req.user.id){
                next()
            }else{
                next({name:"Unauthorized"})
            }
        }else{
            res.status(400).json({message:"UnAuthorized"})
        }
    }).catch(err=>{
        next(err)
    })
}

module.exports = {authorization}