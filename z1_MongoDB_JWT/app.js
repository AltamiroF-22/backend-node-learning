// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

//Model
const User = require("./models/User");

const PORT = 4040;

// open Route - Public Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "tudo em riba" });
});

//middleware user rout
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    
    next();
  } catch (err) {
    res.status(400).json({ message: "token invalid!" });
  }
};

//Private Route
app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res
      .status(400)
      .json({ message: "Invalid ObjectId format or user does not exist" });
  }

  const user = await User.findById(id, "-password");

  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  res.status(200).json({ message: user });
});

//middleware registe user
const validaUser =
  ("/auth/register",
  async (req, res, next) => {
    const { name, email, password, confirmpassword } = req.body;

    if (!name) return res.status(422).json({ message: "Name is required!" });

    if (!email) return res.status(422).json({ message: "Email is required!" });

    if (!password || !confirmpassword) {
      return res.status(422).json({ message: "both passwors is required!" });
    }

    if (password.length < 8)
      return res
        .status(422)
        .json({ message: "the password can't be less than 8 characters" });

    if (password !== confirmpassword) {
      return res
        .status(422)
        .json({ message: "the passwords must be the same!" });
    }

    try {
      const userEmailExist = await User.findOne({ email });
      if (userEmailExist)
        return res
          .status(409)
          .json({ message: "this email is already in use" });

      next();
    } catch (err) {
      console.log(`Erro in midleware ValidaUser${err}`);
    }
  });

// Register User
app.post("/auth/register", validaUser, async (req, res) => {
  const { name, email, password } = req.body;
  //password hash
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    password: passwordHash,
    email,
  });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: "erro no servidor!" });
  }
});

//middleware login user
const validaUserLogin =
  ("/auth/login",
  async (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "Email is required!" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required!" });
    }

    try {
      const user = await User.findOne({ email });
      //check if user email exist
      if (!user)
        return res.status(404).json({ message: "this user does not exist" });

      //check the user password
      const userPassword = await bcrypt.compare(password, user.password);

      if (!userPassword)
        return res
          .status(401)
          .json({ message: "the password is not matching" });
      next();
    } catch (err) {
      console.log(`error no midleware validaUserLogin: ${err}`);
    }
  });

// Login user
app.post("/auth/login", validaUserLogin, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(`error no midleware validaUserLogin: ${err}`);
  }
});

const dbUser = process.env.MDB_USER;
const dbPass = process.env.MDB_PASSW;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@altamirojunior.ajajg15.mongodb.net/?retryWrites=true&w=majority&appName=AltamiroJunior`
    // { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((err) => console.log(err));
