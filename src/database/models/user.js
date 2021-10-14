module.exports=(sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        idUser:{
            type:dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        user_name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        password :{
            type: dataTypes.STRING,
            allowNull: false
        },
        user_email :{
            type: dataTypes.STRING,
            allowNull: false
        },
        user_type:{
            type:dataTypes.CHAR,
            allowNull: false
        },
        avatar:{
            type: dataTypes.STRING,
            allowNull: false
        },
        first_name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: dataTypes.STRING,
            allowNull: false
        },
        address:{
            type: dataTypes.STRING,
            allowNull: true
        },
        user_phone:{
            type: dataTypes.INTEGER,
            allowNull: true
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);
    User.associate=(models)=>{
        User.hasMany(models.Invoice,{
            as:"invoices",
            foreignKey:"users_idUser"
        }),
        User.hasMany(models.Card,{
            as:"cards",
            foreignKey:"users_idUser"
        })
    }
   
   
    return User;
}