var convert = require('./toWord');

var nodeTypes	= {OPERATOR : "OPERATOR" , NUMBER : "NUMBER"};
var operators = {'+':' plus ','*':' times '};

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
}

exports.nodeTypes = nodeTypes;
exports.Node = Node;
