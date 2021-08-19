if(process.env.NODENV !== "production"){
    require("dotenv").config()
}
const express = require('express')
const cors = require('cors')
const Router = require("./routes")
const errorHandler = require("./middlewares/errorHandler")
const app = express()
const port = process.env.PORT ||3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(Router)
app.use(errorHandler)



app.listen(port, () => {
  console.log(`1500+1500 = ${port}`)
})