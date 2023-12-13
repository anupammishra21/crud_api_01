const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const path = require('path')
_=require('underscore')

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.static(path.join(__dirname,'public')))

const crudApiRouter = require('./routes/crudApi.routes')
app.use(crudApiRouter)

require(path.join(__dirname,'./config/database'))()

app.listen(process.env.PORT,()=>{
    console.log(`server is running at @http://127.0.0.1:${process.env.PORT}`);
})



