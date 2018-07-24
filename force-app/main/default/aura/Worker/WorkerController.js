({
	/**
	 * @description Initialisation handler
	 * @param {Aura.Component} component - Worker component
	 * @param {Event} event - Firing event
	 * @param {Object} helper - Helper object
	 * @return {void}
	 */
	init : function(component, event, helper) {
		/** The host uri of the vf provider, needs this to prevent measures against XSS blocking 
		 *  communication between the lightning component and vf iframe, hardcoded for now as I
		 *  didn't have time to dynamically create it
		 */
		var vfOrigin = 'https://force-enterprise-5999-dev-ed--c.cs92.visual.force.com';
		window.addEventListener('message', function(event) {
			if(event.origin != vfOrigin) {
				return;
			}
			var message = event.data;
			component.set('v.'+message.attribute, message.value);
		}, false);
	},

	startWorker: function(component, event, helper) {
		var message = JSON.stringify({
			method: 'startWorker'
		});
		var vfWindow = component.find('worker').getElement().contentWindow;
		vfWindow.postMessage(message, 'https://force-enterprise-5999-dev-ed--c.cs92.visual.force.com');
	},

	endWorker: function(component, event, helper) {
		var message = JSON.stringify({
			method: 'endWorker'
		});
		var vfWindow = component.find('worker').getElement().contentWindow;
		vfWindow.postMessage(message, 'https://force-enterprise-5999-dev-ed--c.cs92.visual.force.com');
	}
});
