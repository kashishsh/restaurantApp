Ext.define("App.view.AttendView", {
    extend: "Ext.form.Panel",    
	alias: "widget.attendview",
    config: {  	
    	flex:1,
		items:[
			{
				xtype: 'fieldset',
				title: 'Are you attending this event ?',
				items:[
					{
						xtype: 'radiofield',
						label: 'YES',
						name: 'attendEvent',
						checked: true,
						value: '1'

					},
					{
						xtype: 'radiofield',
						label: 'NO',
						name: 'attendEvent',
						value: '2'
					}
				]
			},
			{
				xtype: 'button',
				text: 'Submit',
				ui: 'action',
				cls: 'btnAttend'
			
			}
		]
	},  
	initialize: function(){
		this.callParent(arguments); 
	},	
});

