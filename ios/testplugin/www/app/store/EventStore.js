Ext.define("App.store.EventStore", {
    extend: "Ext.data.Store",    
    config: {
        model: "App.model.EventModel",		
		proxy: {
            type: 'ajax',
           /// url : 'http://restaurant.toyinrestaurant.com/api/restaurant/restaurant_events/retrieve/?limit=5',
		    url: 'http://www.toyinrestaurant.com/himrest/index.php/json/getEvent',
            reader: {
                type: 'json',
				rootProperty: 'data'				
            }
       },
	    autoLoad: true
    }
});
