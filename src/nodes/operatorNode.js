
var symbolToConverter = {
	'+' : function(args){return args.join('+')},
	'-' : function(args){return args.join('-')},
	'*' : function(args){return args.join('*')},
	'*' : function(args){return args.join('*')},
	'/' : function(args){return args.join('/')},
	'<' : function(args){return args.join('<')},
	'>' : function(args){return args.join('>')},
	'<=' : function(args){return args.join('<=')},
	'>=' : function(args){return args.join('>=')},
	'^' : function(args){return `Math.pow(${args.join(',')})`},
	'!' : function(args){return `(function fact(n){return n==1?1:n*fact(n-1)})(${args[0]})`}
}

var OperatorNode = function(operator,args){
	this.operator = operator;
	this.args = args;
};

OperatorNode.prototype.toString = function() {
	var converter = symbolToConverter[this.operator];
	return converter(this.args);
};


module.exports = OperatorNode;