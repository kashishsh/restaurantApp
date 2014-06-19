Ext.define("App.view.EventDetails", {
    extend: "Ext.Panel",    
	alias: "widget.eventdetails",
    config:{
    	layout: 'vbox',
    	items:[
    		{
				xtype: 'toolbar',
				title: 'Events',
				docked: 'top',
				items:[	
				{
					xtype:'button',															
					cls: 'btnHomeEvent',					
					ui: 'back',
					text: 'back'
				}
				]
			},
    		{
			xtype: 'segmentedbutton',
			layout: 'hbox',
			cls: 'btnEvents',
			itemId: 'segmentedbuttonEvents',
			allowMultiple: false,
			defaults: {
				flex:1,
				style: 'border-radius: 0px;',
				handler: function(btn){					
					this.getParent().getParent().fireEvent('eventButtonTap',btn)
				}				
			},
			items:[
			{
				text: 'About',
				itemId: 'btnAbout',		
				pressed: true,		
				data: {index:0}
			},
			{
				text: 'Comments',
				data: {index:1}
			},
			{
				text: 'Attend',
				data: {index:2}
			},
			{
				text: 'Gallery',
				data: {index:3}
			}										
			]
		},
		{
			xtype: 'panel',
			layout: 'card',
			flex:1,
			itemId: 'EventContainer',
					items:[{
		    			xtype: 'aboutevent', 
		    			itemId: 'aboutevent'   			
		    		},
		    		{
		    			xtype: 'eventcommentlist',    			
		    			itemId: 'eventcommentlist'   			
		    		},
		    		{
		    			xtype: 'attendview',    		
		    			itemId: 'attendview'   				
		    		},
		    		{
		    			xtype: 'galleryview',    		
		    			itemId: 'galleryview',
		    			cls: 'panelGallery',   				
		    		},
    		]
		}
    	]
    },
	initialize: function(){
		this.callParent(arguments); 
	},	
});

