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
            type: dataTypes.STRING(45)
        },
        idmarca: {
            type: dataTypes.INTEGER
        },
        precio: {
            type: dataTypes.INTEGER
        },
        descripcion: {
            type: dataTypes.STRING(255)
        },
        idtalle: {
            type: dataTypes.INTEGER
        },
        idcategoria_producto: {
            type: dataTypes.INTEGER
        },
        cantidad_stock: {
            type: dataTypes.INTEGER
        },
        imagen: {
            type: dataTypes.STRING(60)
        },
        nuevoIngreso: {
            type: dataTypes.STRING(2)
        }

    }
    let config = {
        tableName: "productos",
        timestamps: false
    }
    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){

        Producto.belongsTo(models.Marca, {
            as: "marca",
            foreignKey:"idmarca"
        })

        Producto.belongsTo(models.Color, {
            as: "color",
            foreignKey:"idcolor"
        })

        Producto.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey:"idcategoria_producto"
        })

        Producto.belongsTo(models.Talle, {
            as: "talles",
            foreignKey:"idtalle"
        })

        Producto.hasMany(models.Carrito, {
            as: "producto-carrito",
            foreignKey: "idproducto"
        })

        Producto.hasMany(models.Facturas, {
            as: "producto-facturas",
            foreignKey: "id_producto_facturas"
        })}

    return Producto
}