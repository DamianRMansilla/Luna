module.exports = function(sequelize, dataTypes){
    let alias = "Facturas";
    let cols = {
        id_facturas: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_clientes_facturas: {
            type: dataTypes.INTEGER
        },
        id_producto_facturas: {
            type: dataTypes.STRING
        },
        cantidad_producto: {
            type: dataTypes.INTEGER
        },
        precio_producto: {
            type: dataTypes.INTEGER
        },
        total_compra: {
            type: dataTypes.STRING
        },
        fecha_compra: {
            type: dataTypes.DATE
        }
    }
    let config = {
        tableName: "facturas",
        timestamps: false
    }
    let Facturas = sequelize.define(alias, cols, config);

    return Facturas
}