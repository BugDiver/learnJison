var OperatorNode = require('./operatorNode.js');

var WhileNode = function(predicate,block){
	this.predicate = predicate;
	this.block = block;
}

WhileNode.prototype.toString = function() {
	var block = this.block.map(function(stmnt){
		if (stmnt instanceof OperatorNode) 
			return `console.log(${stmnt.toString()});`	
		return stmnt.toString();
	}).join('');
	return `while(${this.predicate.toString()}){${block}}`;
};

module.exports = WhileNode;