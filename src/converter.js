var OperatorNode = require('./nodes/operatorNode.js');

var Converter = function() {
    this.jsCode = '';
}

Converter.prototype = {
    convert : function(ast) {
        for (var i = 0; i < ast.length; i++) {
            var node = ast[i];
            if (node instanceof Array) {
                this.convert(node);
            }else if (node instanceof OperatorNode) {
                this.jsCode += addLog(node.toString());
            }else{
                this.jsCode += node.toString();
            }
        }
        return this.jsCode;
    }
}

var addLog = function(s){
    return `console.log(${s});`
}

module.exports = Converter;
