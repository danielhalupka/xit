var TrigonometricCalculatorController = CalculatorController.extend({
    
    sinusX:function(){
        this.result = Math.sin(Number(this.number1));
    },
    
    sinusY:function(){
         this.result = Math.sin(Number(this.number2));
    },
    
    cosinusX:function(){
         this.result = Math.cos(Number(this.number1));
    },
    
    cosinusY:function(){
         this.result = Math.cos(Number(this.number2));
    },
    
    tangensX:function(){
         this.result = Math.tan(Number(this.number1));
    },
    
    tangensY:function(){
        this.result = Math.tan(Number(this.number2));
    },
    
    cotangensX:function(){
         this.result = Math.atan(Number(this.number1));
    },
    
    cotangensY:function(){
        this.result = Math.atan(Number(this.number2));
    }
    
});

angular.module('main.TrigonometricCalculatorController', [])
        .controller('TrigonometricCalculatorController', TrigonometricCalculatorController);