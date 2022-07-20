const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("../db/conn");
const User = require("../model/userSchema");
const Authenticate = require("../middleware/authenticate");
router.use(cookieParser());
router.get("/", (req, res) => {
  res.send("Hello world from the server router js");
});

// *****Using promises*****-

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "plz filled the field properly" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "email already exists" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfully" });
//         })
//         .catch((err) => res.status(500).json({ error: "failed to register" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// ***register-page****

// ****Async-Await-*****

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "email already exists" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
      await user.save();
    }
    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

// ***Login route-***

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the data" });
    }

    const userLogin = await User.findOne({ email: email });

    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compareSync(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(200).json({ error: "invalid credientials pass" });
      } else {
        res.json({ message: "user signin successfully" });
      }
    } else {
      res.status(200).json({ error: "invalid credientials " });
    }
  } catch (err) {
    console.log(err);
  }
});

// About us page
router.get("/about", Authenticate, (req, res) => {
  console.log("Hello my About");
  res.send(req.rootUser);
});

// get user data for contact us and home page
router.get("/getdata", Authenticate, (req, res) => {
  console.log("Hello my About");
  res.send(req.rootUser);
});

// contact us page
router.post("/contact", Authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "please filled the contact form" });
    }

    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: "user contact successfully." });
    }
  } catch (error) {
    console.log(error);
  }
});

// logout us page
router.get("/logout", (req, res) => {
  console.log("Hello my Logout page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

module.exports = router;
