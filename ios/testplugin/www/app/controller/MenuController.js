Ext.define("App.controller.MenuController", {

    extend: "Ext.app.Controller",
    config: {
        refs:{
        	
        	mainview: 'mainview',
        	menuview: "menuview",
        	menudetails: 'menudetails',
        	dashboardview: 'dashboardview'
        },
        control:{
        	menuview:{
				leafitemtap: 'showMenuDetails',	
				itemtap: 'menuItemTap',			
			},
			'button[cls=btnBackFromMenu]':{
				tap: 'backToHome'
			},
			'button[cls=btnBackFromDetails]':{
				tap: 'backFromDetails'
			},
			'button[cls=btnShowCart]':{
				tap: 'showCart'
			},
			'button[cls="btnAddToCart"]':{
				tap: 'addToCart'				
			},
            'button[cls="btnPlaceOrder"]':{
                tap: 'checkForLoyaltyPoints'                
            },  
            cartview: {
                activate: 'cartviewActive'
            }          
        }
    },
    checkForLoyaltyPoints: function(){
        //alert(App.app.loyalityPoints);
        if(App.app.loyalityPoints != 0 && Ext.getStore('CartStore').getCount()!=0)
        {
            //alert(123);
            var loyalityPoints= App.app.loyalityPoints, data= [];
            for(var i=1; i<=parseInt(loyalityPoints); i++)
            {            
                data.push({text:i, value:i});
            }
            Ext.Msg.confirm('ToyInRestaurant', 'Do you want to redeem your loyalty points', function(val){
                if(val == 'yes')
                {
                    if(Ext.getCmp('popupPanel'))
                        Ext.getCmp('popupPanel').destroy();         
                    var panel= Ext.Viewport.add({
                        xtype: 'panel',
                        height: '85%',
                        width: '85%',                    
                        layout: 'vbox',
                        id: 'popupPanel',
                        hideOnMaskTap: true,
                        items: [
                            {
                                title: 'Redeem',
                                xtype: 'titlebar',
                                docked: 'top',
                                items:[
                                    {
                                        text: 'Cancel',
                                        align: 'left',
                                        handler: function(){
                                            Ext.getCmp('popupPanel').destroy();
                                        }
                                    },
                                    {
                                        text: 'Done',
                                        align: 'right',
                                        handler: function(){
                                            App.app.getController('MenuController').placeOrder(Ext.getCmp('selectLoyalty').getValue());
                                        }
                                    }
                                ]
                            },                        
                            {
                                xtype: 'fieldset',
                                padding:5,
                                
                                items: [
                                    {
                                        xtype: 'selectfield',     
                                        label: 'How many points you want to redeem ?',
                                        labelAlign: 'top',  
                                        id: 'selectLoyalty',
                                        labelWrap: true,                             
                                        options: data
                                    }
                                ]
                            }
                        ],
                        modal: true,
                        centered:true,          
                    });
                    panel.show();
                }
            });
        }    
        else
        {
            this.placeOrder();
        }    
    },
    cartviewActive: function(){
        var item=  Ext.getCmp('emptyTextCart');
        if(Ext.getStore('CartStore').getCount() == 0)
        {
            item.show();
        }
        else
        {
            item.hide();
        }
    },
    placeOrder: function(loyalty){          
        var order_items= [];        
        if(Ext.getStore('CartStore').getCount()==0){
            App.app.sayAlert('No item added to cart');
            return false;
        }
        Ext.getStore('CartStore').each(function(record){
                order_items.push(record.data);
        });        
        getUserFbData(function(fb_data){
              allData = {                
                    
                    url:'http://www.toyinrestaurant.com/himrest/index.php/json/placeOrder',
                    type: 'POST',
                    data: {
                        facebook_id: fb_data.id,
                        name: fb_data.first_name,
                        order_items: Ext.encode(order_items),
                        lpoints: (loyalty)? loyalty : 0
                    },                    
                    callback: function (data) {                                                                  
                        App.app.sayAlert('Your order has been placed', function(){
                            Ext.getStore('CartStore').removeAll();
                            var item=  Ext.getCmp('emptyTextCart');    
                            item.show();       
                        });                                         
                        var result=Ext.decode(data.responseText).data;                            
                        document.getElementById('loyaltyPoints').innerHTML= result.loyality;
                        App.app.loyalityPoints= parseFloat(result.loyality);
                        if(Ext.getCmp('popupPanel'))
                        Ext.getCmp('popupPanel').destroy(); 
                    }};                    
                    App.app.sendAjaxRequest.call(allData);
        });          
    },
    getLoyaltyPoints: function(fb_id){
         allData = {                 
                    
                    url:'http://www.toyinrestaurant.com/himrest/index.php/json/getloyalty/',
                    type: 'POST',
                    data: {
                        fbid: fb_id                        
                    },                    
                    callback: function (data) {                          
                        var result=Ext.decode(data.responseText).data;                            
                        document.getElementById('loyaltyPoints').innerHTML= result[0].points;                                                                
                    }};
                    App.app.sendAjaxRequest.call(allData);
    },
    showCart: function(){
    	
    	this.getDashboardview().animateActiveItem(3,this.slideLeftTransition);	
    },
    backFromDetails: function(){
    	this.getMenuview().getParent().animateActiveItem(0,this.slideRightTransition);
    },
    menuItemTap: function(obj, list, index, target, record, e, eOpts){
    	obj.down('#btnBackFromMenu').hide();
    	
    },
    backToHome: function(){
    	this.getMainview().animateActiveItem(0,this.slideRightTransition);	
    },    
    showMenuDetails: function( obj, list, index, target, record, e, eOpts ){		
		this.selectedMenuItem= record.data;	
		this.getMenudetails().down('#tool_item').setTitle(record.data.name);
		Ext.getCmp('txtDescription').setValue(record.data.description);
		Ext.getCmp('txtPrice').setValue('$'+record.data.price);		
		list.getParent().getParent().animateActiveItem(1,this.slideLeftTransition);
	},
	addToCart: function(){
    	/*{id: "ext-record-35", name: "Bacon wrapper shrimps", special_comment: undefined, quantity: undefined, parentId: "ext-record-27"…}*/    	    	
    	var me= this, values= {};
        //alert(Ext.encode(me.selectedMenuItem));
    	var callback= function(){
    		/*var values= me.selectedMenuItem;
	    	values.id = Math.floor(Math.random()*100);
	    	values.special_comment = me.getMenudetails().down('#special_comment').getValue();
	    	values.quantity = me.getMenudetails().down('#txtQuantity').getValue();    	*/
            values.name= me.selectedMenuItem.name;
            values.sku= me.selectedMenuItem.sku;
            values.qty= me.getMenudetails().down('#txtQuantity').getValue();
            values.unit_price= me.selectedMenuItem.price;
            values.inst= me.getMenudetails().down('#special_comment').getValue();
	    	var cartStore= Ext.getStore('CartStore');    	
	    	cartStore.add(values);
	    	me.backFromDetails();
    	}
    	App.app.sayAlert('Item added to card',callback);
    },
	slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    launch: function(){
    	
    }
});