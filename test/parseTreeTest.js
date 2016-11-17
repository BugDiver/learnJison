var chai = require('chai');
var assert  = require('assert');
var expect = chai.expect;

var ParseTree = require("../src/parseTree.js");
var Node = require("../src/node.js").Node;
var nodeTypes = require("../src/node.js").nodeTypes;

describe('ParseTree',function(){
	describe('toString',function(){
		it('shoud give the expression as string.',function(){
			var plus = new Node('+',nodeTypes.OPERATOR);
			var times = new Node('*',nodeTypes.OPERATOR);

		 	var tree = new ParseTree(plus);
		 	tree.addLeftChild(new Node(1,nodeTypes.NUMBER));
		 	tree.addRightChild(new Node(2,nodeTypes.NUMBER));

		 	expect(tree.toString()).to.be.equal('(one plus two)');
		});
		it('shoud give the expression as string for big numbers.',function(){
			var plus = new Node('+',nodeTypes.OPERATOR);
			var times = new Node('*',nodeTypes.OPERATOR);

		 	var tree = new ParseTree(plus);
		 	tree.addLeftChild(new Node(1000000000,nodeTypes.NUMBER));
		 	tree.addRightChild(new Node(2,nodeTypes.NUMBER));

		 	expect(tree.toString()).to.be.equal('(one billion plus two)');
		});
	});
	
});