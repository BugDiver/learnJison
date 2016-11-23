var OperatorNode = require('./nodes/operatorNode.js');

var Converter = function() {
    this.jsCode = '';
}

Converter.prototype.convert = function(ast) {
    var _self = this;
    ast.forEach(function(child){
        if (child instanceof OperatorNode)
            _self.jsCode += addLog(child.toString());
        else
            _self.jsCode += child.toString();

    })
    return this.jsCode;
}

var addLog = function(s){
    return `console.log(${s});`
}

module.exports = Converter;
