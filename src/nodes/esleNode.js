var OperatorNode = require('./operatorNode.js');

var ElseNode = function(block){
	this.block = block;
}

ElseNode.prototype.toString = function(){
	var block = this.block.map(function(stmnt){
		if (stmnt instanceof OperatorNode) 
			return `console.log(${stmnt.toString()});`	
		return stmnt.toString();
	}).join('');
	return `else{${block}}`;
}

module.exports = ElseNode;