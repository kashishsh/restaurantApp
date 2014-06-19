Ext.define("App.view.MenuDetails", {
    extend: "Ext.form.Panel",    
	alias: "widget.menudetails",
    config: {  			
		items:[		
			{
				xtype: 'titlebar',
				title: 'Menu',
				docked: 'top',
				itemId: 'tool_item',				
				items:[
				{
					xtype:'button',															
					cls: 'btnBackFromDetails',					
					ui: 'back',
					text: 'Menu',
					itemId: 'btnBackFromDetails',

				},
				{
					xtype:'button',										
					iconCls: 'shop1',								
					iconMask: true,					
					cls: 'btnShowCart',					
					align: 'right'
				}
			]
				

			},
			{
				xtype: 'fieldset',
				flex:1,
				defaults:{
					labelCls: 'clsLabel',
					disabledCls: 'clsDisable'
				},				
				items:[
					{
						xtype: 'textfield',
						disabled: true,
						labelAlign: 'top',
						disabledCls: 'clsDisable',
						label: 'Details',
						id: 'txtDescription'
						
					},
					{
						xtype: 'textfield',
						disabled: true,
						labelAlign: 'top',
						label: 'Price',						
						id: 'txtPrice'
					},
					{
							xtype: 'selectfield',
							label: 'Quantity',
							labelAlign: 'top',
							name: 'quantity',
							itemId: 'txtQuantity',
							options: [
								{text: '1',  value: '1'},
								{text: '2', value: '2'},
								{text: '3',  value: '3'}
							]			
					},
					{
							xtype: 'textfield',
							name: 'special_comment',
							itemId: 'special_comment',
							label: 'Special Instructions (if any)',
							labelAlign: 'top',
									
					},
				]
			},
			{
				xtype: 'button',
				ui: 'action',
				style: 'width: 60%;font-size: 14px;position: relative;margin: 0px auto;',
				text: 'ADD TO CART',
				cls: 'btnAddToCart'				
			}			
		]
	},  
	initialize: function(){
		console.log(this.getData());
		this.callParent(arguments); 
	},	
});

