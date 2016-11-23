var expect = require('chai').expect;

var NumberNode = require('../../src/nodes/numberNode.js')
var OperatorNode = require('../../src/nodes/operatorNode.js');

describe('OperatorNode',function(){
	it('should have js equivlaent code of expression',function(){
	 	var opTree = new OperatorNode('+',[new NumberNode(2), new NumberNode(3)]);
	 	var jsCode = '2+3';

	 	expect(jsCode).to.be.eql(opTree.toString());
	});

	it('should have js equivlaent code of slightly complex expression',function(){
	 	var n1 = new NumberNode(1);
	 	var n2 = new NumberNode(2);
	 	var n3 = new NumberNode(3);

	 	var opTree = new OperatorNode('+',[n1,
	 			new OperatorNode('*',[n2,
	 				new OperatorNode('-',[n1,n3])])])

	 	var jsCode = '1+2*1-3';

	 	expect(jsCode).to.be.eql(opTree.toString());
	});
});
