module.exports = function(sequelize, dataTypes){
    let alias = "Producto";
    let cols = {
        id_productos: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idcolor: {
            type: dataTypes.INTEGER
        },
        producto: {
            type: dataTypes.STRING
        },
        idmarca: {
            type: dataTypes.INTEGER
        },
        precio: {
            type: dataTypes.INTEGER
        },
        descripcion: {
            type: dataTypes.STRING
        },
        talle: {
            type: dataTypes.STRING
        },
        idcategoria_producto: {
            type: dataTypes.INTEGER
        },
        cantidad_stock: {
            type: dataTypes.INTEGER
        }
    }
    let config = {
        tableName: "productos",
        timestamps: false
    }
    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.hasMany(models.Carrito, {
            as: "prducto-carrito",
            foreignKey: "idproducto"
        })

        Producto.hasMany(models.Facturas, {
            as: "producto-facturas",
            foreignKey: "id_producto_facturas"
        })}

    return Producto
}