var Converter = function() {
    this.jsCode = '';
}

Converter.prototype.convert = function(ast) {
    for (var i = 0; i < ast.length; i++) {
        var node = ast[i];
        if (node.type == 'ASSIGN') {
            this.jsCode += addVariable(node);
        } else if (node.type == 'OPERATOR') {
            this.jsCode += addLog(node);
        }
    }
    return this.jsCode;
}


var addVariable = function(node) {
    return 'var ' + node.children[0] + ' = ' + node.children[1] + ';';
}

var addLog = function(node) {
    return 'console.log(' + node.children[0] + node.data + node.children[1] + ');'
}

module.exports = Converter;
