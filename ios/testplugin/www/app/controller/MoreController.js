    Ext.define("App.controller.MoreController", {

    extend: "Ext.app.Controller",
    config: {
        refs:{
        	morelist: 'morelist',
        	mainview: 'mainview',
        	
        },
        control:{
        	morelist: {
                itemtap: 'moreviewItemTap'
            },
        }
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
                    xtype: 'togglefield',
                    label: 'Share'
                }
                ]
            },
            {
                xtype: 'button',
                ui: 'confirm',
                text: 'Scan Barcode',
                margin : 50,
                handler: function(){
                    Ext.getCmp('popupPanel').destroy();
                    window.plugins.barcodeScanner.scan(
                       function(result) {
                       if (result.cancelled)
                       alert("the user cancelled the scan")
                       else
                       alert("we got a barcode: " + result.text)
                       },
                       function(error) {
                       alert("scanning failed: " + error)
                       }
                       );
                }
            },

            ],
            modal: true,
            centered:true,          
        });
        panel.show();        
    }, 
    showSocialMedia: function( ){
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
                title: 'Social Media',
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
                {id:1, name: 'Facebook',link: 'https://www.facebook.com/toyintakeout'},
                {id:2, name: 'Twitter',link: 'http://twitter.com'},             
                ],
                listeners:{
                    itemtap: function(obj, list, index, record){
                        window.open(record.data.link,"_blank");
                    }
                }
            }
            ],
            modal: true,
            centered:true,          
        });
        panel.show();
        
    },
    showGallery: function(record){
        //alert(Ext.encode(record));
        
        var store= Ext.getStore('GalleryStore');
        var str= [];
        store.each(function(record){
            str.push('<img src="'+record.data.image_path+'"/>') ;                   
        })
        console.log(str);
        if(Ext.getCmp('popupPanel'))
            Ext.getCmp('popupPanel').destroy();         
        var panel= Ext.Viewport.add({
            xtype: 'panel',
            height: '85%',
            width: '85%',
            id: 'popupPanel',
            hideOnMaskTap: true,        
            layout: 'vbox',
            scrollable: 'vertical',
            items: [
            {
                xtype: 'titlebar',
                title: 'Gallery',
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
                cls: 'panelGallery',
                html: str.join(''),                
            }
            ],
            modal: true,
            centered:true,          
        });
        panel.show();
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
                listeners:{
                    scope: this,
                    tap: {
                        fn: this.takePicture
                    }
                }
            }],
            modal: true,
            centered:true,          
        });
        panel.show();
        
    },
    uploadPhotoApi: function(imageURI) {
          App.app.toggleLoader(true,'Uploading Photo');
          getUserFbData(function(fb_data){
              var options = new FileUploadOptions();
              options.fileKey="file";
              options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
              options.mimeType="image/jpeg";                
              options.params= {
                    facebook_id: fb_data.id,
                    facebook_image_path: 'https://graph.facebook.com/'+fb_data.id+'/picture?type=large'                    
              };              
              options.chunkedMode = false;   
              var ft = new FileTransfer();
              ft.upload(imageURI, encodeURI("http://www.toyinrestaurant.com/himrest/index.php/json/sendUsPhoto"), App.app.getController('MoreController').win, App.app.getController('MoreController').fail, options);
              //ft.upload(imageURI, encodeURI("http://localhost:8888/upload/upload.php"), App.app.getController('MoreController').win, App.app.getController('MoreController').fail, options);
        });          
      },
      win: function(r) {
        
            App.app.toggleLoader(false,'Uploading Photo');
            Ext.getCmp('popupPanel').destroy();   
            App.app.sayAlert('Photo uploaded successfully.');

      },
      fail: function(error) {        
        App.app.toggleLoader(false);
        App.app.sayAlert('Error in uploading photo.');
        Ext.getCmp('popupPanel').destroy();   
      },
    takePicture: function(){                            
        navigator.camera.getPicture(this.uploadPhotoApi, function(message) {
                      alert('get picture failed');
              },{
                  quality: 50,
                  destinationType: navigator.camera.DestinationType.FILE_URI,
                  sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
              }
        );
    },
    showGuestWall: function(){
        if(Ext.getCmp('popupPanel'))
            Ext.getCmp('popupPanel').destroy();      

        var store= Ext.getStore('GuestGalleryStore');
        var str= [];
        store.each(function(record){
            str.push('<img src="'+record.data.image_path+'"/>') ;                   
        });
        this.gallery.html= str.join('');      
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
    commentList: {
                xtype: 'list',
                flex:1,
                id: 'commentList',
                itemTpl: '{comment}',              
                onItemDisclosure: true,
                store: 'GuestCommentStore'
            },
    location:{
        xtype: 'map',
        hidden:true,
        flex:1,
        id: 'mapLocation'   
    },
    gallery: 
    {
        cls: 'panelGallery',
        id: 'gallery2',
        hidden:true,
        scrollable: 'vertical',
        flex:1,        
        html: [
        '<img src="images/IMG-20140327-WA0037.jpg"/>',
        '<img src="images/IMG-20140327-WA0037.jpg"/>',
        '<img src="images/IMG-20140327-WA0037.jpg"/>',
        '<img src="images/IMG-20140327-WA0037.jpg"/>'
        ].join(''),
    },
    signUpForNews: function(){      
        if(Ext.getCmp('popupPanel'))
            Ext.getCmp('popupPanel').destroy();         
        var panel= Ext.Viewport.add({
            xtype: 'formpanel',
            height: '85%',
            width: '85%',
            id: 'popupPanel',
            hideOnMaskTap: true,
            layout: 'vbox',
            items: [            
            {
                xtype: 'fieldset',                             
                items:[
                {
                    xtype: 'textfield',
                    placeHolder: 'Name',
                    name: 'name'
                },
                {
                    xtype: 'textfield',
                    placeHolder: 'Email Address',
                    name: 'newsletter_email'
                },
                {
                    xtype: 'togglefield',
                    label: 'News',
                    labelWidth: '60%',
                    name: 'news'
                                
                },
                {
                    xtype: 'togglefield',
                    label: 'Special Offer',
                    labelWidth: '60%',
                    name: 'special_offer'                                       
                }
                ]
            },
            {
                xtype: 'button',
                ui: 'confirm',
                text: 'Join',
                margin : 10,
                handler: this.sendSignupRequest
            },

             {
                xtype: 'button',
                ui: 'confirm',
                text: 'Cancel',                
                margin : 10,
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
    sendSignupRequest: function(){
        var values= Ext.getCmp('popupPanel').getValues();
        if(values.name== "")
        {
            App.app.sayAlert('Please Enter Name.');
            return false;
        }
        if(values.newsletter_email == "")
        {
            App.app.sayAlert('Please Enter Email.');   
            return false;
        }
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result= re.test(values.newsletter_email);
        if(!result){
            App.app.sayAlert('Invalid Email.');   
            return false;
        }
        allData = {                 
            message: 'Please Wait',
            url: globals.base_url+'subscribeNewsletter',
            type: 'POST',
            data: values,
            callback: function (data) {     
                Ext.getCmp('popupPanel').destroy();
                App.app.sayAlert('Success');
        }};
        
        App.app.sendAjaxRequest.call(allData);   
    },
    showComments: function(record){
        //alert(Ext.encode(record));        
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
    moreviewItemTap: function( obj, list, index, record){        
        if(record.data.id==1)
        {
            this.showSharePanel();
        }
        else if(record.data.id==2)
        {
            this.showSocialMedia();
        }       
        else if(record.data.id==3)
        {
            this.showGallery();
        }
        else if(record.data.id==4)
        {
            this.sharePhoto();
        }
        else if(record.data.id==5)
        {
            this.showGuestWall();
        }       
        else if(record.data.id==7)
        {
            this.showAboutEvent();
        }
        else if(record.data.id==6)
        {
            this.signUpForNews();
        }
    },
	slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    launch: function(){
    	
    }
});