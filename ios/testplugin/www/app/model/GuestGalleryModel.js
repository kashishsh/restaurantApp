Ext.define("App.model.GuestGalleryModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [
            'photo_id','image_path', 'facebook_id', 'facebook_image_path'
        ],        
    }
});