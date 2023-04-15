const express = require("express");
const expressSession = require("express-session");
const mongoose = require("mongoose");
ObjectId = require("mongodb").ObjectId;
var bodyParser = require("body-parser");
const mongodb = require("mongodb");
const Cart = require("./models/cart");
const Comments = require("./models/comments");
const Order = require("./models/order");
const Product = require("./models/product");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});

mongoose
  .connect(
    "mongodb+srv://darshanjasoliya04:D%40rshan903@cluster0.pzxphfg.mongodb.net/assignment",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

app.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.error("Failed to retrieve files:", error);
    res.status(500).send("Failed to retrieve files");
  }
});

app.post("/user", async (req, res) => {
  try {
    User.create(req.body);
    res.send("User Created successfully");
    console.log(req.body);
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(500).send("Failed to create user:");
  }
});
app.put("/user/:id", async (req, res) => {
  try {
    console.log(req.body);
    const query = { _id: new mongoose.Types.ObjectId(req.params.id) };
    const schemaDefinition = {
      $set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        shippingHistory: req.body.shippingHistory,
        shippingAddress: {
          streetAddress: req.body.streetAddress,
          city: req.body.city,
          country: req.body.country,
          zip: req.body.zip,
        },
      },
    };
    User.updateOne(query, schemaDefinition);
    res.send("User Updated successfully");
  } catch (error) {
    console.error("Failed to Update user:", error);
    res.status(500).send("Failed to Update user:");
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };

    User.deleteOne(query);
    res.send("User Deleted successfully");
  } catch (error) {
    console.error("Failed to Deleted user:", error);
    res.status(500).send("Failed to Deleted user:");
  }
});

app.get("/product", async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    console.error("Failed to retrieve Product:", error);
    res.status(500).send("Failed to retrieve Product");
  }
});

app.post("/product", async (req, res) => {
  try {
    Product.create(req.body);
    res.send("Product Created successfully");
  } catch (error) {
    console.error("Failed to create Product:", error);
    res.status(500).send("Failed to create Product:");
  }
});
app.put("/product/:id", async (req, res) => {
  try {
    console.log(req.body);
    const query = { _id: new mongoose.Types.ObjectId(req.params.id) };
    const schemaDefinition = {
      $set: {
        description: req.body.description,
        pricing: req.body.pricing,
        shippingCost: req.body.shippingCost,
      },
    };

    Product.updateOne(query, schemaDefinition);
    res.send("Product Updated successfully");
  } catch (error) {
    console.error("Failed to Update Product:", error);
    res.status(500).send("Failed to Update Product:");
  }
});
app.delete("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };

    Product.deleteOne(query);
    res.send("Product Deleted successfully");
  } catch (error) {
    console.error("Failed to Deleted Product:", error);
    res.status(500).send("Failed to Deleted Product:");
  }
});

app.get("/order", async (req, res) => {
  try {
    const order = await Order.find();
    res.json(order);
  } catch (error) {
    console.error("Failed to retrieve Order:", error);
    res.status(500).send("Failed to retrieve Order");
  }
});

app.post("/order", async (req, res) => {
  try {
    Order.create(req.body);
    res.send("Order Created successfully");
  } catch (error) {
    console.error("Failed to create Order:", error);
    res.status(500).send("Failed to create Order:");
  }
});
app.put("/order/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const schemaDefinition = {
      $set: {
        product: new ObjectId(req.body.productId),
        user: new ObjectId(req.body.userId),
        total: req.body.total,
      },
    };

    Order.updateOne(query, schemaDefinition);
    res.send("Order Updated successfully");
  } catch (error) {
    console.error("Failed to Update Order:", error);
    res.status(500).send("Failed to Update Order:");
  }
});
app.delete("/order/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };

    Order.deleteOne(query);
    res.send("Order Deleted successfully");
  } catch (error) {
    console.error("Failed to Deleted Order:", error);
    res.status(500).send("Failed to Deleted Order:");
  }
});

app.get("/cart", async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {
    console.error("Failed to retrieve Cart:", error);
    res.status(500).send("Failed to retrieve Cart");
  }
});

app.post("/cart", async (req, res) => {
  try {
    Cart.create(req.body);
    res.send("Cart Created successfully");
  } catch (error) {
    console.error("Failed to create Order:", error);
    res.status(500).send("Failed to create Order:");
  }
});
app.put("/cart/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const schemaDefinition = {
      $set: {
        product: new ObjectId(req.body.productId),
        user: new ObjectId(req.body.userId),
        quantities: req.body.quantities,
      },
    };

    Cart.updateOne(query, schemaDefinition);
    res.send("Cart Updated successfully");
  } catch (error) {
    console.error("Failed to Update Cart:", error);
    res.status(500).send("Failed to Update Cart:");
  }
});
app.delete("/cart/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };

    Cart.deleteOne(query);
    res.send("Cart Deleted successfully");
  } catch (error) {
    console.error("Failed to Deleted Cart:", error);
    res.status(500).send("Failed to Deleted Cart:");
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comments.find();
    res.json(comments);
  } catch (error) {
    console.error("Failed to retrieve Cart:", error);
    res.status(500).send("Failed to retrieve Cart");
  }
});

app.post("/comments", async (req, res) => {
  try {
    Comments.create(req.body);
    res.send("Comments Created successfully");
  } catch (error) {
    console.error("Failed to create Comments:", error);
    res.status(500).send("Failed to create Comments:");
  }
});
app.put("/comments/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const schemaDefinition = {
      $set: {
        product: new ObjectId(req.body.productId),
        user: new ObjectId(req.body.userId),
        quantities: req.body.quantities,
      },
    };

    Comments.updateOne(query, schemaDefinition);
    res.send("Comments Updated successfully");
  } catch (error) {
    console.error("Failed to Update Comments:", error);
    res.status(500).send("Failed to Update Comments:");
  }
});
app.delete("/comments/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongoose.Types.ObjectId(id) };

    Comments.deleteOne(query);
    res.send("Comments Deleted successfully");
  } catch (error) {
    console.error("Failed to Deleted Comments:", error);
    res.status(500).send("Failed to Deleted Comments:");
  }
});


