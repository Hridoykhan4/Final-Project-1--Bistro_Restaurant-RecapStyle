const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()
// MiddleWare
app.use(cors())
app.use(express.json())


/* MongoDB Start */

const uri = `mongodb+srv://${process.env.BISTRO_USER}:${process.env.BISTRO_PASS}@bistro-begin.f9obfsm.mongodb.net/?retryWrites=true&w=majority&appName=bistro-begin`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const menuCollection = client.db('bistroDB').collection('menu');
        const reviewCollection = client.db('bistroDB').collection('reviews');
        app.get('/menu', async (req, res) => {
            res.send(await menuCollection.find().toArray());
        })
        app.get('/reviews', async(req, res) => {
             res.send(await reviewCollection.find().toArray())   
        })


        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

/* MongoDB End */


app.get('/', (req, res) => {
    res.send('Bistro is being hyped')
})

app.listen(port, () => {
    console.log(`Bistro in firing`)
})