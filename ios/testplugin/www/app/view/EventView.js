Ext.define("App.view.EventView", {
    extend: "Ext.List",    
	alias: "widget.eventview",
    config: {  	
		flex:1,
		
		itemTpl: ['<div>',
				 '<div style="font-size:18px;">{event_title}</div>',
				 '<div>',
				 '<div style="font-size:14px;float:left;">{event_date}</div>',
				 '<div style="font-size:14px;float:right;">{event_start_time} - {event_ending_time}</div>',
				 '</div>',
				 '</div>'].join(''),
		onItemDisclosure: true,
		store: 'EventStore',
		items:[
			{
				xtype: 'toolbar',
				title: 'Events',
				docked: 'top',
				items:[
				{
					xtype:'button',															
					cls: 'btnBackEvents',					
					ui: 'back',
					text: 'home'
				}
				]
			},
		]
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

