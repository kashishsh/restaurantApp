Ext.define("App.controller.CarouselController", {

    extend: "Ext.app.Controller",
    config: {
        refs: {            
			homeview: 'homeview',
			dashboardview: 'dashboardview',
			mainview: 'mainview',
		},
        control: {
			homeview: {
				initialize: 'getCarouselImage',
				onDashboardButtonTap: 'onDashboardButtonTap',
			}

        }
    },
    onDashboardButtonTap: function(id){    	
    	var id= id.split('_')[1];    	
    	this.getDashboardview().setActiveItem(parseInt(id));
    	this.getMainview().animateActiveItem(1,this.slideLeftTransition);    	
    },
    getCarouselImage: function(obj,eopts){
    	allData = {		
    				message: 'Getting carousel images',	        
			        url:globals.base_url+'getCrousel',
			        type: 'POST',
			        callback: function (data) {			        				        	
			            var result=Ext.decode(data.responseText).data,carousel= obj.down('#main_carousel'), item;
			           	for(var i in result){
			           		//alert(1);
			           		 item= {
								style: 'height: 100%;',
								cls: 'parent_container',
								html : [
										'<img src="'+result[i].image_path+'" class="carousel_image"/>',
										'<div class="carousel_image_cont"><img src="images/homeImages/logo.png"></div>',
										
										'<div class="gray_container">',							
										'<div class="gray_container_text">At vero eos et accusamus et iusto odio dignissimos ducimus qui..</div></div>'].join('')
								};
								carousel.add(item);
			           		};
			           		console.log(item);
			        }};
			        App.app.sendAjaxRequest.call(allData);                 	
	},
	slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    launch: function(){

    	
    }
});