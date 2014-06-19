Ext.define("App.model.EventCommentModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [
			'comment_id','event_id','comment','facebook_image_path'
        ],
    }
});