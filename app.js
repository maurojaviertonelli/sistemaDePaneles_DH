const express = require('express');
const app = express();
const session = require('express-session');
const mainRoutes = require('./src/routes/main');
const usersRoutes = require('./src/routes/users');
const methodOverride=require('method-override');
const bodyParser = require ('body-parser');


app.use('/public', express.static(__dirname + '/public'));
app.listen (3000, () => console.log("Servidor corriendo"));


app.use(express.urlencoded({ extended: false })); //body formulario

app.use('/', mainRoutes);

app.set('view engine', 'ejs');
app.set('views','./src/views');
app.use(methodOverride('_method'));
app.use(methodOverride('_METHOD'));
app.use('/users', usersRoutes);
