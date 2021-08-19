const Router = require('express').Router()
const UserController = require('../controllers/userController')
const ArticleController = require('../controllers/articleController')
const {authentication} = require('../middlewares/authenticate')
const {authorization} = require("../middlewares/authorization")
// Login & Register
Router.post("/register", UserController.register)
Router.post("/login", UserController.login)
Router.use(authentication)
// Article
Router.get('/article', ArticleController.getArticle)
Router.post('/article', ArticleController.postArticle)

// Authorization
Router.use('/article/:id', authorization)
Router.get("/article/:id", ArticleController.getArticleId)
Router.delete("/article/:id", ArticleController.deleteArticleId)
Router.put("/article/:id", ArticleController.putArticleId)

module.exports = Router

