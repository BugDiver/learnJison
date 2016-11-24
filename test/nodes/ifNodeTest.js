var expect = require('chai').expect;

var AssignNode = require('../../src/nodes/assignmentNode.js');
var OperatorNode = require('../../src/nodes/operatorNode.js');
var NumberNode = require('../../src/nodes/numberNode.js');
var IdNode = require('../../src/nodes/idNode.js');
var IfNode = require('../../src/nodes/ifNode.js');
var BooleanNode = require('../../src/nodes/booleanNode.js');

describe('IfNode',function(){
	describe('toString',function(){
		it('should have js equivalent of a condition statement',function(){
		 	var cond = new IfNode(new BooleanNode('true'),[new AssignNode(new IdNode('x'),new NumberNode(2))]);

		 	expect(cond.toString()).to.be.eql('if(true){var x = 2;}')
		});

		it('should have js equivalent of a condition statement with a expression',function(){
			var x = new IdNode('x');
			var two = new NumberNode(2);

			var block = [new AssignNode(x,two),
						new OperatorNode('+',[x,two])];

		 	var cond = new IfNode(new BooleanNode('true'),block);
		 	expect(cond.toString()).to.be.eql('if(true){var x = 2;console.log(x+2);}')
		});
	});
});
