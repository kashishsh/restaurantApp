Ext.define("App.model.CityModel", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id'},
            { name: 'name'}          
        ],        
    }
});