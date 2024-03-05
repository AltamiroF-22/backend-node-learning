const express = require("express");
const path = require("path");
const UserModel = require("../src/models/user.model");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));

// GET ONE AND SHOW
app.get("/views/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    res.render("singleUser", { user });
  } catch (err) {
    res.json({ error: err.message });
  }
});

// GET BY ID
app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
// MIDLEWARE DO CREATE USER
const checkIfUserExist = async (req, res, next) => {
  const { body } = req;

  try {
    const existingUserEmail = await UserModel.findOne({ email: body.email });
    const existingUserName = await UserModel.findOne({
      userName: body.userName,
    });

    if (existingUserEmail) {
      return res
        .status(409)
        .json({ error: "Já existe um usuário com este email!" });
    }

    if (existingUserName) {
      return res
        .status(409)
        .json({ error: "Já existe um usuário com este user name!" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// CREAT NEW USER
app.post("/create-user", checkIfUserExist, async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get("/create-user", async (req, res) => {
  res.render("createUser");
});

// GET ALL AND SHOW
app.get("/views/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.render("index", { users });
  } catch (error) {
    console.error("Error rendering view:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET ALL
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// ATT PARCIAL USER
app.patch("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const userAtt = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(userAtt);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//DELETE USER
app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    const userDeleted = await UserModel.findByIdAndDelete(userId);

    if (!userDeleted) {
      return res.status(500).json({ error: "Failed to delete user" });
    }

    res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const PORT = 2214;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
