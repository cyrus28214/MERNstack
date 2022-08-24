import mongodb from "mongodb"

export default class Comments{
    static async inject(conn){
        this.comments = conn.db(process.env.DB_NAME).collection('comments')
    }

    static async add(comment){
        await this.comments.insertOne(comment)
        console.log(`add a comment ${JSON.stringify(comment)}`)
    }

    static getNewest(num){
        return this.comments.find({}, {
            limit: num,
            sort: {timestamp: -1},
        })
    }
}