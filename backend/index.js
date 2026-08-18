const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
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
      return res.send("Please fill all fields");
    }
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      return res.send("User already exists");
    }
    const user = new User({
      username: username,
      email: email,
      password: password,
    });
    await user.save();
    res.send("Account created successfully");
  } catch {
    res.send("Signup failed");
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
      return res.send("Invalid email or password");
    }
    res.send({
      username: user.username,
      email: user.email,
    });
  } catch {
    res.send("Login failed");
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

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
