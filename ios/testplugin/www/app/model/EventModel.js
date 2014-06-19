Ext.define("App.model.EventModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [
            'event_id','event_date','event_start_time','event_ending_time','event_title','event_shortdes','event_fulldes','event_venue','event_status','images','comments'	
			
        ],        
    }
});