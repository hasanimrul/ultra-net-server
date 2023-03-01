const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.port || 5000

// middlewares
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://ultraNetUser:Yc9gZGyb5PphmauS@cluster0.9znyou2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('ultraNet').collection('services')

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('UltraNet server is running')
})

app.listen(port, () => {
    console.log(`UltraNet running on port: ${port}`);
})