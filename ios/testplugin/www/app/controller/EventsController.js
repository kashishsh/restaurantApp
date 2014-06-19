Ext.define("App.controller.EventsController", {

    extend: "Ext.app.Controller",
    config: {
        refs:{        	
        	mainview: 'mainview',
        	eventview: 'eventview',
        	eventdetails: 'eventdetails',
            attendview: 'attendview'
        },
        control:{        	
        	'button[cls=btnBackEvents]':{
        		tap: 'backFromEvents'
        	},
            'button[cls=btnAddComment]':{
                tap: 'addComment'
            },

        	eventview: {
				itemtap: 'showEventDetails'
			},
			eventdetails: {
				itemtap: 'evenDetailItemTap',
				eventButtonTap: 'eventButtonTap'
			},
            'button[cls=btnAttend]':{
                tap: 'attendEvent'
            },
        }
    }, 
    attendEvent: function(){
        var data= this.getAttendview().getValues();
        if(data.attendEvent==1){
            getUserFbData(function(fb_data){
                allData = {                 
                message: 'Please Wait',
                url:'http://www.toyinrestaurant.com/himrest/index.php/json/joinEvent',
                type: 'POST',
                data: {
                    facebook_id: fb_data.id,
                    facebook_image_path: 'https://graph.facebook.com/'+fb_data.id+'/picture?type=large',
                    event_id: App.app.getController('EventsController').selectedEvent.event_id,
                    facebook_profile_name: fb_data.first_name

                },
                callback: function (data) {  
                    App.app.sayAlert('Success');
                }};
                
                App.app.sendAjaxRequest.call(allData);                 
        });
            
        }
    },
    addComment: function(){
        if(Ext.getCmp('popupPanel'))
            Ext.getCmp('popupPanel').destroy();         
        var panel= Ext.Viewport.add({
            xtype: 'popupview',
            items: [

               {
                xtype: 'formpanel',             
                flex:1,
                items:[
                    {
                        xtype: 'fieldset',                        
                        items:[
                            {
                                xtype: 'textareafield',                                
                                id: 'txtAddComment' ,  
                                placeHolder: 'Your Comment here..'                             
                            }                            
                        ]
                    },
                    {
                        xtype: 'button',
                        text: 'Submit',
                        ui: 'action',
                        handler: this.submitComment


                    }
                ]
            }
            ]
        });
        panel.show();

    },
    submitComment: function(){
        var text= Ext.getCmp('txtAddComment').getValue();
        if(text=="")
        {
            App.app.sayAlert('Comment can not be empty');
            return false;
        }
        getUserFbData(function(fb_data){
            allData = {                 
            message: 'Please Wait',
            url:'http://www.toyinrestaurant.com/himrest/index.php/json/postComment',
            type: 'POST',
            data: {
                facebook_id: fb_data.id,
                facebook_image_path: 'https://graph.facebook.com/'+fb_data.id+'/picture?type=large',
                event_id: App.app.getController('EventsController').selectedEvent.event_id,
                comment: text
            },
            callback: function (data) {  
                Ext.getCmp('popupPanel').destroy();
                App.app.sayAlert('Your comment has been posted.');                                          
            }};            
            App.app.sendAjaxRequest.call(allData);                  
        });
        
    },
     eventButtonTap: function(btn){
     	this.getEventdetails().down('#EventContainer').setActiveItem(btn.getData().index);		
    	
    }, 
    showEventDetails: function( obj, list, index, target, record, e, eOpts ){    
		this.selectedEvent= target.data;                    
        var str='';
        for(var i in this.selectedEvent.images){
            str+= '<img src="'+this.selectedEvent.images[i]+'"/>';  
        }
        if(this.selectedEvent.images.length==0)
            str= "No image found..";        
        this.getEventdetails().down('#segmentedbuttonEvents').setPressedButtons([0]);
        this.getEventdetails().down('#EventContainer').setActiveItem(0);
        this.getEventdetails().down('aboutevent').setData(this.selectedEvent);
        Ext.getStore('EventCommentStore').removeAll();
        Ext.getStore('EventCommentStore').setData(this.selectedEvent.comments);                
        this.getEventdetails().down('galleryview').setHtml(str);		
        this.getEventview().getParent().animateActiveItem(1,this.slideLeftTransition);    
	},   
    backFromEvents: function(){    	
    	this.getMainview().animateActiveItem(0,this.slideRightTransition);	
    },
	slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    launch: function(){
    	
    	
    }
});