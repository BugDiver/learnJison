var expect = require('chai').expect;

var AssignNode = require('../../src/nodes/assignmentNode.js');
var OperatorNode = require('../../src/nodes/operatorNode.js');
var NumberNode = require('../../src/nodes/numberNode.js');
var IdNode = require('../../src/nodes/idNode.js');
var WhileNode = require('../../src/nodes/whileNode.js');
var BooleanNode = require('../../src/nodes/booleanNode.js');

describe('WhileNode',function(){
	describe('toString',function(){
		it('should have js equivalent of a condition statement',function(){
		 	var loop = new WhileNode(new BooleanNode('true'),[new AssignNode(new IdNode('x'),new NumberNode(2))]);

		 	expect(loop.toString()).to.be.eql('while(true){var x = 2;}')
		});

		it('should have js equivalent of a condition statement with a expression',function(){
			var x = new IdNode('x');
			var two = new NumberNode(2);

			var block = [new AssignNode(x,two),
						new OperatorNode('+',[x,two])];

		 	var loop = new WhileNode(new OperatorNode('<',[new IdNode('x'),new NumberNode(2)]),block);
		 	expect(loop.toString()).to.be.eql('while(x<2){var x = 2;console.log(x+2);}')
		});
	});
});
