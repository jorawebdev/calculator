define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        Backbone            = require('backbone');

        return Backbone.Model.extend({
              defaults: {
                url: 'one',
                last_result: 0,
                last_operation: "",
                new_number: false,
                result:0
              },

              urlRoot: 'test',

              initialize: function () {
                var that = this;
              },

              parse: function(result){
                return result;
              }
      });
});