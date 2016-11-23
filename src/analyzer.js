var CompilationError = require('./error.js');
var Node = require('./node.js').Node;

var SymenticsAnalyzer = function(){
	this.symbolTable = {};
}

SymenticsAnalyzer.prototype = {
	analyze : function(ast){
		for (var i = 0; i < ast.length; i++) {
			var node = ast[i];
			if (node.type == 'ASSIGN') {
				this.declareVar(node.children[0],node.children[1]);
			}
			if (node.type == 'OPERATOR') {
				this.checkVariables(node.children);
			}
		}
	},
	checkVariables : function(children){
		var _self = this;
		children.forEach(function(child){
			if (child.constructor ==  Node) {
				_self.checkVariables(child.children);
			}
			else if (!_self.symbolTable[child] && child.constructor != Number) {
				throw new CompilationError(child+" is not defined!");
			}
		})
	},
	declareVar : function(key,value){
		if (value.type == 'ID'){
			this.symbolTable[key] = this.symbolTable[value.data];
		}
		else{
			this.symbolTable[key] = value;
		}
	}
};

module.exports = SymenticsAnalyzer;