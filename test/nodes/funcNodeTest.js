var expect = require('chai').expect;

var NumberNode = require('../../src/nodes/numberNode.js')
var OpNode = require('../../src/nodes/operatorNode.js')
var AssignNode = require('../../src/nodes/assignmentNode.js');
var IdNode = require('../../src/nodes/idNode.js');
var FuncNode = require('../../src/nodes/funcNode.js');

describe('FunctionNode',function(){
	describe('toString',function(){
		it('should have js equivalent of a function statement',function(){
			var x = new IdNode('x');
			var y = new IdNode('y');
			var one = new NumberNode(1);
	
			var assignX = new AssignNode(x,one);
		 	var func = new FuncNode([x,y],[assignX]);

		 	var expected = `function(x,y){var x = 1;}`;

		 	expect(func.toString()).to.be.eql(expected);
		});
	it('should have js equivalent of a function statement with some expression',function(){
			var x = new IdNode('x');
			var y = new IdNode('y');
			var one = new NumberNode(1);
			var plus = new OpNode('+',[new IdNode('x'),new IdNode('y')]);
			var assignX = new AssignNode(x,one)
		 	var func = new FuncNode([x,y],[assignX,plus]);

		 	var expected = `function(x,y){var x = 1;console.log(x+y);}`;

		 	expect(func.toString()).to.be.eql(expected);
		});
	});
});