import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.
import { UserRepository } from "../user-repository.js";
import { PORT, SECRET_JWT_KEY, SALT_ROUNDS } from "../config.js";
import jwt from "jsonwebtoken";
const router = express.Router();
router.get("/", (req, res) => {
  res.render("login");
});

router.post("/register", async (req, res) => {
  //destructuring request body
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const id = await UserRepository.create({ username, password });
    res.send({ id });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      },
    );
    res
      .cookie("access_token", token, {
        httpOnly: true, //la cookie solo se puede acceder en el servidor, no podrem fer un document.cookie
        //secure: true, //la cookie solo funciona en https
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //la cookie es pot accedir dins del domini
        maxAge: 1000 * 60 * 60, //la cookie te un temps de validesa d'una hora
      })
      .send({ user, token });
  } catch (error) {
    //401 = no autorització
    res.status(401).send(error.message);
  }
});

router.get("/protected", (req, res) => {
  const user = req.session.user;
  user ? res.render("protected") : res.render("no-permissions");
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token").json({ message: "logout successfull" });
});

export default router;
