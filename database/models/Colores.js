module.exports = function(sequelize, dataTypes){
    let alias = "Color";
    let cols = {
        id_colores: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_color: {
            type: dataTypes.STRING(20)
        }
    }
    let config = {
        tableName: "colores_productos",
        timestamps: false
    }
    let Color = sequelize.define(alias, cols, config);

    Color.associate = function(models){
        Color.hasMany(models.Producto, {
            as: "productos-color",
            foreignKey: "idcolor"
        })}

    return Color
}