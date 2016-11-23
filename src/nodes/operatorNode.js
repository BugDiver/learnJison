var OperatorNode = function(operator,args){
	this.operator = operator;
	this.args = args;
};

OperatorNode.prototype.toString = function() {
	return this.args.map(function(arg){
		return arg.toString();
	}).join(this.operator);
};

module.exports = OperatorNode;