import express from "express"
import Comments from "../db/db.js"

const router = express.Router()

router.get('/', (req, res) => res.send("Hello world!"))
router.post('/add/', (req, res) => {
    console.log(req.ip)
    if(req.body){
        console.log(req.body)
        Comments.add({text:req.body.text, ip:req.ip, date:new Date()})
        res.json({status:"success"})
    }
    else{
        res.status(500).json({error:"text cannot be empty"})
    }
})
router.get('/get/newest10', (req, res)=>{
    Comments.getNewest(10).toArray().then((i)=>{
        res.send(i)
    })
})


export default router