Ext.define("App.view.EventCommentList", {
    extend: "Ext.List",    
	alias: "widget.eventcommentlist",
    config: {  	
		itemTpl: '{comment}',			
		flex:1,
		emptyText: 'No comments available',
		store: 'EventCommentStore',
		items:[
			{
				xtype:  'titlebar',
				docked: 'bottom',
				items:[
					{
						xtype: 'button',
						align: 'right',
						text: 'Add comment',
						cls: 'btnAddComment'
					}
				]
			}
		]		
		
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

