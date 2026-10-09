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
 * GET /games
 * LOG IN REQUIRED (checks req.session.user - middleware) - If not logged, renders no-permissions.ejs
 * renders games.ejs with all the games
 */
router.get("/", (req, res) => {
  const data = readData();
  const games = data.games;
  const user = req.session.user;
  if (!user) {
    return res.render("no-permissions");
  }
  res.render("games", { games });
});

/**
 * GET /games/create-game
 * LOG IN REQUIRED (checks req.session.user - middleware) - If not logged, renders no-permissions.ejs
 * renders create-game.ejs with form to post a game
 */
router.get("/create-game", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.render("no-permissions");
  }
  res.render("create_game");
});

/**
 * GET /games/:id
 * LOG IN REQUIRED (checks req.session.user - middleware) - If not logged, renders no-permissions.ejs
 * renders edit_games to view a concrete game and edit it
 */
router.get("/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const game = data.games.find((game) => game.id === id);
  const user = req.session.user;
  if (!user) {
    return res.render("no-permissions");
  }
  if (!game) {
    return res.send("Pelicula no trobada");
  }
  res.render("edit_games", { game });
});

/**
 * POST /games
 * LOG IN REQUIRED (checks req.session.user - middleware)
 * Redirects back /games
 */
router.post("/", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send("no authorized");
  }

  const data = readData();
  const body = req.body;
  const newGame = {
    id: data.games.length + 1,
    ...body,
  };
  data.games.push(newGame);
  writeData(data);
  res.redirect("/games");
});

/**
 * PUT /games/:id
 * LOG IN REQUIRED (checks req.session.user - middleware)
 * Redirects back /games
 */
router.put("/:id", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send("no authorized");
  }

  const data = readData();
  const body = req.body;
  const id = parseInt(req.params.id);
  const gamesIndex = data.games.findIndex((game) => game.id === id);

  if (gamesIndex === -1) {
    return res.status(404).send("Joc no trobat");
  }

  data.games[gamesIndex] = {
    ...data.games[gamesIndex],
    ...body,
  };
  writeData(data);
  res.redirect("/games");
});

/**
 * DELETE /games/:id
 * LOG IN REQUIRED (checks req.session.user - middleware)
 * Redirects back /games
 */
router.delete("/:id", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.status(401).send("no authorized");
  }

  const data = readData();
  const id = parseInt(req.params.id);
  const gameIndex = data.games.findIndex((game) => game.id === id);

  if (gameIndex === -1) {
    return res.status(404).send("Joc no trobat");
  }

  data.games.splice(gameIndex, 1);
  writeData(data);
  res.redirect("/games");
});

export default router;
