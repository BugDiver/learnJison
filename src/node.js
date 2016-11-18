var path = require('path');
var convert = require('./toWord');

var nodeTypes	= {OPERATOR : "OPERATOR" , NUMBER : "NUMBER"};
var operators = {'+':' plus ','*':' times '};

var methods = {
	'+' : function(r,l){return r + l},
	'*' : function(r,l){return r * l}
}

var Node = function Node(data,type){
    this.data = data;
    this.type = type;
};

Node.prototype = {
	toString : function(){
		if (this.type == nodeTypes.OPERATOR) {
			return operators[this.data];
		}else if (this.type == nodeTypes.NUMBER){
			return convert(this.data);
		}
	},

	evaluate : function(left , right){
		var left = left instanceof Node && left.data || left;
		var right = right instanceof Node && right.data || right;
		return methods[this.data](left,right);
	}
}

exports.nodeTypes = nodeTypes;
exports.Node = Node;
