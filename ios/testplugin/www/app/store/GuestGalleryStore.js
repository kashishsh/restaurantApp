Ext.define("App.store.GuestGalleryStore", {
    extend: "Ext.data.Store",    
    config: {
        model: "App.model.GalleryModel",		
		proxy: {
	        type: 'ajax',
	        url : 'http://www.toyinrestaurant.com/himrest/index.php/json/getSharePhoto',
	        reader: {
	            type: 'json',
	            rootProperty: 'data'
	        }
	   },
	    autoLoad: true
    }
});
		