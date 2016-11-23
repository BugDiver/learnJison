var expect = require('chai').expect;

var AssignNode = require('../../src/nodes/assignmentNode.js');
var NumberNode = require('../../src/nodes/numberNode.js');
var IdNode = require('../../src/nodes/idNode.js');

describe('AssignmentNode',function(){
	describe('toString',function(){
		it('should have js equivalent of a variable assignment',function(){
		 	var x = new AssignNode(new IdNode('x') ,new NumberNode(2));
		 	expect(x.toString()).to.be.eql('var x = 2;')
		});

		it('should have js equivalent of variable assignment to another variable',function(){
		 	var x = new AssignNode(new IdNode('x') ,new IdNode('y'));
		 	expect(x.toString()).to.be.eql('var x = y;')
		});
	});
});
