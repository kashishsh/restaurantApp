Ext.define("App.view.MenuView", {
    extend: "Ext.NestedList",    
	alias: "widget.menuview",	
	config:{
		displayField: 'name',
		store: 'MenuStore',
		title: 'Menu',
		backButton: {
			hidden: true,
			handler: function(){
				Ext.Viewport.down('#btnBackFromMenu').show();
			}

		},
		toolbar:{
			ui: 'dark',
			items:[
				{
					xtype:'button',															
					cls: 'btnBackFromMenu',					
					ui: 'back',
					text: 'home',
					itemId: 'btnBackFromMenu'
				}
			]
		},
		//onItemDisclosure: true
	},
	initialize: function(){
		this.callParent(arguments); 
	},	
});

