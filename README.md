# CRUD - Node.js - JWT

## ENDPOINTS

### Auth

- `GET /auth` - Mostra la pàgina de login i registre i **_renderitza_** la vista EJS.
  ![GET /auth](public/assets/get-auth.png)

- `POST /auth/register` - Registra un usuari nou i **_crea_** el token de sessió amb cookie.
  ![POST /auth/register](public/assets/post-auth-register.png)

- `POST /auth/login` - Inicia sessió i **_crea_** la cookie JWT amb les credencials validades.
  ![POST /auth/login](public/assets/post-auth-login.png)

- `GET /auth/protected` - Mostra la pàgina protegida si l'usuari està autenticat, o la vista de permisos si no ho està; **_renderitza_** la resposta adequada.
  ![GET /auth/protected](public/assets/get-auth-protected.png)

- `POST /auth/logout` - Tanca la sessió i **_esborra_** la cookie de l'usuari, després **_renderitza_** la vista principal.
  ![POST /auth/logout](public/assets/post-logout.png)

### Games

- `GET /games` - Mostra la llista de jocs i **_renderitza_** la vista EJS si l'usuari està autenticat.
  ![GET /games](public/assets/get-games.png)

- `GET /games/create-game` - Mostra el formulari per crear un nou joc i **_renderitza_** la vista corresponent.
  ![GET /games/create-game](public/assets/get-create-games.png)

- `GET /games/:id` - Carrega el joc concret i **_renderitza_** l'edició EJS del registre.
  ![GET /games/:id](public/assets/get-games-id.png)

- `POST /games` - Crea un nou joc i **_redirigeix_** a `/games` després d'emmagatzemar-lo.
  ![POST /games](public/assets/post-games.png)

- `PUT /games/:id` - Actualitza un joc existent i **_redirigeix_** a `/games`.
  ![PUT /games/:id](public/assets/put-games.png)

- `DELETE /games/:id` - Elimina un joc i **_redirigeix_** a `/games`.
  ![DELETE /games/:id](public/assets/delete-game.png)

### Movies

- `GET /movies` - Mostra la llista de pel·lícules i **_renderitza_** la vista EJS si l'usuari està autenticat.
  ![GET /movies](public/assets/get-movies.png)

- `GET /movies/create-movie` - Mostra el formulari per crear una nova pel·lícula i **_renderitza_** la vista corresponent.
  ![GET /movies/create-movie](public/assets/movies-create-movie.png)

- `GET /movies/:id` - Carrega la pel·lícula concreta i **_renderitza_** l'edició EJS del registre.
  ![GET /movies/:id](public/assets/get-movies-id.png)

- `POST /movies` - Crea una nova pel·lícula i **_redirigeix_** a `/movies` després d'emmagatzemar-la.
  ![POST /movies](public/assets/post-movies.png)

- `PUT /movies/:id` - Actualitza una pel·lícula existent i **_redirigeix_** a `/movies`.
  ![PUT /movies/:id](public/assets/put-movies.png)

- `DELETE /movies/:id` - Elimina una pel·lícula i **_redirigeix_** a `/movies`.
  ![DELETE /movies/:id](public/assets/delete-movies.png)
