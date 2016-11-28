var expect = require('chai').expect;

var NumberNode = require('../../src/nodes/numberNode.js')
var OpNode = require('../../src/nodes/operatorNode.js')
var AssignNode = require('../../src/nodes/assignmentNode.js');
var IdNode = require('../../src/nodes/idNode.js');
var CallNode = require('../../src/nodes/callNode.js');

describe('CallNode',function(){
	describe('toString',function(){
		it('should have js equivalent of a function call',function(){
		 	var functionCall = new CallNode(new IdNode('myFunc'),[new NumberNode(1),new NumberNode(2)]);
		 	var expected = `myFunc(1,2)`
		 	expect(functionCall.toString()).to.be.eql(expected);
		});

		it('should have js equivalent of a function call with id params',function(){
		 	var functionCall = new CallNode(new IdNode('myFunc'),[new NumberNode(1),new IdNode('x')]);
		 	var expected = `myFunc(1,x)`
		 	expect(functionCall.toString()).to.be.eql(expected);
		});

	});
});