const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const guestMiddleware = require('../middlewares/guestMiddleware')  //llamo al middleware de login y registro
const authMiddleware = require('../middlewares/authMiddleware')  //llamo al middleware de profile


//middleware para multer(crear archivo en carpeta multer y requerirlo en la ruta users.js)
const multerDS = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../Public/img/users_img'));    //Ruta donde almacenamos el archivo, si uso servidor puedo poner la ruta de mi servidor ejmplo www.miservidor.com
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let nameImage = Date.now()+path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, nameImage);         
    }
});
const uploadFile=multer({storage:multerDS});

const usersController = require('../controllers/usersController')
//agrego express-validator//
const{body}=require('express-validator');
const { Router } = require('express');

//Validacion para la edicion hacer lo mismo q con multer crear archivo en middleware de validacion y luego requerirlo aca//
const validationForm=[
    body('nombre').notEmpty().withMessage('*Ingrese su nombre'),
    body('apellido').notEmpty().withMessage('*Ingrese su apellido'),
    body('contrasena').isLength({min:5,max:15}).withMessage('*Ingrese contraseña válida (entre 5 y 15 caracteres)'),
    body('email')
        .notEmpty().withMessage('*Debe ingresar su casilla de correo electrónico').bail()
        .isEmail().withMessage('*Ingrese un email válido'),
    body('contrasena_Ant').isLength({min:5,max:15}).withMessage('*Ingrese contraseña válida'),
    body('confirmacion').isLength({min:5,max:15}).withMessage('*Ingrese contraseña válida'),
    body('confirmacion2').isLength({min:5,max:15}).withMessage('*Ingrese contraseña válida'),
    body('cp').isNumeric().withMessage('*Ingrese un codigo postal válido'),
    body('telefono')
        .notEmpty().withMessage('*El numero de telefono debe ser obligatorio').bail()
        .isNumeric().withMessage('*DEBE SER NUMERICO'),
    body('cp').isPostalCode().withMessage('*Ingrese un codigo postal válido'),   
]
//Validacion para el registro hacer lo mismo q con multer crear archivo en middleware de validacion y luego requerirlo aca//
const validationFormSignUp=[
    body('nombre').notEmpty().withMessage('*Ingrese su nombre'),
    body('apellido').notEmpty().withMessage('*Ingrese su apellido'),
    body('email')
    .notEmpty().withMessage('*Debe ingresar su casilla de correo electrónico').bail()
    .isEmail().withMessage('*Ingrese un email válido'),
    body('contrasena').isLength({min:5,max:15}).withMessage('*Ingrese contraseña válida (entre 5 y 15 caracteres)'),
    body('confirmacion').isLength({min:5,max:15}).withMessage('*Ingrese contraseña válida'),
    body('phone').isNumeric().withMessage('*Ingrese telefono valido'),
    body('address').notEmpty().withMessage('*Ingrese direccion'),
    body('avatar').custom((value,{ req })=>{
        let file=req.file;
        let acceptedExtensions=['.png', '.webp', '.jpg'];
        if (!file){
            throw new Error('*Debe seleccionar su avatar');
        }else{
            let fileExtension=path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
       
        return true;
    })
]
//validacion del login (falta terminar)
const validationLogin=[
body('email')
    .notEmpty().withMessage('*Debe ingresar su casilla de correo electrónico').bail()
    .isEmail().withMessage('*Ingrese un email válido'),
body('contrasena').isLength({min:5,max:15}).withMessage('*Ingrese contraseña válida (entre 5 y 15 caracteres)'),
]

router.get('/login',guestMiddleware,usersController.login);
router.get('/signup',guestMiddleware,usersController.signup);
router.get('/profile/',authMiddleware,usersController.profile);
// rutas edicion perfil//
router.get('/edit',usersController.edit);
router.put('/edit',validationForm,usersController.editPut);
//-------------------------//
router.post('/signup',uploadFile.single('avatar'),validationFormSignUp,usersController.signupPost)
router.post('/login',validationLogin,usersController.loginProcess);

//--logout--//
router.get('/logout/',usersController.logout);

module.exports = router;