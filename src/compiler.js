var _ = require('lodash');

var parser = require('./parser.js');
var Node = require('./node.js').Node;
var SymenticsAnalyzer = require('./analyzer.js')

var convertTojs = function(ast){
	var jsCode = '';
	ast.forEach(function(node){
		if (node.type == 'ASSIGN') {
			jsCode += 'var '+node.children[0]+' = '+node.children[1]+';';
		}
		if (node.type == 'OPERATOR') {
			jsCode += 'console.log('+node.children[0]+node.data+node.children[1]+');'
		}
	})
	return jsCode;
}

exports.compile = function(input){
	var ast = parser.parse(input);
	var analyzer = new SymenticsAnalyzer();
	analyzer.analyze(ast);
	return convertTojs(ast);
}