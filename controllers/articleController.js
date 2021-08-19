const {Article,User} = require('../models')

class ArticleController{
    static getArticle(req,res,next){
        Article.findAll({include:User})
        .then(article=>{
            res.status(200).json(article)
        }).catch(err=>{
            next(err)
        })
    }

    static postArticle(req,res,next){
        let createArticle = {
            title: req.body.title,
            content:req.body.content,
            featureimgUrl:req.body.featureimgUrl,
            UserId:req.user.id
        }
        Article.create(createArticle)
        .then(article=>{
            res.status(201).json({
                article
            })
        }).catch(err=>{
            next(err)
        })
    }

    static getArticleId(req,res,next){
        let id = req.params.id
        Article.findByPk(id)
        .then(article=>{
            if(!article){
                res.status(404).json({message:`article with ${id} not Found`})
            }
            res.status(200).json(article)
        }).catch(err=>{
            next(err)
        })
    }

    static deleteArticleId(req,res,next){
        let id = req.params.id
        Article.destroy({where:{id}})
        .then(article=>{
            if(!article){
                res.status(404).json({message:`Article with ${id} not found`})
            }else{
                res.status(200).json({message:"Article Success to delete"})
            }
        }).catch(err=>{
            next(err)
        })
    }

    static putArticleId(req,res,next){
        let id = req.params.id
        let updateArticle={
            title: req.body.title,
            content:req.body.content,
            featureimgUrl:req.body.featureimgUrl
        }
        Article.update(updateArticle,{where:{id},returning:true})
        .then(article=>{
            res.status(200).json({article})
        }).catch(err=>{
            console.log(err)
        })
    }
}

module.exports = ArticleController