const {User} = require('../models/index')
const {comparePassword} = require('../helpers/bcrypt')
const {signJwt} = require ('../helpers/jsonwibutoken')

class UserController{
    static register(req,res,next){
        const {email, username,password,name,address,role,avatarURL} = req.body
        User.create({email,username,password,name,address,role,avatarURL})
        .then(user=>{
            res.status(201).json({
                id:user.id,
                username:user.username,
                email:user.email
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    static login(req,res,next){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(user=>{
            if(user && comparePassword(password,user.password)){
                const access_token = signJwt({id:user.id, email:user.email})
                res.status(200).json({
                    id:user.id,
                    email:user.email,
                    access_token
                })
            }else{
                res.status(401).json({message:"Invalid E-mail/Password"})
            }
        }).catch(err=>{
            next(err)
        })
    }
}

module.exports = UserController