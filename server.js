import express from "express";
import methodOverride from "method-override";
import { PORT, SECRET_JWT_KEY, SALT_ROUNDS } from "./config.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import gamesRoutes from "./routes/games.js";
import moviesRoutes from "./routes/movies.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public")); //Load public files
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs"); // ejs usage
app.set("views", "./views"); // ejs path

/**
 * MIDDLEWARE to store in req.session the current user (or not if there's not any user logged)
 */
app.use((req, res, next) => {
  const { access_token } = req.cookies;
  req.session = { user: null };
  try {
    const data = jwt.verify(access_token, SECRET_JWT_KEY);
    req.session.user = data;
  } catch (error) {
    req.session.user = null;
  }
  next();
});
//Games, movies and auth routes (passed middleware)
app.use("/games", gamesRoutes);
app.use("/movies", moviesRoutes);
app.use("/auth", authRoutes);

//Render home.ejs view in http://localhost/
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log("listening on http://localhost:" + PORT);
});
