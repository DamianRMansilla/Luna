module.exports = function(sequelize, dataTypes){
    let alias = "Categoria";
    let cols = {
        id_categoria_producto: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoria_producto: {
            type: dataTypes.STRING(20)
        },
        temporada: {
            type: dataTypes.STRING(20)
        }
    }
    let config = {
        tableName: "categoria_producto",
        timestamps: false
    }
    let Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Producto, {
            as: "productos-categoria",
            foreignKey: "idcategoria_producto"
        })}
        
    return Categoria
}