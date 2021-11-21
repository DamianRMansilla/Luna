module.exports = function(sequelize, dataTypes){
    let alias = "Talle";
    let cols = {
        id_talles: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        talles: {
            type: dataTypes.STRING(10)
        },
    }
    let config = {
        tableName: "talles",
        timestamps: false
    }
    let Talle = sequelize.define(alias, cols, config);

    Talle.associate = function(models){
        Talle.hasMany(models.Producto, {
            as: "productos-talle",
            foreignKey: "idtalle"
        })}
        
    return Talle
}