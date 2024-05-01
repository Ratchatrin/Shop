import express, { json } from "express";
import cors from "cors";
const app = express();
import mongoose from "mongoose";
import KidShirt from "./shirt_model/kidshirt.model.js";
import KidPants from "./shirt_model/kidpants.model.js";
import MenShirt from "./shirt_model/menshirt.model.js";
import MenPants from "./shirt_model/menpants.model.js";
import WomenShirt from "./shirt_model/womenshirt.model.js";
import WomenPants from "./shirt_model/womenpants.model.js";
import Cart from "./shirt_model/cart.model.js";
import User from "./model/user.model.js";
app.use(json());
app.use(cors());
app.get("/home", async (req, res) => {
  try {
    const menShirt = await MenShirt.find({});
    const menPants = await MenPants.find({});
    const menWear = [menShirt, menPants];
    const kidShirt = await KidShirt.find({});
    const kidPants = await KidPants.find({});
    const kidsWear = [kidShirt, kidPants];
    const womenShirt = await WomenShirt.find({});
    const womenPants = await WomenPants.find({});
    const womenWear = [womenShirt, womenPants];
    const product = { menWear, womenWear, kidsWear };
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/product/kids", async (req, res) => {
  try {
    const kidShirt = await KidShirt.find({});
    const kidPants = await KidPants.find({});
    const kidsWear = [kidShirt, kidPants];
    res.status(200).json(kidsWear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/signin", async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      res.json("Email is Exist");
    } else {
      const user = await User.create(req.body);
      res.status(201).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.put("/resetpassword", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      const newUser = await User.findByIdAndUpdate(checkUser._id, {
        $set: { password: newPassword },
      });
      res.status(200).json(newUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    console.log(checkUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      if (user.password === password) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.put("/cart/add/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userFilter = await User.findById(userId);
    const indexProduct = userFilter.cart.findIndex((product) => {
      return (
        product.id === req.body.id &&
        product.size === req.body.size &&
        product.color === req.body.color
      );
    });
    if (indexProduct == -1) {
      const userUpdate = await User.findByIdAndUpdate(userId, {
        $push: { cart: req.body },
      });
    } else {
      const userUpdate = await User.findByIdAndUpdate(userId, {
        $set: {
          [`cart.${indexProduct}.amount`]:
            userFilter.cart[indexProduct].amount + 1,
        },
      });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.put("/cart/delete/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userFilter = await User.findById(userId);
    const indexProduct = userFilter.cart.findIndex((product) => {
      return (
        product.id === req.body.id &&
        product.size === req.body.size &&
        product.color === req.body.color
      );
    });
    if (indexProduct !== -1) {
      const updatedAmount = userFilter.cart[indexProduct].amount - 1;
      if (updatedAmount <= 0) {
        const userUpdate = await User.findByIdAndUpdate(userId, {
          $pull: { cart: { _id: userFilter.cart[indexProduct]._id } },
        });
      } else {
        const userUpdate = await User.findByIdAndUpdate(userId, {
          $set: {
            [`cart.${indexProduct}.amount`]: updatedAmount,
          },
        });
      }
    }
    console.log("Item deleted from cart successfully");
    return res
      .status(200)
      .json({ message: "Item deleted from cart successfully" });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/product/men/shirt/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const menShirt = await MenShirt.findById(id);
    res.status(200).json(menShirt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/product/men/pants/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const menPants = await MenPants.findById(id);
    res.status(200).json(menPants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/product/women/shirt/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const womenShirt = await WomenShirt.findById(id);
    res.status(200).json(womenShirt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/product/women/pants/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const womenPants = await WomenPants.findById(id);
    res.status(200).json(womenPants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/product/kids/shirt/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const kidShirt = await KidShirt.findById(id);
    res.status(200).json(kidShirt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/product/kids/pants/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const kidPants = await KidPants.findById(id);
    res.status(200).json(kidPants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/product/men", async (req, res) => {
  try {
    const menShirt = await MenShirt.find({});
    const menPants = await MenPants.find({});
    const menWear = [menShirt, menPants];
    res.status(200).json(menWear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/product/women", async (req, res) => {
  try {
    const womenShirt = await WomenShirt.find({});
    const womenPants = await WomenPants.find({});
    const womenWear = [womenShirt, womenPants];
    res.status(200).json(womenWear);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://ratchatrin12:QpACmHJUWMCJBLIl@cluster0.cayleoy.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
  });
