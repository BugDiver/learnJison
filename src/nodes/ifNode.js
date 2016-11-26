var OperatorNode = require('./operatorNode.js');

var IfNode = function(predicate,block){
	this.predicate = predicate;
	this.block = block;
}

IfNode.prototype.toString = function() {
	var block = this.block.map(function(stmnt){
		if (stmnt instanceof OperatorNode) 
			return `console.log(${stmnt.toString()});`	
		return stmnt.toString();
	}).join('');
	return `if(${this.predicate.toString()}){${block}}`
};

module.exports = IfNode;