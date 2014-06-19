/*
    openFB.init('400678696739166'); // Defaults to sessionStorage for storing the Facebook token
    function getUserFbData(callback){
        if(localStorage.getItem('fb_data') != null)
        {   
            callback(Ext.decode(localStorage.getItem('fb_data')));
        }
        else
        {
            login(callback);
        }
    }
    function login(callback) {
        openFB.login('email',
                function() {                    
                    openFB.api({
                        path: '/me',
                        success: function(data) {
                            localStorage.setItem('fb_data',Ext.encode(data));
                            callback(data);                           
                        },
                        error: errorHandler});
                },
                function(error) {
                    alert('Facebook login failed: ' + error.error_description);
                });
    }

    function getInfo() {
        openFB.api({
            path: '/me',
            success: function(data) {
                localStorage.setItem('fb_data',data);                
            },
            error: errorHandler});
    }

    function share() {
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: 'Testing Facebook APIs'
            },
            success: function() {
                alert('the item was posted on Facebook');
            },
            error: errorHandler});
    }

    function revoke() {
        openFB.revokePermissions(
                function() {
                    alert('Permissions revoked');
                },
                errorHandler);
    }

    function errorHandler(error) {
        alert(error.message);
    }
*/




document.addEventListener('deviceready', function () {
                          try {
                          //alert('Device is ready! Make sure you set your app_id below this alert.');
                          FB.init({
                                  appId: "400678696739166",
                                  nativeInterface: CDV.FB,
                                  useCachedDialogs: false
                                  });
                          
                          //document.getElementById('data').innerHTML = "";
                          } catch (e) {
                          alert(e);
                          }
                          }, false);


function getUserFbData(callback) {
    if (localStorage.getItem('fb_data') != null) {
        callback(Ext.decode(localStorage.getItem('fb_data')));
    } else {
        login(callback);
    }
}

function login(callback) {
    FB.login(
             function (response) {
             FB.api('/me', function (response) {

                    localStorage.setItem('fb_data', Ext.encode(response));
                    callback(response);
                    });
             }, {
             scope: "email"
             }
             );
}
