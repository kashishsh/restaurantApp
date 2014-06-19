Ext.define("App.store.GuestCommentStore", {
    extend: "Ext.data.Store",    
    config: {
        model: "App.model.GuestCommentModel",		
		proxy: {
	        type: 'ajax',
	        url : 'http://toyinrestaurant.com/himrest/index.php/json/latestComment',
	        reader: {
	            type: 'json',
	            rootProperty: 'data'
	        }
	   },
	    autoLoad: true
    }
});
		