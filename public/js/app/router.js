define(function (require, app) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        ShellView   = require('app/views/shell'),
        //NavView     = require('app/views/nav'),
        IndexView   = require('app/views/index');
    
    var $body = $('body'),
        //shellView = new ShellView({el: $body}).render(),
        shellView = new ShellView({el: $body}),
        $content = $("#content", shellView.el),
        indexView = new IndexView({el: $content});

    app.manageViews = function(){
        //console.log(session);
        if(app.view){
            app.view.undelegateEvents();
            app.view.$el.html('');
        }
    }

    return Backbone.Router.extend({

        routes: {
            "": "index"
        },

        index: function () {
            indexView.render({el:$content});
            this.calculator();
        },

        calculator: function(){
            require(["app/views/vCalculate","app/models/mCalculate"], function (View,Model) {
                var model = new Model();
                var view = new View({el: $content, model:model});
            });
        }
    });

});