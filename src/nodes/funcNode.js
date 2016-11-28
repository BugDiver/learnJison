var OperatorNode = require('./operatorNode.js');

var FuncNode = function(args,block){
	this.args = args;
	this.block = block;
}

FuncNode.prototype.toString = function() {

	var block = this.block.map(function(stmnt){
		if (stmnt instanceof OperatorNode) 
			return `console.log(${stmnt.toString()});`	
		return stmnt.toString();
	}).join('');
	console.log('===============',block);
	return `function(${this.args.toString()}){${block}}`
};

module.exports = FuncNode;