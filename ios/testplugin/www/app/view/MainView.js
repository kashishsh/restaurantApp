Ext.define("App.view.MainView", {
    extend: "Ext.Panel",    
	alias: "widget.mainview",
    config: {  	
	layout: 'card',
	items:[
	{
		title: '',
		iconCls: 'home',
		hidden:true,
		xtype: 'homeview'
	},
	{
		xtype: 'dashboardview',
		title: 'Dashboard'
	}],  
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

