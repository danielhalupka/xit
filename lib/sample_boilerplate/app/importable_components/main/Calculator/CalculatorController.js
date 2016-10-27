var CalculatorController = Class.extend({
    number1:0,
    number2:0,
    result:0,
    
    scitaj:function(){
      this.result = Number(this.number1) + Number(this.number2);
    },
    
    odcitaj:function(){
         this.result = Number(this.number1) - Number(this.number2);
    },
    
    vynasob:function(){
         this.result = Number(this.number1) * Number(this.number2);
    },
    vydel:function(){
         this.result = Number(this.number1) / Number(this.number2);
    },
    
    
    getProto:function(){
        return this.__proto__;
    }
    
});

angular.module('main.CalculatorController', [])
        .controller('CalculatorController', CalculatorController);