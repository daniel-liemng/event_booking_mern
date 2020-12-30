const User = require("../models/User");

const generateToken = require("../utils/generateToken");

// REGISTER
const registerHandler = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password is at least 6 characters" });
  }

  try {
    // If user exists
    const existUser = await User.findOne({ email });

    if (existUser) {
      // throw new Error("User exists");
      return res.status(400).json({ message: "User exists already" });
    }

    // Create user
    const newUser = new User({ name, email, password });

    const user = await newUser.save();

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.id),
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// LOGIN
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password is at least 6 characters" });
  }

  try {
    // Find user
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      // throw new Error("Invalid email and password");
      return res.status(400).json({ message: "Invalid email and password" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { loginHandler, registerHandler };
