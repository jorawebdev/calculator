define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone');

    return Backbone.View.extend({
        initialize: function(){

        },
        
        events:{
            'click .btn': 'action'
        },

        action:function(e){
            var that = this;
            var btnId = e.target.id;
            if(btnId.match('btn_')){ //if number button
                var n = btnId.split('_')[1];
                that.setNumber(n);
            } else {
                var op = btnId.split('btn')[1];
                if(btnId==='btnAC'){
                    that.clearAll();
                } else if(btnId==='btnPoint'){
                    that.setPeriod();
                } else if(btnId==='btnSign'){
                    that.changeSign();
                } else if(btnId==='btnEnter'){
                    if(that.model.get('last_operation')){
                        that.calculate();
                    }
                } else {
                    if(op==='Power') op = '^';
                    if(op==='Plus') op = '+';
                    if(op==='Minus') op = '-';
                    if(op==='Multiply') op = '*';
                    if(op==='Divide') op = '/'; 
                    //if(op==='Enter') op = ''; 
                    that.model.set({'last_operation':op});
                    that.basicOperation(op);
                }
            }
        },

        setNumber: function(n){
            var that = this;
            //console.log(that.model.get('new_number'));
            
            if (that.model.get('new_number')){
                that.setResult(0);
                that.model.set({'new_number':false});
            }
            var current_result = that.model.get('result');
            if (current_result == "0") {
                if (n != 0) { current_result = n; }
            } else if (current_result == "-0") {
                if (n != 0) { current_result = "-" + n; }
            } else {
                current_result += n;
            }
            that.setResult(current_result);
        },

        setPeriod: function(){
            var that = this;
            if (that.model.get('new_number')) {
                that.setResult(0);
                that.model.set({'new_number':false});
            }
            var current_result = that.model.get('result');
            current_result = current_result.toString();
            if (current_result.indexOf(".") != -1) { return; }
            current_result += ".";
            that.setResult(current_result);
        },

        changeSign: function() {
            var that = this;
            var current_result = that.model.get('result');
            current_result = current_result.toString();
            if (current_result.charAt(0) == "-") {
                current_result = current_result.substr(1, current_result.length - 1);
            } else {
                current_result = "-" + current_result;
            }
            that.setResult(current_result);
            
            if (that.model.get('new_number')) {
                that.model.set({'last_result': current_result});
            }
        },

        clearAll: function(){
            var that=this;
            var newSet = {last_result:0,last_operation:'',new_number:false,result:0};
            that.model.set(newSet);
            that.setResult(0);
        },

        setResult: function(str){
            var that = this;
            that.model.set({'result':str});
            $(that.$el).find("#result").html(str);
            $(that.$el).find("#operator").html(that.model.get('last_operation'));
        },

        calculate: function(){
            var that = this;
            var result = that.model.get('result');
            that.model.set({'current_result':result,'new_number':true});

            that.model.save({data:'bla'},{
                type: 'POST',
                url:that.model.get('url'),
                success: function(d){
                    console.log('success',d);
                    that.setResult(d.get('result'));
                },
                error: function(error){
                    console.log('in error');
                }
            });
        },

        basicOperation: function(op){
            var that = this;
            var url = ''; //that.model.get('url'); 
            switch(op) {
                case '^':
                    url='/power';
                    break;
                case '+':
                    url='/plus';
                    break;
                case '-':
                    url='/minus';
                    break;
                case '*':
                    url='/multiply';
                    break;
                case '/':
                    url='/divide';
                    break;
                default:
                    break;
            }
            var result = that.model.get('result');
            that.model.set({'last_result':result,'new_number':true,'url':url});
            that.setResult(result);
        }
    });

});