Ext.define("App.store.GalleryStore", {
    extend: "Ext.data.Store",    
    config: {
        model: "App.model.GalleryModel",		
		proxy: {
	        type: 'ajax',
	        url : 'http://www.toyinrestaurant.com/himrest/index.php/json/getGallery',
	        reader: {
	            type: 'json',
	            rootProperty: 'data'
	        }
	   },
	    autoLoad: true
    }
});
		