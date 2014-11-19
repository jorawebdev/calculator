define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        handlebars          = require('handlebars-v1.3.0'),
        tpl                 = require('text!tpl/shell.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({

        initialize: function() {
            var that = this;
            //console.log('in shell');
            that.render();
            //that.navView = new Nav();
        },

        render: function() {
            this.$el.html(template());
            //console.log($('#navBox'));
            //$menuItems = $('.navbar .nav li', this.el);
            //this.delegateEvents();
            return this;
        }
    });

});