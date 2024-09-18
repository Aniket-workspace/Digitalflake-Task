import express, { response } from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import Product from "./models/productModel.js";
import cors from "cors";
import Category from "./models/categoryModel.js";
import Subcategory from "./models/subcategoryModel.js";
import User from "./models/userModel.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// configuration env
dotenv.config();

// database config
connectDB();

// rest objects
const app = express();

// middlewares
app.use(express.json({ limit: "50mb" })); // Default limit is 100kb
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(cors());

const jwtKey = process.env.jwtKey;

// signup
app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
  let existUser = await User.findOne({ email: user.email });
  if (existUser) {
    return resp.status(400).json({
      success: false,
      message: `User email already exists. Please use different credentials.`,
    });
  }
  const saltRound = 10;
  const hash = await bcrypt.hash(user.password, saltRound);
  user.password = hash;
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, (err, token) => {
    if (err) {
      resp.send({ result: "Somthing went wrong, please try again later" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  console.log(req.body);

  // Check if both email and password are provided
  if (req.body.email && req.body.password) {
    try {
      // Find user based on email and retrieve the user without the password field
      let user = await User.findOne({ email: req.body.email }).select(
        "+password"
      );

      if (user) {
        const pass = req.body.password;

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(pass, user.password, async (err, isMatch) => {
          if (err) {
            return resp
              .status(500)
              .send({ result: `Something went wrong: ${err.message}` });
          }

          if (isMatch) {
            Jwt.sign({ user }, jwtKey, (err, token) => {
              if (err) {
                return resp.status(500).send({
                  result: "Something went wrong, please try again later",
                });
              }

              resp.send({ user, auth: token });
            });
          } else {
            resp.status(401).send({ result: "Invalid Credentials" });
          }
        });
      } else {
        resp.status(401).send({ result: "Invalid Credentials" });
      }
    } catch (err) {
      resp.status(500).send({ result: `Server error: ${err.message}` });
    }
  } else {
    resp.status(400).send({ result: "Invalid Credentials" });
  }
});

// get category
app.get("/category-list", verifyToken, async (req, resp) => {
  let category = await Category.find();
  resp.send(category);
});

// add Category
app.post("/add-category", verifyToken, async (req, resp) => {
  try {
    const { id, category, image, status } = req.body;
    const category1 = new Category({ id, category, image, status });
    const result = await category1.save();
    resp.send(result);
  } catch (error) {
    console.log(error);
  }
});

// add subcategory
app.post("/add-subcategory", verifyToken, async (req, resp) => {
  try {
    const { id, subcategory, category, image, status } = req.body;
    const subcategory1 = new Subcategory({
      id,
      subcategory,
      category,
      image,
      status,
    });
    const result = await subcategory1.save();
    resp.send(result);
  } catch (error) {
    console.log(error);
  }
});

// get subcategory
app.get("/subcategory-list", verifyToken, async (req, resp) => {
  let subcategory = await Subcategory.find();
  resp.send(subcategory);
});

// add product
app.post("/add-product", verifyToken, async (req, resp) => {
  try {
    const { id, product, subcategory, category, image, status } = req.body;
    const product1 = new Product({
      id,
      product,
      subcategory,
      category,
      image,
      status,
    });
    const result = await product1.save();
    resp.send(result);
  } catch (error) {
    console.log(error);
  }
});

// get product
app.get("/product-list", verifyToken, async (req, resp) => {
  let product = await Product.find();
  resp.send(product);
});

// update....................................
// category
app.get("/get-category/:id", verifyToken, async (req, resp) => {
  let result = await Category.find({ _id: req.params.id });
  resp.send(result);
});

app.put("/update-category/:id", verifyToken, async (req, resp) => {
  let result = await Category.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

// subcategory
app.get("/get-subcategory/:id", verifyToken, async (req, resp) => {
  let result = await Subcategory.find({ _id: req.params.id });
  resp.send(result);
});

app.put("/update-subcategory/:id", verifyToken, async (req, resp) => {
  let result = await Subcategory.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

// subcategory
app.get("/get-product/:id", verifyToken, async (req, resp) => {
  let result = await Product.find({ _id: req.params.id });
  resp.send(result);
});

app.put("/update-product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

// delete..................................................
// category
app.delete(
  "/delete-category/:id",
  verifyToken,
  verifyToken,
  async (req, resp) => {
    let result = await Category.deleteOne({ _id: req.params.id });
    resp.send(result);
  }
);

// subcategory
app.delete("/delete-subcategory/:id", verifyToken, async (req, resp) => {
  let result = await Subcategory.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// Product
app.delete("/delete-product/:id", verifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// search.................................
// search category
app.get("/search-category/:key", verifyToken, async (req, resp) => {
  let result = await Category.find({
    $or: [{ category: { $regex: req.params.key, $options: "i" } }],
  });
  resp.send(result);
});

// search category
app.get("/search-subcategory/:key", verifyToken, async (req, resp) => {
  let result = await Subcategory.find({
    $or: [{ subcategory: { $regex: req.params.key, $options: "i" } }],
  });
  resp.send(result);
});

// search category
app.get("/search-product/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [{ product: { $regex: ".*" + req.params.key + ".*", $options: "i" } }],
  });
  resp.send(result);
});

// token authorization
function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Provide token" });
  }
}

// port
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgYellow);
});
