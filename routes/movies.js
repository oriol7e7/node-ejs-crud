import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

const router = express.Router();

/**
 * readData and writeData auxiliar functions using fs library to work with a .json file as a db
 */
const readData = () => {
  try {
    const data = fs.readFileSync("./db/db.json");
    //console.log(data);
    //console.log(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
//Funció per escriure informació
const writeData = (data) => {
  try {
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /movies
 * LOG IN REQUIRED (checks req.session.user - middleware) - If not logged, renders no-permissions.ejs
 * renders movies.ejs with all the movies
 */
router.get("/", (req, res) => {
  const data = readData();
  const movies = data.movies;
  const user = req.session.user;
  if (!user) {
    return res.render("no-permissions");
  }
  res.render("movies", { movies });
});

/**
 * GET /movies/create-movie
 * LOG IN REQUIRED (checks req.session.user - middleware) - If not logged, renders no-permissions.ejs
 * renders create_movie.ejs with form to post a movie
 */
router.get("/create-movie", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.render("no-permissions");
  }
  res.render("create_movie");
});

/**
 * GET /movies/:id
 * LOG IN REQUIRED (checks req.session.user - middleware) - If not logged, renders no-permissions.ejs
 * renders edit_movies to view a concrete movie and edit it
 */
router.get("/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const movie = data.movies.find((m) => m.id === id);
  const user = req.session.user;

  if (!user) {
    return res.render("no-permissions");
  }

  if (!movie) {
    return res.status(404).send("Pelicula no trobada");
  }
  res.render("edit_movies", { movie });
});

/**
 * POST /movies
 * LOG IN REQUIRED (checks req.session.user - middleware)
 * Redirects back /movies
 */
router.post("/", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send("no authorized");
  }

  const data = readData();
  const body = req.body;
  const newMovie = {
    id: data.movies.length + 1,
    ...body,
  };
  data.movies.push(newMovie);
  writeData(data);
  res.redirect("/movies");
});

/**
 * PUT /movies/:id
 * LOG IN REQUIRED (checks req.session.user - middleware)
 * Redirects back /movies
 */
router.put("/:id", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send("no authorized");
  }

  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const moviesIndex = data.movies.findIndex((movie) => movie.id === id);

  if (moviesIndex === -1) {
    return res.status(404).send("Pelicula no trobada");
  }

  data.movies[moviesIndex] = {
    ...data.movies[moviesIndex],
    ...body,
  };
  writeData(data);
  res.redirect("/movies");
});

/**
 * DELETE /movies/:id
 * LOG IN REQUIRED (checks req.session.user - middleware)
 * Redirects back /movies
 */
router.delete("/:id", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send("no authorized");
  }

  const data = readData();
  const id = parseInt(req.params.id);
  const movieIndex = data.movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).send("Pelicula no trobada");
  }

  data.movies.splice(movieIndex, 1);
  writeData(data);
  res.redirect("/movies");
});

export default router;
