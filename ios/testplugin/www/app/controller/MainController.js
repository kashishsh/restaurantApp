Ext.define("App.controller.MainController", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.            
			mainview: 'mainview',
			//homeview: 'homeview',
            menuview: "menuview",
			menudetails: 'menudetails',
			
			
			
			dashboardview: 'dashboardview',

		},
        control: {
			'button[cls="btnHome"]':{
				tap: 'backToHome'				
			},	
			'button[cls="btnHomeEvent"]':{
				tap: 'backToEvents'				
			},		
			
			'button[cls="btnMenuDetail"]':{
				tap: 'backToMenu'				
			},			
			'button[cls="btnMap"]':{
				tap: 'btnMapTap'				
			},					
			/*homeview:{
				onDashboardButtonTap: 'onDashboardButtonTap',
				
			},*/	
			
						/*eventdetails: {
				itemtap: 'evenDetailItemTap',
				eventButtonTap: 'eventButtonTap'
			},*/
			
			/*cartview: {
				itemtap: 'loyaltyItemTap'
			}*/

        }
    },
    backToEvents: function(){    	
    	Ext.getCmp('eventView').animateActiveItem(0,this.slideRightTransition);    	
    },    
    eventButtonTap: function(btn){
    	var text= btn.getText();
    	this.getEventdetails().down('#EventContainer').removeAll();
    	switch(text)
    	{
    		case  'About':
    		this.getEventdetails().down('#EventContainer').add({
    			xtype: 'aboutevent',
    			data: this.selectedEvent
    		});
    		break;

    		case 'Comments':
    		this.getEventdetails().down('#EventContainer').add({
    			xtype: 'eventcommentlist',    			
    		});
    		break;
    	
    		case 'Attend':
    		this.getEventdetails().down('#EventContainer').add({
    			xtype: 'formpanel',    			
    			flex:1,
    			items:[
    				{
    					xtype: 'fieldset',
    					title: 'Are you attending this event ?',
    					items:[
    						{
    							xtype: 'radiofield',
    							label: 'YES',
    							name: 'attendEvent'
    						},
    						{
    							xtype: 'radiofield',
    							label: 'NO',
    							name: 'attendEvent'
    						}
    					]
    				},
    				{
    					xtype: 'button',
    					text: 'Submit',
    					ui: 'action',
    					listeners:{
    						
    							
    					} 
    				}
    			]
    		});
    		break;
    	
    		case 'Gallery':
			var str='';
			for(var i in this.selectedEvent.images){
				str+= '<img src="'+this.selectedEvent.images[i]+'"/>';	
			}
			if(this.selectedEvent.images.length==0)
				str= "No image found..";
			this.getEventdetails().down('#EventContainer').add({
				cls: 'panelGallery',
				html: str,
			});
    		break;
    	}
    },	
    backToMenu: function(btn){    	
    	this.getMenudetails().getParent().animateActiveItem(0,this.slideRightTransition);    	
    	//btn.getParent().getParent().getParent().animateActiveItem(0,this.slideRightTransition);    	

    },
   
	loyaltyItemTap: function( obj, list, index, record){
		if(Ext.getCmp('popupPanel'))
			Ext.getCmp('popupPanel').destroy();			
		var panel= Ext.Viewport.add({
			xtype: 'panel',
			height: '85%',
			width: '85%',
			id: 'popupPanel',
			hideOnMaskTap: true,
			layout: 'vbox',
			items: [
			{
				xtype: 'titlebar',
				title: record.data.name,
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
				xtype: 'fieldset',
				padding:10,
				items:[
				{
					xtype: 'sliderfield',
					label: 'rate'
				},
				{
					html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'									
				}
				]
			},
				{
					xtype: 'button',
					ui: 'confirm',
					text: 'Stamp Card',
					margin : 50,
					handler: function(){
						Ext.getCmp('popupPanel').destroy();
					}
				}
			
			],
			modal: true,
			centered:true,			
		});
		panel.show();
	},
	btnMapTap: function(btn){
		
	},
	onMenuBackTap: function(obj){
		if(obj.getText()=="Home")
		{
			this.backToHome();
		}
		else
		{
			Ext.Viewport.down('#btnBackMenu').setText('Home');
			this.getMenuview().getParent().animateActiveItem(0,this.slideRightTransition);
		}
	},
	menudetailshow: function(obj,newItem,oldItem){
		//this.getMenuview().getParent();
	},
	backToHome: function(){
		this.getMainview().animateActiveItem(0,this.slideRightTransition);	
	},
	
	sharePhoto: function(){
		if(Ext.getCmp('popupPanel'))
			Ext.getCmp('popupPanel').destroy();			
		var panel= Ext.Viewport.add({
			xtype: 'panel',
			height: '80%',
			width: '80%',
			id: 'popupPanel',
			hideOnMaskTap: true,
			layout: 'vbox',
			items: [
				{
				xtype: 'titlebar',
				title: 'Share Photos',
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
				html: '<div style="text-align:center;">Share a photo with us</div>',
				styleHtmlContent: true,				
			},
			{
				xtype: 'button',
				ui: 'confirm',
				text: 'Take Picture',
				margin : 50,
				handler: function(){					
					navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
					    destinationType: Camera.DestinationType.FILE_URI }); 

					function onSuccess(imageURI) {
					    var image = document.getElementById('myImage');
					    image.src = imageURI;
					}

					function onFail(message) {
					    alert('Failed because: ' + message);
					}
				}
			}],
			modal: true,
			centered:true,			
		});
		panel.show();
		
	},
	showGuestWall: function(){
		if(Ext.getCmp('popupPanel'))
			Ext.getCmp('popupPanel').destroy();			
		var panel= Ext.Viewport.add({
			xtype: 'panel',
			height: '85%',
			width: '85%',
			id: 'popupPanel',
			hideOnMaskTap: true,
			layout: 'vbox',
			items: [
			{
				xtype: 'titlebar',
				title: 'Guest Wall',
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
			xtype: 'segmentedbutton',
			layout: 'hbox',
			defaults: {
				flex:1,
				style: 'border-radius: 0px;',
				handler: function(btn){
					//Ext.getCmp('parentPanel').getAt(0).destroy();
					if(btn.getText().match("Comment"))
					{
						//Ext.getCmp('parentPanel').add(this.commentList);
						Ext.getCmp('commentList').show();
						Ext.getCmp('mapLocation').hide();
						Ext.getCmp('gallery2').hide();
					}
					else if(btn.getText().match('Location'))
					{
						Ext.getCmp('commentList').hide();
						Ext.getCmp('mapLocation').show();
						Ext.getCmp('gallery2').hide();
					}
					else
					{	
						Ext.getCmp('commentList').hide();
						Ext.getCmp('mapLocation').hide();
						Ext.getCmp('gallery2').show();
					}
				}
			},
			items:[
			{
				text: 'Comment'
			},
			{
				text: 'Location'
			},
			{
				text: 'Gallery'
			}						
			]
		},
		{
			xtype: 'panel',
			flex:1,
			id: 'parentPanel',
			layout: 'vbox',
			items:[
				this.commentList,
				this.location,
				this.gallery
			]
		}
			],
			modal: true,
			centered:true,			
		});
		panel.show();
		
	},
	signUpForNews: function(){		
		if(Ext.getCmp('popupPanel'))
			Ext.getCmp('popupPanel').destroy();			
		var panel= Ext.Viewport.add({
			xtype: 'panel',
			height: '85%',
			width: '85%',
			id: 'popupPanel',
			hideOnMaskTap: true,
			layout: 'vbox',
			items: [
			{
				xtype: 'titlebar',
				title: 'Sign Up',
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
				xtype: 'fieldset',
				padding:10,
				items:[
				{
					xtype: 'textfield',
					placeHolder: 'Name'
				},
				{
					xtype: 'textfield',
					placeHolder: 'Email Address'
				},
				{
					xtype: 'togglefield',
					label: 'News',
					labelWidth: '60%'
								
				},
				{
					xtype: 'togglefield',
					label: 'Special Offer',
					labelWidth: '60%'										
				}
				]
			},
				{
					xtype: 'button',
					ui: 'confirm',
					text: 'Join',
					margin : 50,
					handler: function(){
						Ext.getCmp('popupPanel').destroy();
					}
				}
			
			],
			modal: true,
			centered:true,			
		});
		panel.show();
	},
	
	showComments: function(record){
		//alert(Ext.encode(record));
		alert(1);
		if(Ext.getCmp('popupPanel'))
			Ext.getCmp('popupPanel').destroy();			
		var panel= Ext.Viewport.add({
			xtype: 'panel',
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
		});
		panel.show();
	},
	commentList: {
				xtype: 'list',
				flex:1,
				id: 'commentList',
				itemTpl: '{name}',				
				onItemDisclosure: true,
				data:[
				{id:1, name: 'Comment 1'},
				{id:2, name: 'Comment 2'},
				{id:3, name: 'Comment 3'},
				{id:4, name: 'Comment 4'},
				]
			},
	location:{
		xtype: 'map',
		hidden:true,
		flex:1,
		id: 'mapLocation'	
	},
	gallery: {
				cls: 'panelGallery',
				id: 'gallery2',
				hidden:true,
				flex:1,
				html: [
				'<img src="images/IMG-20140327-WA0037.jpg"/>',
				'<img src="images/IMG-20140327-WA0037.jpg"/>',
				'<img src="images/IMG-20140327-WA0037.jpg"/>',
				'<img src="images/IMG-20140327-WA0037.jpg"/>'
				].join(''),
			},
	showSharePanel: function(record){
		
		if(Ext.getCmp('popupPanel'))
			Ext.getCmp('popupPanel').destroy();			
		var panel= Ext.Viewport.add({
			xtype: 'panel',
			height: '85%',
			width: '85%',
			id: 'popupPanel',
			hideOnMaskTap: true,
			items: [
			{
				xtype: 'titlebar',
				title: 'Share',
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
				xtype: 'fieldset',
				items: [
				{
					xtype: 'button',
					ui: 'confirm',
					text: 'Scan Barcode',
					margin : 50,
					handler: function(){
						Ext.getCmp('popupPanel').destroy();
					}
				},
				{
					xtype: 'togglefield',
					label: 'Share'
				}
				]
			}
			],
			modal: true,
			centered:true,			
		});
		panel.show();        
	},
	showAboutEvent: function(record){
		//alert(Ext.encode(record));
		if(Ext.getCmp('popupPanel'))
			Ext.getCmp('popupPanel').destroy();			
		var panel= Ext.Viewport.add({
			xtype: 'panel',
			height: '85%',
			width: '85%',
			id: 'popupPanel',
			hideOnMaskTap: true,
			scrollable: 'vertical',
			items: [
			{
				xtype: 'titlebar',
				title: 'About',
				docked: 'top',
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
				styleHtmlContent: true,
				html: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
			}
			],
			modal: true,
			centered:true,			
		});
		panel.show();
	},	

	onBackButtonTap: function(){
		this.getMainview().animateActiveItem(0,this.slideRightTransition);
	},	
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    
    launch: function () {
        
    },
    init: function () {
        
    }
});