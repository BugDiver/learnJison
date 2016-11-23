var OperatorNode = require('./nodes/operatorNode.js');
var NumberNode = require('./nodes/numberNode.js');
var IDNode = require('./nodes/idNode.js');
var AssingNode = require('./nodes/assignmentNode.js');
var ReferenceError = require('./error.js');


var SymenticsAnalyzer = function(){
	this.symbolTable = {};
}

SymenticsAnalyzer.prototype = {
	analyze : function(ast){
		for (var i = 0; i < ast.length; i++) {
			var node = ast[i];
			if (node instanceof AssingNode) {
				this.declareVar(node.key,node.value);
			}
			if (node instanceof OperatorNode) {
				this.checkVariables(node.args);
			}
		}
	},
	checkVariables : function(children){
		for (var i = 0;i < children.length; i++) {
			var child = children[i];
			if (child.constructor ==  OperatorNode) {
				this.checkVariables(child.args);
			}
			else if (!this.symbolTable[child.value] && child.constructor != NumberNode) {
				throw new ReferenceError(child.value+" is not defined!",child.getLocation());
			}
		}
	},
	declareVar : function(key,value){
		if (value instanceof IDNode){
			this.symbolTable[key] = this.symbolTable[value.value];
		}
		else{
			this.symbolTable[key] = value;
		}
	}
};

module.exports = SymenticsAnalyzer;