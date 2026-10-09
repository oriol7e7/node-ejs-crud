import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.
import { UserRepository } from "../user-repository.js";
import { PORT, SECRET_JWT_KEY, SALT_ROUNDS } from "../config.js";
import jwt from "jsonwebtoken";
const router = express.Router();

/**
 * GET /auth
 * Renders login.ejs with forms to login and register users
 */
router.get("/", (req, res) => {
  res.render("login");
});

/**
 * GET /auth/protected
 * Checks if user exists using req.session.user (gotten from middleware) and renders protected.ejs or no-permissions.ejs
 */
router.get("/protected", (req, res) => {
  const user = req.session.user;
  user ? res.render("protected") : res.render("no-permissions");
});

/**
 * POST /auth/register
 * Registers an user innto User.json and creates a cookie with the JWT
 */
router.post("/register", async (req, res) => {
  //destructuring request body
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const id = await UserRepository.create({ username, password });
    const token = jwt.sign({ id, username }, SECRET_JWT_KEY, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .send({ user: { _id: id, username }, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * POST /auth/login
 * Logs a user by creating a JWT and a cookie
 */
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

/**
 * POST /auth/logout
 * Logs out a user by deleting token cookie and renders home.ejs back
 */
router.post("/logout", (req, res) => {
  res.clearCookie("access_token").render("home");
});

export default router;
