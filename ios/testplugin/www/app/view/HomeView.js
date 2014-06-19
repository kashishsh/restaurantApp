Ext.define("App.view.HomeView", {
    extend: "Ext.Panel",    
	alias: "widget.homeview",
    config: {  	
		layout: 'vbox',
		items: [
			{
				xtype: 'titlebar',
				title: 'RestaurantApp',
				docked: 'top'
			},
			{
				xtype: 'rotatingcarousel',
				flex:.55,
				delay: 3000,
				itemId: 'main_carousel',
				direction: 'horizontal',
				cls: 'panelCarousel',
				defaults:{
					
				},
				items: [
				 
				]	
			},
			{
				xtype: 'panel',
				cls: 'panelMain',
				html: [
					'<div class="divMenu">',
					'<img src="images/homeImages/location.png" id="img_0"/>',
					'<img src="images/homeImages/event.png" id="img_1"/>',
					'<img src="images/homeImages/menu-icon.png" id="img_2"/>',					
					'</div>',
					'<div class="divMenu">',
					'<img src="images/homeImages/cart.png" id="img_3"/>',			
					'<img src="images/homeImages/loyalty.png" id="img_4"/>',
					'<img src="images/homeImages/more.png" id="img_5"/>',							
					'</div>'
				].join(''),
				listeners:{
					tap: function(e,record){						
						var img= e.getTarget('img');						
						this.getParent().fireEvent('onDashboardButtonTap',img.id);	
					},
					delegate: 'img',					
					element: 'element'
				},
				flex:.45
			}
		]
	},  	
	initialize: function(){
		this.callParent(arguments); 		
	},	
});

