module.exports = function(sequelize, dataTypes){
    let alias = "Marca";
    let cols = {
        id_marcas: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        marcas: {
            type: dataTypes.STRING(30)
        },
    }
    let config = {
        tableName: "marcas",
        timestamps: false
    }
    let Marca = sequelize.define(alias, cols, config);

    Marca.associate = function(models){
        Marca.hasMany(models.Producto, {
            as: "productos-marcas",
            foreignKey: "idmarca"
        })}
        
    return Marca
}