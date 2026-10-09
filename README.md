# CRUD - Node.js - JWT

## FIXES
- Delete - visual bug to get back. (? maybe)
- Routes bug(??)

## ENDPOINTS

### Auth
- `GET /auth` - Mostra la pàgina de login i registre.
- `POST /auth/register` - Registra un usuari nou i crea el token de sessió.
- `POST /auth/login` - Inicia sessió amb usuari i contrasenya.
- `GET /auth/protected` - Pàgina protegida que només es mostra si l'usuari està autenticat.
- `POST /auth/logout` - Tanca la sessió de l'usuari i esborra la cookie.

### Games
- `GET /games` - Renderitza la vista amb tots els jocs si l'usuari està autenticat.
- `GET /games/create-game` - Mostra el formulari per crear un nou joc.
- `GET /games/:id` - Carrega l'edició d'un joc concret.
- `POST /games` - Crea un nou joc i redirigeix a `/games`.
- `PUT /games/:id` - Actualitza un joc existent i redirigeix a `/games`.
- `DELETE /games/:id` - Elimina un joc i redirigeix a `/games`.

### Movies
- `GET /movies` - Renderitza la vista amb totes les pel·lícules si l'usuari està autenticat.
- `GET /movies/create-movie` - Mostra el formulari per crear una nova pel·lícula.
- `GET /movies/:id` - Carrega l'edició d'una pel·lícula concreta.
- `POST /movies` - Crea una nova pel·lícula i redirigeix a `/movies`.
- `PUT /movies/:id` - Actualitza una pel·lícula existent i redirigeix a `/movies`.
- `DELETE /movies/:id` - Elimina una pel·lícula i redirigeix a `/movies`.
