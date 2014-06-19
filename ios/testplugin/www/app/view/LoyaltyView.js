Ext.define("App.view.LoyaltyView", {
    extend: "Ext.Panel",    
	alias: "widget.loyaltyview",	
	id: 'loyaltyview',
    config: {  
    	items:[
			{
				xtype: 'toolbar',
				title: 'Loyalty',
				docked: 'top',
				items:[
				{
					xtype:'button',															
					cls: 'btnBackMap',					
					ui: 'back',
					text: 'home'
				},
				]
			},
			{
				html: [
					'<div class="loyaltyHeading">Your loyalty points are:- </div>',
					'<div class="loyaltyPoints" id="loyaltyPoints">0</div>',
				].join('')
			}
		]					
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

