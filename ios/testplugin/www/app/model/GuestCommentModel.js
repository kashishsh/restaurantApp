Ext.define("App.model.GuestCommentModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [
            'comment_id','event_id', 'comment', 'facebook_id','facebook_image_path'
        ],        
    }
});
