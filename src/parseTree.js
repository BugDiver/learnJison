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
		if(child.constructor ==  Number){
           this.leftChild = new Node(child,nodeTypes.NUMBER);
        }else{
        	this.leftChild = child;
        }
	},

	addRightChild : function(child){
		if(child.constructor ==  Number){
           this.rightChild = new Node(child,nodeTypes.NUMBER);
        }else{
        	this.rightChild = child;
        }
	},

	resolve : function(){
		var left = (this.leftChild instanceof ParseTree) && this.leftChild.resolve() || this.leftChild;
		var right = (this.rightChild instanceof ParseTree) && this.rightChild.resolve() || this.rightChild;
		return this.parentNode.evaluate(left,right);
	},

	toString : function(){
		return start + this.leftChild + this.parentNode + this.rightChild + end; 
	}
};

module.exports = ParseTree;