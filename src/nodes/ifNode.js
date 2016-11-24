var OperatorNode = require('./operatorNode.js');

var IfNode = function(condition,block){
	this.condition = condition;
	this.block = block;
}

IfNode.prototype.toString = function() {
	var block = this.block.map(function(stmnt){
		if (stmnt instanceof OperatorNode) 
			return `console.log(${stmnt.toString()});`	
		return stmnt.toString();
	}).join('');
	return `if(${this.condition}){${block}}`
};

module.exports = IfNode;