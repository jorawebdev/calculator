define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/main.html'),

        template = Handlebars.compile(tpl);

    return Backbone.View.extend({
        initialize: function(){
        },

        render: function () {
            this.$el.html(template());
            return this;
        }

    });

});