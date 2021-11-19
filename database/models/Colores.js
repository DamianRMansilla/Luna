module.exports = function(sequelize, dataTypes){
    let alias = "Color";
    let cols = {
        id_colores: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_color: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "colores",
        timestamps: false
    }
    let Color = sequelize.define(alias, cols, config);

    Color.associate = function(models){
        Color.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "idcolor"
        })}

    return Color
}