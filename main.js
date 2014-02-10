( function() {
	// create first a model
	// create a view for a model
	// create collection
	// create view for entire collection

  window.App = {
    Models: {},
    Collections: {},
    Views: {},
  };

  window.template = function(id) {
  	return _.template( $('#' +id).html() );
  };

  App.Models.Task = Backbone.Model.extend({});

  // declare the model for the collection
  App.Collections.Tasks = Backbone.Collection.extend({
  	model: App.Models.Task 
  });

  App.Views.Tasks = Backbone.View.extend( {
  	tagName: 'ul',

  	render: function() {
  		// loop through and call addOne on each
  		this.collection.each( this.addOne, this);

  		return this;
  	},

  	addOne: function(task) {
  		// You need to pass a model to a view
  		var taskView = new App.Views.Task({ model: task});
  		// will append the li to the root tag
  		this.$el.append(taskView.render().el);
  	}
  })

  App.Views.Task = Backbone.View.extend({
  	tagName: 'li',

  	render: function() {
  		this.$el.html( this.model.get('title') );
  		return this;
  	}
  });

  var tasksCollection = new App.Collections.Tasks([
	  {
	  	title: 'Go to the store',
	  	priority: 4
	  },
	  {
	  	title: 'Go to the mall',
	  	priority: 3
	  },
	  {
	  	title: 'Go to work',
	  	priority: 5
	  },
  ]);
  var tasksView = new App.Views.Tasks({ collection: tasksCollection });
  tasksView.render();

  console.log(tasksView.el);
})();