const encrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupdb = require("../models/signupdb");

exports.signup = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    encrypt.hash(password, 10, async (err, hash) => {
      console.log(err);
      const data = await signupdb.create({
        name: name,
        email: email,
        password: hash,
      });
      res.json({ success: true, message: "Signed Up Successfully!" });
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message:
        "User already exist. Please signup or login with the existing email.",
    });
  }
};

function createToken(id) {
  return jwt.sign({ userId: id }, "32204kahfkbkkcy9429hshksky2939hcsd");
}

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const emaildb = await signupdb.findAll({ where: { email: email } });

    if (emaildb.length > 0) {
      encrypt.compare(password, emaildb[0].password, (err, result) => {
        if (err) {
          throw new Error("Something went wrong!");
        }
        console.log(result);
        if (result === true) {
          res.json({ success: "Logged in Successfully!" });
        } else {
          res.json({ message: "Incorrect Password" });
        }
      });
    } else {
      res.json({ message: "User does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.json({ Error: err });
  }
};

function createToken(id) {
  return jwt.sign({ userId: id }, "32204kahfkbkkcy9429hshksky2939hcsd");
}
