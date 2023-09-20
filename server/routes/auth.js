const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  const { first_name, last_name, password, email } = req.body;

  if (!first_name || !email || !password)
    return res
      .status(400)
      .json({ error: "Please enter required fields" });

  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "Please enter valid email address" });


  if (password.length <= 6)
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });

  try {
    const doesUserAlreadyExist = await User.findOne({ email });

    if (doesUserAlreadyExist)
      return res.status(400).json({
        error: `a user with that email [${email}] already exists so please try another one.`,
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ first_name, last_name, email, password: hashedPassword });

    // save the user.
    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: "Please enter all the required fields!" });

  const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ error: "Please enter valid email address" });

  try {
    const doesUserExist = await User.findOne({ email });
    if (!doesUserExist) return res.status(400).json({ error: "Invalid email or password" });

    const doesPasswwordMatch = await bcrypt.compare(password, doesUserExist.password);

    if (!doesPasswwordMatch) return res.status(400).json({ error: "Invalid email or password" });

    const payload = { _id: doesUserExist._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h", });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
