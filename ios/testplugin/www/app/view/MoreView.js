Ext.define("App.view.MoreView", {
    extend: "Ext.Panel",    
	alias: "widget.moreview",
    config: {  	
    	layout: 'vbox',
		items:[
			{
				xtype: 'toolbar',
				title: 'More',
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
				xtype: 'morelist',
				flex:1
			}
		]
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

