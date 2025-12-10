const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
// MiddleWare
app.use(cors());
app.use(express.json());
let usersCollection;
// Verify Token
const verifyToken = (req, res, next) => {
  const authorizeHeader = req.headers?.authorization;
  const token = authorizeHeader.split(" ")[1];
  if (!authorizeHeader || !token || !authorizeHeader.startsWith("Bearer "))
    return res.status(401).send({ message: "Unauthorized Access" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.status(401).send({ message: "Unauthorized Access" });
    req.decoded = decoded;
    next();
  });
};

// Verify admin
const verifyAdmin = async (req, res, next) => {
  const { email } = req.decoded;
  const user = await usersCollection.findOne({ email });
  if (user?.role !== "admin")
    return res.status(401).send({ message: "Unauthorized Access" });
  next();
};

// Verify Valid Email
const verifyValidEmail = (req, res, next) => {
  const email = req.params?.email || req.query?.email;
  if (req.decoded?.email !== email)
    return res.status(403).send({ message: "Forbidden Access" });
  next();
};

/* MongoDB Start */

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@bistro-begin.f9obfsm.mongodb.net/?retryWrites=true&w=majority&appName=bistro-begin`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("bistroDB");
    const menuCollection = db.collection("menu");
    const reviewCollection = db.collection("reviews");
    const cartCollection = db.collection("cart_recap");
    usersCollection = db.collection("users_recap");

    /* _---------____ */

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "300d",
      });
      res.send({ token });
    });

    /* _---------____ */

    /* _______USER Start___________ */

    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      res.send(await usersCollection.find().toArray());
    });

    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const filter = { _id: new ObjectId(req.params.id) };
        const result = await usersCollection.updateOne(filter, {
          $set: { role: "admin" },
        });
        res.send(result);
      }
    );

    app.get("/users/admin", verifyToken, verifyValidEmail, async (req, res) => {
      const { email } = req.query;
      const user = await usersCollection.findOne({ email });
      res.send({ admin: user?.role === "admin" });
    });

    app.delete(
      "/users/:id",
      verifyToken,
      verifyValidEmail,
      verifyAdmin,
      async (req, res) => {
        await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      }
    );

    app.post("/users", async (req, res) => {
      const { email } = req.body;
      if (await usersCollection.findOne({ email }))
        return res.send({ message: "Already Exists" });
      const result = await usersCollection.insertOne(req.body);
      res.send(result);
    });

    /* _______USER END___________ */

    app.post("/menu", verifyToken, verifyAdmin, async (req, res) => {
      res.send(await menuCollection.insertOne(req.body));
    });

    app.get("/menu", async (req, res) => {
      res.send(await menuCollection.find().toArray());
    });
    app.get("/menu/:id", async (req, res) => {
      res.send(
        await menuCollection.findOne({ _id: new ObjectId(req.params.id) })
      );
    });

    app.delete("/menu/:id", async (req, res) => {
      await cartCollection.deleteMany({ menuId: req.params.id });
      res.send(
        await menuCollection.deleteOne({ _id: new ObjectId(req.params.id) })
      );
    });

    app.patch("/menu/:id", async (req, res) => {
      res.send(
        await menuCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        )
      );
    });

    app.get("/reviews", async (req, res) => {
      res.send(await reviewCollection.find().toArray());
    });

    /* CART APIs */
    app.post("/carts", async (req, res) => {
      res.send(await cartCollection.insertOne(req.body));
    });

    app.get("/carts", verifyToken, async (req, res) => {
      const { email } = req.query;
      const result = await cartCollection.find({ email }).toArray();
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      res.send(
        await cartCollection.deleteOne({ _id: new ObjectId(req.params.id) })
      );
    });

    /* CART APIs */

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

/* MongoDB End */

app.get("/", (req, res) => {
  res.send("Bistro is being hyped");
});

app.listen(port, () => {
  console.log(`Bistro in firing`);
});
