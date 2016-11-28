var expect = require('chai').expect;

var NumberNode = require('../src/nodes/numberNode.js');
var OperatorNode = require('../src/nodes/operatorNode.js');
var AssingmentNode = require('../src/nodes/assignmentNode.js');
var IDNode = require('../src/nodes/idNode.js');
var BooleanNode = require('../src/nodes/booleanNode.js');
var IfNode = require('../src/nodes/ifNode.js');
var ElseNode = require('../src/nodes/elseNode.js');
var WhileNode = require('../src/nodes/whileNode.js');
var FuncNode = require('../src/nodes/funcNode.js');
var Converter = require('../src/converter.js');


describe('Converter',function(){

	var location = {first_line: 1,first_column : 1};
	var x = new IDNode('x',location);
	var y = new IDNode('y',location);
	var z = new IDNode('z',location);
	var one = new NumberNode(1);
	var two = new NumberNode(2);
	var three = new NumberNode(3);
	var assignX1 = new AssingmentNode(x,one);
	var assignY2 = new AssingmentNode(y,two);
	var assignZ3 = new AssingmentNode(z,three);
	var assignYX = new AssingmentNode(y,x);
	var assignYZ = new AssingmentNode(y,z);
	var _true = new BooleanNode('true');
	var xLessThan2 = new OperatorNode('<',[x,two]);


	describe('converte',function(){

		it('should convert a tree consisting a simple assignment in js code',function(){
			var converter = new Converter();
		 	var ast = [assignX1];

		 	var expectedJsCode = 'var x = 1;'

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a multiple assignment in js code',function(){
			var converter = new Converter();
		 	var ast = [assignX1,assignY2];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;';

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a assignment to expression in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,3]);
			var expressionAssign = new AssingmentNode(y,plus);

		 	var ast = [assignX1,expressionAssign];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = x+3;';

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a assignment to expression only with identifiers in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
			var expressionAssign = new AssingmentNode(z,plus);

		 	var ast = [assignX1,assignY2,expressionAssign];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'var z = x+y;';

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a multiple assignment to another variable in js code',function(){
			var converter = new Converter();
		 	var ast = [assignX1,assignYX];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = x;';

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});


		it('should convert a tree consisting a multiple assignment and an expression in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
		 	var ast = [assignX1,assignY2,plus];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'console.log(x+y);';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a pow(^) expression in js code',function(){
			var converter = new Converter();
			var fact = new OperatorNode('^',[x,y]);
		 	var ast = [assignX1,assignY2,fact];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'console.log(Math.pow(x,y));';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a factorial expression in js code',function(){
			var converter = new Converter();
			var fact = new OperatorNode('!',[x]);
		 	var ast = [assignX1,assignY2,fact];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'console.log((function fact(n){return n==1?1:n*fact(n-1)})(x));';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a multiple assignment and a complex expression in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
	 		var nestedplus = new OperatorNode('+',[x,new OperatorNode('+',[y,new OperatorNode('+',[z,y])])]);

	 		var ast = [assignX1,assignY2,assignZ3,plus,nestedplus];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'var z = 3;'+
		 						 'console.log(x+y);'+
		 						 'console.log(x+y+z+y);';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a conditional in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
			var cond = new IfNode(_true,[plus]);

	 		var ast = [assignX1,assignY2,cond];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'if(true){console.log(x+y);}';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a conditional with comlex expression in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
	 		var nestedplus = new OperatorNode('+',[x,new OperatorNode('+',[y,new OperatorNode('+',[z,y])])]);
			var cond = new IfNode(_true,[plus,assignZ3,nestedplus]);
			
	 		var ast = [assignX1,assignY2,cond];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'if(true){'+
		 						 'console.log(x+y);'+
		 						 'var z = 3;'+
		 						 'console.log(x+y+z+y);'+
		 						 '}';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a if and else  in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
	 		var nestedplus = new OperatorNode('+',[x,new OperatorNode('+',[y,new OperatorNode('+',[z,y])])]);
			var _if = new IfNode(_true,[plus,assignZ3,nestedplus]);
			var _else = new ElseNode([assignYX,plus]);

	 		var ast = [assignX1,assignY2,[_if,_else]];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'if(true){'+
		 						 	'console.log(x+y);'+
			 						'var z = 3;'+
			 						'console.log(x+y+z+y);'+
		 						 '}else{'+
			 						'var y = x;'+
			 						'console.log(x+y);'+
		 						 '}';

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a while loop in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
			var _while = new WhileNode(xLessThan2,[plus])
	 		var ast = [assignX1,assignY2,_while];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'while(x<2){console.log(x+y);}';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a function declaration js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
			var func = new AssingmentNode('myFunction',new FuncNode([x,y],[plus]));
	 		var ast = [assignX1,assignY2,func];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'var myFunction = function(x,y){console.log(x+y);};';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a function declaration with loop and condition js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);

			var _while = new WhileNode(xLessThan2,[plus])
			var func = new AssingmentNode('myFunction',new FuncNode([x,y],[plus,_while]));
	 		var ast = [assignX1,assignY2,func];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'var myFunction = function(x,y){'+
		 						 	'console.log(x+y);'+
		 						 	'while(x<2){'+
		 						 		'console.log(x+y);'+
		 						 	'}'+
		 						 '};';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});
	});
});