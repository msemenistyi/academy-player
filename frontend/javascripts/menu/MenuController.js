define(['marionette', './MenuView'], function(Marionette){
	var MenuRegion = Marionette.Region.extend({
		template: '#menu-view-template',
		el: '#menu',
	});
	menuRegion = new MenuRegion();
	menuNavView = new MenuNavView();
	menuRegion.show(menuNavView);
});

