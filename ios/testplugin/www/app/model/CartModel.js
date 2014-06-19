Ext.define("App.model.CartModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [
			'sku','qty','unit_price','inst','name'
        ],
    }
});