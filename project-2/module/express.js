const express = require("express");
const UserModel = require("../src/models/user.model");

const app = express();

app.use(express.json());

// GET ALL
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
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

// CREAT NEW USER
app.post("/users", async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
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

const PORT = 2214;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
