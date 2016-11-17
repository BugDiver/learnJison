var Node = require('./node').Node;
var nodeTypes = require('./node').nodeTypes;
var start = '(';
var end = ')';

var ParseTree = function(parentNode){
	this.parentNode = parentNode;
	this.leftChild = null;
	this.rightChild = null;
}

ParseTree.prototype = {
	addLeftChild : function(child){
		this.leftChild = child;
	},

	addRightChild : function(child){
		this.rightChild = child;
	},

	toString : function(){
		return start + this.leftChild + this.parentNode + this.rightChild + end; 
	}
};

module.exports = ParseTree;