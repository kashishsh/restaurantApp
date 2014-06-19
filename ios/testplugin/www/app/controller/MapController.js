Ext.define("App.controller.MapController", {

    extend: "Ext.app.Controller",
    config: {
        refs:{
        	mapview: 'mapview',
        	mainview: 'mainview'
        },
        control:{
        	mapview: {
        		maprender: 'maprender',
        		dashboardButtonTap: 'dashboardButtonTap'
        	},
        	'button[cls=btnMapBottom]':{
        		tap: 'mapButtonTap'
        	},
        	'button[cls=btnBackMap]':{
        		tap: 'backFromMap'
        	}
        }
    }, 
    backFromMap: function(){
    			this.getMainview().animateActiveItem(0,this.slideRightTransition);	

    },  
    mapButtonTap: function(obj){
    	var text= obj.getText();
    	
    	if(text.match("Call"))
		{
			 window.location.href="tel://"+this.restaurantData.phone;
		}
		else if(text.match('Website'))
		{
			window.open("http://"+this.restaurantData.website,"_blank");						
		}
		else
		{
			window.location.href="mailto:"+this.restaurantData.email;
		}
    },
   
    maprender: function( obj, map, eOpts ){

    	allData = {			        
			        message: 'Getting Restaurant location',
			        url:'http://www.toyinrestaurant.com/himrest/index.php/json/getRestaurantDetail',
			        type: 'POST',
			        callback: function (data) {					        	
			            var result=Ext.decode(data.responseText).data;			           				            
			            App.app.getController('MapController').restaurantData= result;
			            document.getElementById('restarantName').innerHTML= result.name;
			            var location= new google.maps.LatLng(result.latitude,result.lognitude);
			            map.setCenter(location);			            
			            var marker = new google.maps.Marker({
	                        map: map,
	                        animation: google.maps.Animation.DROP,
	                        position: location,
	                        icon: 'images/pin.png'
	                    });
	                     var infobox = new InfoBox({
						         content: document.getElementById("infobox"),
						         disableAutoPan: false,
						         maxWidth:200,
						         pixelOffset: new google.maps.Size(-120, -110),
						         zIndex: null,
						         boxStyle: {
						            
						            opacity: 0.75,
						            width: "200px"
						        },
						        InfoboxOptions: {
						        	showCloseButton: false
						        },
						        closeBoxMargin: "20px 0px 2px 2px",
						        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
						        
						        
						    });
												var contentString= [
							'<div class="custom_info">',
							'<img src="images/location/callout.png"/>',
							'<div>Restaurant name</div>',
							'</div>'
						].join('');

							  var infowindow = new google.maps.InfoWindow({
						      content: contentString,	
						      style: 'border:solid 1px red;'
						  });
						  google.maps.event.addListener(marker, 'click', function() {
						    infobox.open(map, this);
						    //infowindow.open(map,marker);
						  });
						
			        }};
			        App.app.sendAjaxRequest.call(allData);                 	
    },
	slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    launch: function(){
    	//alert(123	);
    	
    }
});