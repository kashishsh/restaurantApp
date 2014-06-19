Ext.define("App.view.DashboardView", {
    extend: "Ext.tab.Panel",    
	alias: "widget.dashboardview",
    config: {  	
	tabBar: {
		docked: 'bottom',
		scrollable: 'horizontal'
		
	},	  
	items:[	
	{		
		xtype: 'panel',				
		title: 'Location',
		layout: 'vbox',		
		iconCls: 'locate4',
		items:[
			{		
				xtype: 'mapview',				
				title: 'Location',									
				flex:1,
			},
			{
				xtype: 'toolbar',
				title: 'Location',				
				docked: 'top',
				items:[
				{
					xtype:'button',															
					cls: 'btnBackMap',					
					ui: 'back',
					text: 'home'
				}
				]
			},		
			{
				xtype: 'toolbar',
				docked: 'bottom',
				defaults: {
					height:30,
					cls: 'btnMapBottom',
					xtype: 'button'
				},
				items:[
					{
						text: 'Call'
					},
					{
						xtype: 'spacer'
					},
					{
						text: 'Website'
					},
					{
						xtype: 'spacer'
					},
					{
						text: 'Email'
					}
				]
			}	
		]
		
	},	
	{
		title: 'Event',
		xtype: 'panel',
		iconCls: 'calendar2',		
		layout: 'card',		
		id: 'eventView',
		items: [			
			{
				xtype: 'eventview'	
			},
			{
				xtype: 'eventdetails'	
			},
			
		]
	},
	{
		title: 'Menu',
		xtype: 'panel',
		iconCls: 'pizza',		
		layout: 'card',
		items: [			
			{
				xtype: 'menuview'	
			},
			{
				xtype: 'menudetails'	
			},
			
		]
	},
	{
		title: 'Cart',
		xtype: 'cartview',								
		iconCls: 'shop1',
	},
	{
		title: 'Loyalty',
		xtype: 'loyaltyview',						
		iconCls: 'dollar'
		//iconCls: 'home',
	},
	{
		title: 'More',
		xtype: 'moreview',						
		iconCls: 'list'
		//iconCls: 'home',
	},
	
	],  
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

