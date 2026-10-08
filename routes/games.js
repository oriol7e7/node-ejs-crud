import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

const router = express.Router();

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

router.get("/", (req, res) => {
  const data = readData();
  const games = data.games;
  const user = req.session.user;
  if (!user) {
    return res.render("no-permissions");
  }
  res.render("games", { games });
});

router.get("/create-game", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.render("no-permissions");
  }
  res.render("create_game");
});

// Obtenir un producte per id
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

// Afegir un producte
router.post("/", (req, res) => {
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

// Modificar un producte
router.put("/:id", (req, res) => {
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

// Eliminar un producte
router.delete("/:id", (req, res) => {
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
