import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import Comments from "./db/db.js"
dotenv.config()
const MongoClient = new mongodb.MongoClient(process.env.DB_URI)
const port = process.env.PORT || 8000

async function run(){      
    await Comments.inject(await MongoClient.connect())
    app.listen(port, ()=>{
        console.log(`listening on the port ${port}`)
    })
}

run()



