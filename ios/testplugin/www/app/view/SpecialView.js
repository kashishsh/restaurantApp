Ext.define("App.view.SpecialView", {
    extend: "Ext.form.Panel",    
	alias: "widget.specialview",
    config: {  	
		
		items:[
			{
				html: [
						'<div class="titleDetails">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>',
						'<div class="paraDetail">',						
						'<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>',			
						'</div>'
					].join(''),	
			},  
			{
				xtype: 'fieldset',
				margin: '30 0 0 0',
				items: [
					{
							xtype: 'selectfield',
							label: 'Quantity',
							labelAlign: 'top',
							options: [
								{text: '1',  value: '1'},
								{text: '2', value: '2'},
								{text: '3',  value: '3'}
							]			
					},
					{
							xtype: 'textfield',
							label: 'Special Instructions (if any)',
							labelAlign: 'top',
									
					},
					
				],
			},
			{
				xtype: 'button',
				ui: 'confirm',
				text: 'ADD TO CART',
				margin : 50
			}
			
		]
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

