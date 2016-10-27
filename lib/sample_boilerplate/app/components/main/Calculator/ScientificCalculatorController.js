var ScientificCalculatorController = TrigonometricCalculatorController.extend({
    
   xNaY:function(){
       this.result = Math.pow(Number(this.number1),Number(this.number2));
   },
   
   sqrtX:function(){
       this.result = Math.sqrt(Number(this.number1));
   },
   
   scitaj:function(){
        this.result = "bla";
   },
   
   sqrtY:function(){
       this.result = Math.sqrt(Number(this.number2));
   }
   
   
    
});

angular.module('main.ScientificCalculatorController', [])
        .controller('ScientificCalculatorController', ScientificCalculatorController);