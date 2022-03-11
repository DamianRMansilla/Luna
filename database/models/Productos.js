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
        idcategoria_producto: {
            type: dataTypes.INTEGER
        },
        idtalle1: {
            type: dataTypes.INTEGER
        },
        idtalle2: {
            type: dataTypes.INTEGER
        },
        idtalle3: {
            type: dataTypes.INTEGER
        },
        idtalle4: {
            type: dataTypes.INTEGER
        },
        idtalle5: {
            type: dataTypes.INTEGER
        },
        idtalle6: {
            type: dataTypes.INTEGER
        },
        cantidad_stock1: {
            type: dataTypes.INTEGER
        },
        cantidad_stock2: {
            type: dataTypes.INTEGER
        },
        cantidad_stock3: {
            type: dataTypes.INTEGER
        },
        cantidad_stock4: {
            type: dataTypes.INTEGER
        },
        cantidad_stock5: {
            type: dataTypes.INTEGER
        },
        cantidad_stock6: {
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
            as: "talle1",
            foreignKey:"idtalle1"
        })
        Producto.belongsTo(models.Talle, {
            as: "talle2",
            foreignKey:"idtalle2"
        })
        Producto.belongsTo(models.Talle, {
            as: "talle3",
            foreignKey:"idtalle3"
        })
        Producto.belongsTo(models.Talle, {
            as: "talle4",
            foreignKey:"idtalle4"
        })
        Producto.belongsTo(models.Talle, {
            as: "talle5",
            foreignKey:"idtalle5"
        })
        Producto.belongsTo(models.Talle, {
            as: "talle6",
            foreignKey:"idtalle6"
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