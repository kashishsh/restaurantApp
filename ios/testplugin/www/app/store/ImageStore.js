Ext.define("App.store.ImageStore", {
    extend: "Ext.data.Store",    
    config: {
        model: "App.model.ImageModel",		
		proxy: {
	        type: 'ajax',
	        url : 'http://www.toyinrestaurant.com/himrest/index.php/json/getCrousel',
	        reader: {
	            type: 'json',
	            rootProperty: 'data'
	        }
	   },
	    autoLoad: false
    }
});
		