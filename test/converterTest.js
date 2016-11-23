var expect = require('chai').expect;

var NumberNode = require('../src/nodes/numberNode.js');
var OperatorNode = require('../src/nodes/operatorNode.js');
var AssingmentNode = require('../src/nodes/assignmentNode.js');
var IDNode = require('../src/nodes/idNode.js');
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

		it('should convert a tree consisting a multiple assignment to another variable in js code',function(){
			var converter = new Converter();
		 	var ast = [assignX1,assignYX];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = x;';

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});


		it('should convert a tree consisting a multiple assignment and an expression in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y])
		 	var ast = [assignX1,assignY2,plus];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'console.log(x+y);';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a multiple assignment and a complex expression in js code',function(){
			var converter = new Converter();
			var plus = new OperatorNode('+',[x,y]);
	 		var nestedplus = new OperatorNode('+',[x,new OperatorNode('+',[y,new OperatorNode('+',[z,y])])])

	 		var ast = [assignX1,assignY2,assignZ3,plus,nestedplus];

		 	var expectedJsCode = 'var x = 1;'+
		 						 'var y = 2;'+
		 						 'var z = 3;'+
		 						 'console.log(x+y);'+
		 						 'console.log(x+y+z+y);';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});



	});
});