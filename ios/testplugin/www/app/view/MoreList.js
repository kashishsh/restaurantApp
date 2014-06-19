Ext.define("App.view.MoreList", {
    extend: "Ext.List",    
	alias: "widget.morelist",
    config: {  	
		itemTpl: '{name}',
		onItemDisclosure: true,
		title: 'More',
		data:[
			{id:1, name: 'Specials'},
			{id:2, name: 'Social Media'},
			{id:3, name: 'Gallery'},
			{id:4, name: 'Share Photos'},
			{id:5, name: 'Guest Wall'},
			{id:6, name: 'Sign Up'},
			{id:7, name: 'About Us'},						
		]		
		
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

