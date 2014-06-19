Ext.define("App.view.GalleryView", {
    extend: "Ext.Panel",    
	alias: "widget.galleryview",
    config: {  	
    	scrollable: 'vertical',		
		
		flex:1
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

