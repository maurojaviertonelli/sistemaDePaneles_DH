//requiriendo express validator//
const bcryptjs=require('bcryptjs')
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");



//const User=require("../models/userMethod");
const db = require('../database/models');


const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//----------------------------//

const usersController = {
  login: (req, res) => {
    res.render("users/login", {
      pageTitle: "Login",
    });
  },
  signup: (req, res) => {
    res.render("users/signup", {
      pageTitle: "Registrarse",
    });
  },
  profile: (req, res) => {
    res.render("users/profile", {
      pageTitle: "Perfil",
      id: req.params.id,
      user:req.session.userLogged

    });
  },
  logout:(req,res)=>{                          //metodo del logout
    req.session.destroy();
    return res.redirect('/')



  },
  edit: (req, res) => {
    res.render("users/editUser", {
      pageTitle: "Editar",
    });
  },
  editPut: (req, res) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      return res.render("users/editUser", {
        errors: resultValidation.mapped(),
        pageTitle: "Editar",
        oldData: req.body
      });
    }else{
      return res.redirect("/")
    }
  },
  signupPost: async(req, res) => {
    const resultValidation = validationResult(req);
    //console.log(resultValidation)
    if (resultValidation.errors.length > 0) {
      return res.render("users/signup", {
        errors: resultValidation.mapped(),
        pageTitle: "Registro",
        oldData: req.body
      });
      }
    let userInDB=await db.User.findOne({ where: { user_email: req.body.email } }); //hacer cambios aca
    if(userInDB){
      return res.render("users/signup",{
        pageTitle:"Registro",
        errors:{
          email:{
            msg:'Este email ya está registrado'
          }
        },
        oldData:req.body
      });
    }
    let nombreImagen="/public/img/users_img/"+req.file.filename
    db.User.create({
      user_name:req.body.nombre,
      password:bcryptjs.hashSync(req.body.contrasena,10),
      user_email:req.body.email,
      user_type:0,
      first_name:req.body.nombre,
      last_name:req.body.apellido,
      address:req.body.address,
      user_phone:req.body.phone,
      avatar:nombreImagen
    });
       
    return res.redirect("/users/login")
    
  },
  loginProcess:async(req,res)=>{
    /*const resultValidation = validationResult(req);
    //console.log(resultValidation)
    if (resultValidation.errors.length > 0) {
      return res.render("users/login", {
        errors: resultValidation.mapped(),
        pageTitle: "login",
        oldData: req.body
      });
      }else{
        return res.send(req.body)
      }*/
       let userToLogin=await db.User.findOne({ where: { user_email: req.body.email } });
      if(userToLogin){
        let isOkThePassword=bcryptjs.compareSync(req.body.contrasena,userToLogin.password)
          if(isOkThePassword){
            delete userToLogin.contrasena;    //elimino la contraseña para q no me aparezca en mi profile
            req.session.userLogged=userToLogin
            return res.redirect('/users/profile/') //aca va la vista (hay q crearla)
        }
      }
      return res.render("users/login",{
        pageTitle:"Login",
        errors:{
          email:{
            msg:'Las credenciales son inválidas'
          }
        }
      });
  }
};
module.exports = usersController;
