module.exports = function(sequelize, dataTypes){
    let alias = "User";
    
    let cols = {
        id_user: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(60)
        },
        last_name: {
            type: dataTypes.STRING(60)
        },
        username: {
            type: dataTypes.STRING(45)
        },
        address: {
            type: dataTypes.STRING(60)
        },
        city: {
            type: dataTypes.STRING(60)
        },
        phone: {
            type: dataTypes.INTEGER(255)
        },
        idcarrito: {
            type: dataTypes.INTEGER(255)
        },
        avatar: {
            type: dataTypes.STRING(60)
        },
        email: {
            type: dataTypes.STRING(60)
        },
        password: {
            type: dataTypes.STRING(30)
        },
        admin: {
            type: dataTypes.STRING(2)
        }

    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    let User = sequelize.define(alias, cols, config);

    User.associate = function(models){

        User.hasMany(models.Facturas, {
            as: "facturas",
            foreignKey: "id_clientes_facturas"
        })}


    return User
}