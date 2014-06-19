Ext.define("App.model.PreviousCaseModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [            			
			{name: 'id'},
			{name: 'user_id'},
			{name: 'complain'},
			{name: 'created'},						
        ],	
    }
});