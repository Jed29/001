function errorHandler(err,req,res,next){
    if(err.name=="SequelizeValidationError"){
        const errors = []
        err.errors.forEach(e=>{
            errors.push(e.message)
        })
        res.status(400).json({message:errors})
    }else{
        const status = err.status ||500
        const message = err.message || "Internal Server Error"
        res.status(status).json({message})
    }
}

module.exports = errorHandler