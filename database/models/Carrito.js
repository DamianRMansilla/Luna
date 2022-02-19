module.exports = function(sequelize, dataTypes){
    let alias = "Carrito";
    let cols = {
        id_carrito: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idproducto: {
            type: dataTypes.INTEGER
        },
        idclientes: {
            type: dataTypes.INTEGER
        },
        descripcion: {
            type: dataTypes.STRING
        },
        cant_producto: {
            type: dataTypes.INTEGER
        },
        precio: {
            type: dataTypes.INTEGER
        },
        precio_total: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "carrito",
        timestamps: false
    }
    let Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = function(models){
        Carrito.belongsTo(models.User, {
            as: "cliente",
            foreignKey: "idcarrito"
        })
    
    }     

    return Carrito
}