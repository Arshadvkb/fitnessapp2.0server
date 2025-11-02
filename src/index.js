import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()
app.use(cors())
app.use(cookieParser())

const port=process.env.port


app.get("/",(req,res)=>{
    res.send("fitness app 2.0")

})


app.listen(port,()=>{
    console.log("hi");
    
})