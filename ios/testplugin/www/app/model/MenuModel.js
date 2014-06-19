	Ext.define("App.model.MenuModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [
			'id','name','description','items','price','product_count','sku'
        ], 
            
    }
});