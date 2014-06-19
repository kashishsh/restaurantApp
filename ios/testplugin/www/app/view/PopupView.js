Ext.define("App.view.PopupView", {
    extend: "Ext.Panel",    
	alias: "widget.popupview",
    config: {  	
			
			height: '85%',
			width: '85%',
			id: 'popupPanel',
			hideOnMaskTap: true,
			layout: 'vbox',
			items: [
			{
				xtype: 'titlebar',
				title: 'Comments',
				items:[
				{
					text: 'Close',
					align: 'right',
					handler: function(){
						Ext.getCmp('popupPanel').destroy();
					}
				}
				]
			},
			{
				xtype: 'list',
				flex:1,
				itemTpl: '{name}',
				onItemDisclosure: true,
				data:[
				{id:1, name: 'Comment 1'},
				{id:2, name: 'Comment 2'},
				{id:3, name: 'Comment 3'},
				{id:4, name: 'Comment 4'},
				]
			}
			],
			modal: true,
			centered:true,			
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

