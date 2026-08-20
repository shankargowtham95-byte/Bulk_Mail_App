const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(cors({
  origin:"https://bulk-mail-app-tw1o.vercel.app/"
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("MongoDB connection failed",error);
  });

const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

const History = mongoose.model("History", {
  username: String,
  recipients: String,
  subject: String,
  body: String,
  status: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = new User({
      username: username,
      email: email,
      password: password,
    });
    await user.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
      password: password,
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/send-email", async (req, res) => {
  try {
    const { username, recipients, subject, body } = req.body;
    if (!username){
      return res.send("Username is missing");
    }
    if (!recipients || !subject || !body) {
      return res.send("Please fill all fields");
    }
    const emails = recipients
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);
    if (emails.length === 0) {
      return res.send("Please enter an email address");
    }
    for (const email of emails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: body,
      });
    }
    await History.create({
      username: username,
      recipients: recipients,
      subject: subject,
      body: body,
      status: "Sent",
    });
    res.send("Emails sent successfully");
  } catch (error){
    console.log("Email error:", error);
    res.send("Email sending failed");
  }
});

app.get("/history/:username", async (req, res) => {
  try {
    const history = await History.find({
      username: req.params.username,
    }).sort({
      date: -1,
    });
    console.log("Username:",req.params.username);
    console.log("History error:",history);
    res.send(history);
  } catch (error){
    console.log("History error:",error);
    res.send([]);
  }
});

app.get("/",(req,res) =>{
  res.send("NovaVerse backend is running");
});

module.exports=app;