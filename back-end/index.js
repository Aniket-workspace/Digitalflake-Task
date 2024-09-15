import express from "express";
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

const jwtKey = "digitalflake";

// signup
app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
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

// login
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, (err, token) => {
        if (err) {
          resp.send({ result: "Somthing went wrong, please try again later" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "Invalid Credentials" });
    }
  } else {
    resp.send({ result: "Invalid Credentials" });
  }
});

// get category
app.get("/category-list", async (req, resp) => {
  let category = await Category.find();
  resp.send(category);
});

// add Category
app.post("/add-category", async (req, resp) => {
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
app.post("/add-subcategory", async (req, resp) => {
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
app.get("/subcategory-list", async (req, resp) => {
  let subcategory = await Subcategory.find();
  resp.send(subcategory);
});

// add product
app.post("/add-product", async (req, resp) => {
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
app.get("/product-list", async (req, resp) => {
  let product = await Product.find();
  resp.send(product);
});

// update

// fetch
// app.get("/alldata/:id", async (req, resp) => {
//   let alldata = await allSchema.find({ id: req.params.id });
//   resp.send(alldata);
// });

// category
app.get("/get-category/:id", async (req, resp) => {
  let result = await Category.find({ _id: req.params.id });
  resp.send(result);
});

app.put("/update-category/:id", async (req, resp) => {
  let result = await Category.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

// subcategory
app.get("/get-subcategory/:id", async (req, resp) => {
  let result = await Subcategory.find({ _id: req.params.id });
  resp.send(result);
});

app.put("/update-subcategory/:id", async (req, resp) => {
  let result = await Subcategory.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

// subcategory
app.get("/get-product/:id", async (req, resp) => {
  let result = await Product.find({ _id: req.params.id });
  resp.send(result);
});

app.put("/update-product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

// app.put("/update-data/:id", async (req, resp) => {
//   let result = await allSchema.updateOne(
//     { id: req.params.id },
//     { $set: req.body }
//   );
//   resp.send(result);
// });

// delete
// category
app.delete("/delete-category/:id", async (req, resp) => {
  let result = await Category.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// subcategory
app.delete("/delete-subcategory/:id", async (req, resp) => {
  let result = await Subcategory.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// Product
app.delete("/delete-product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// port
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgYellow);
});
