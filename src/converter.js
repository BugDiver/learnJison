var Node = require('./node.js').Node;

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
    return 'var ' + resolveIdentifier(node.children[0])
         + ' = ' + resolveIdentifier(node.children[1]) + ';';
}

var addLog = function(node) {
    return 'console.log(' + resolve(node.children[0]) + node.data + resolve(node.children[1]) + ');'
}

var resolveIdentifier = function(child){
    if (child.type == 'ID') {
        return child.data;
    }
    return child;
}

var resolve = function(child){
    if (child instanceof Node){
        return resolve(child.children[0])+child.data+resolve(child.children[1]);
    }
    return child
}

module.exports = Converter;
