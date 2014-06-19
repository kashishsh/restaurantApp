Ext.define("App.model.LoginModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [            			
			{name: 'Email'},
			{name: 'Password'}			
        ],     
		validations: [            
			{type: 'presence',field: 'Email',message: 'Please enter Email'},
			{type: 'email',field: 'Email',message: 'Invalid email address'},
			{type: 'presence',field: 'Password',message: 'Please enter Password'},
        ]		
    }
});