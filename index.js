import express from 'express'
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.
import bookRoutes from './routes/books.js'
import productRoutes from './routes/products.js'

//Creo l'objecte de l'aplicació
const app = express();
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(bodyParser.json())
app.use('/books', bookRoutes)
app.use('/products', productRoutes)
app.get('/', (req, res ) => {
    res.send('test')
})
app.listen(3000, () => {

})
