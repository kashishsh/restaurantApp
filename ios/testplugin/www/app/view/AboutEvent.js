Ext.define("App.view.AboutEvent", {
    extend: "Ext.Panel",    
	alias: "widget.aboutevent",
    config: {  	
    	scrollable: 'vertical',		
		tpl: [
			'<div class="tplAboutEvent">',
			'<div>Name: </div>',
			'<div>{event_title}</div>',
			'<div>Details: </div>',
			'<div>{event_fulldes}</div>',
			'<div>Date: </div>',
			'<div>{event_date}</div>',
			'<div>Start Time: </div>',
			'<div>{event_start_time}</div>',
			'<div>End Time: </div>',
			'<div>{event_ending_time}</div>',
			'</div>',
		].join(''),
		flex:1
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

