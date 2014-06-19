Ext.define("App.view.CartView", {
    extend: "Ext.List",    
	alias: "widget.cartview",
    config: {  			
		flex:1,		
		itemTpl: '<div><div style="float:left;">{name}</div></div>',
		store: 'CartStore',	
		emptyText: 'No items added to cart',	
		data: [],	
		items:[			
			{
				xtype: 'titlebar',
				title: 'Cart',
				docked: 'top',
				items:[
				{
					xtype:'button',															
					cls: 'btnBackMap',					
					ui: 'back',
					text: 'home'
				},
				{
					xtype:'button',																																		
					text: 'Place Order',
					align: 'right',
					cls: 'btnPlaceOrder'

				}
				]
			},		
			{
				id: 'emptyTextCart',
				hidden: true,
				html: '<div style="width:100%;text-align:center;">No items added to cart.</div>'
			}	
		]
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

