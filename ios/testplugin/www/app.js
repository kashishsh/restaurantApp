    Ext.application({
    name: "App",

    models: ['MenuModel', 'EventModel', 'CartModel', 'GalleryModel','EventCommentModel', 'GuestGalleryModel','GuestCommentModel'],
    stores: ['MenuStore',  'EventStore', 'CartStore', 'GalleryStore','EventCommentStore','GuestGalleryStore', 'GuestCommentStore'],
    controllers: ['MainController','CarouselController','MapController','EventsController','MenuController','MoreController'],
    views: ['MainView', 'HomeView', 'RotatingCarousel', 'DashboardView', 'MapView', 'EventView', 'EventDetails', 'AboutEvent', 'MenuView', 'MenuDetails',
        'CartView', 'MoreView', 'MoreList', 'LoyaltyView', 'EventCommentList','AttendView','GalleryView','PopupView'
    ],
    launch: function () {

        var MainView = {
            xtype: 'mainview'
        };
        Ext.Viewport.add(MainView);
    },
    loyalityPoints:0,
    toggleLoader: function (status, msg) {
        if (status) {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                style: 'z-index:10;',
                message: (msg) ? msg : 'Please wait...',
                
            });
        } else {
            Ext.Viewport.unmask();
        }
    },
    sayAlert: function (msg, callback) {
        Ext.Msg.alert('RestaurantApp', msg, function () {
            if (callback)
                callback();
        });
    },
    sendAjaxRequest: function () {
        var options = this;
        App.app.toggleLoader(true,this.message);
        var params = {
            url: this.url,
            method: this.method,
            params: this.data,
            success: function (data) {
                App.app.toggleLoader(false);
                if (data.responseText) {
                    var response = Ext.decode(data.responseText);
                    if (!response.Successfull) {
                    }
                    options.callback(data);
                }
            },
            failure: function (response) {
                App.app.toggleLoader(false);
            },
            timeout: 150000,
        };
        Ext.Ajax.request(params);
    },
    globalData: {

    }
});