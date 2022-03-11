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
            as: "productos-talle1",
            foreignKey: "idtalle1"
        })
        Talle.hasMany(models.Producto, {
            as: "productos-talle2",
            foreignKey: "idtalle2"
        })
        Talle.hasMany(models.Producto, {
            as: "productos-talle3",
            foreignKey: "idtalle3"
        })
        Talle.hasMany(models.Producto, {
            as: "productos-talle4",
            foreignKey: "idtalle4"
        })
        Talle.hasMany(models.Producto, {
            as: "productos-talle5",
            foreignKey: "idtalle5"
        })
        Talle.hasMany(models.Producto, {
            as: "productos-talle6",
            foreignKey: "idtalle6"
        })
    
    }
        
        
    return Talle
}