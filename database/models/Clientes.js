module.exports = function(sequelize, dataTypes){
    let alias = "Cliente";
    let cols = {
        id_clientes: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_clientes: {
            type: dataTypes.STRING
        },
        apellido_clientes: {
            type: dataTypes.STRING
        },
        domicilio_clientes: {
            type: dataTypes.STRING
        },
        ciudad_clientes: {
            type: dataTypes.STRING
        },
        telefono_clientes: {
            type: dataTypes.INTEGER
        },
        idcarrito: {
            type: dataTypes.INTEGER
        },
        AVATAR: {
            type: dataTypes.STRING
        },
        email_user_clientes: {
            type: dataTypes.STRING
        },
        password_clientes: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "clientes",
        timestamps: false
    }
    let Cliente = sequelize.define(alias, cols, config);

    Cliente.associate = function(models){
        Cliente.belongsTo(models.Carrito, {
            as: "carrito",
            foreignKey: "idclientes"
        })

        Cliente.hasMany(models.Facturas, {
            as: "facturas",
            foreignKey: "id_clientes_facturas"
        })}

    return Cliente
}