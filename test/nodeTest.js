var chai = require('chai');
var expect = chai.expect;

var Node = require("../src/node.js").Node;
var nodeTypes = require("../src/node.js").nodeTypes;

describe('Node',function(){
	describe('toString',function(){
		it('should give the string representation of node',function(){
		 	var number = new Node(10,nodeTypes.NUMBER);
		 	expect(number.toString()).to.be.equal('ten');
		});

		it('should give the string representation of node consisting big numbers',function(){
		 	var number = new Node(10101,nodeTypes.NUMBER);
		 	expect(number.toString()).to.be.equal('ten thousand one hundred one');
		});

		it('should give the string representation of node consisting numbers in range of billion',function(){
		 	var number = new Node(10101010101,nodeTypes.NUMBER);
		 	expect(number.toString()).to.be.equal('ten billion one hundred one million ten thousand one hundred one');
		});

		it('should give the string representation of node consisting operators',function(){
		 	var operator1 = new Node('+',nodeTypes.OPERATOR);
		 	var operator2 = new Node('*',nodeTypes.OPERATOR);
		 	expect(operator1.toString()).to.be.equal(' plus ');
		 	expect(operator2.toString()).to.be.equal(' times ');
		});

	});
});