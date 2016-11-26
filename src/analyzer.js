var OperatorNode = require('./nodes/operatorNode.js');
var NumberNode = require('./nodes/numberNode.js');
var IDNode = require('./nodes/idNode.js');
var AssingNode = require('./nodes/assignmentNode.js');
var IfNode = require('./nodes/ifNode.js');
var ElseNode = require('./nodes/elseNode.js');
var SymbolTable = require('./symbolTable.js');
var CompilationError = require('./error.js');


var SymenticsAnalyzer = function(){
	this.table = new SymbolTable();
}

SymenticsAnalyzer.prototype = {
	analyze : function(ast){
		for (var i = 0; i < ast.length; i++) {
			var node = ast[i];
			if (node instanceof AssingNode) {
				this.declareVar(node.key,node.value);
			}else if(node instanceof Array){
				this.analyze(node)
			}else if (this.isBlock(node)) {
				this.analyzeScope(node);
			}
			else if (node instanceof OperatorNode) {
				this.checkVariables(node.args);
			}
		}
	},

	checkVariables : function(children){
		for (var i = 0;i < children.length; i++) {
			var child = children[i];
			if (child instanceof  OperatorNode) {
				this.checkVariables(child.args);
			}
			else if (this.isUndefiened(child)) {
				throw new CompilationError(child.value+" is not defined!",child.getLocation());
			}
		}
	},

	declareVar : function(key,value){
		if (value instanceof IDNode){
			this.table.addSymbol(key,this.table.getSymbol(value));
		}
		else{
			this.table.addSymbol(key,value);
		}
	},

	analyzeScope : function(node){
		this.table = this.table.createChild();
		if (node.predicate && node.predicate instanceof OperatorNode) {
			this.checkVariables(node.predicate.args);
		}
		this.analyze(node.block);
		this.table = this.table.getParent();
	},

	isUndefiened : function(node){
		return !this.table.hasSymbol(node) && !(node instanceof NumberNode);
	},

	isBlock : function(node){
		return (node instanceof IfNode) || (node instanceof ElseNode);
	}

};

module.exports = SymenticsAnalyzer;