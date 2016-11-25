var expect = require('chai').expect;

var AssignNode = require('../../src/nodes/assignmentNode.js');
var OperatorNode = require('../../src/nodes/operatorNode.js');
var NumberNode = require('../../src/nodes/numberNode.js');
var IdNode = require('../../src/nodes/idNode.js');
var ElseNode = require('../../src/nodes/esleNode.js');

describe('ElseNode',function(){
	describe('toString',function(){
		it('should have js equivalent of a condition statement',function(){
		 	var cond = new ElseNode([new AssignNode(new IdNode('x'),new NumberNode(2))]);

		 	expect(cond.toString()).to.be.eql('else{var x = 2;}')
		});

		it('should have js equivalent of a condition statement with a expression',function(){
			var x = new IdNode('x');
			var two = new NumberNode(2);

			var block = [new AssignNode(x,two),
						new OperatorNode('+',[x,two])];

		 	var cond = new ElseNode(block);
		 	expect(cond.toString()).to.be.eql('else{var x = 2;console.log(x+2);}')
		});
	});
});
