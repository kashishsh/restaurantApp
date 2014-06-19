Ext.define("App.model.RegisterModel", {
    extend: "Ext.data.Model",
    config: {        
        fields: [            
            {name: 'FirstName'},
			{name: 'LastName'},
			{name: 'Address'},
			{name: 'Email'},
			{name: 'MobileNumber'},
			{name: 'EmergencyNumber'},
            {name: 'Gender'},
            {name: 'Area'},
                 
        ],     
		validations: [
            {type: 'presence',field: 'FirstName',message: 'Please enter FirstName'},
            {type: 'presence',field: 'LastName',message: 'Please enter LastName'},
            {type: 'presence',field: 'Address',message: 'Please enter Address'},
            {type: 'presence',field: 'Email',message: 'Please enter Email'},
			{type: 'email',field: 'Email',message: 'Invalid email address'},
			{type: 'presence',field: 'MobileNumber',message: 'Please enter MobileNumber'},
			{type: 'format',field: 'MobileNumber',message: 'Invalid phone number',
			matcher: /[0-9]{6,15}/,},			
			{type: 'presence',field: 'EmergencyNumber',message: 'Please enter Emergency number'},
			{type: 'format',field: 'EmergencyNumber',message: 'Invalid emergency number',
			matcher: /[0-9]{6,15}/,},
            {type: 'presence',field: 'Gender',message: 'Please select Gender'},
            {type: 'presence',field: 'Area',message: 'Please select Area'},

        ]		
    }
});