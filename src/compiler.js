var parser = require('./parser.js');
var Node = require('./node.js').Node;
var SymenticsAnalyzer = require('./analyzer.js')
var Converter = require('./converter.js');


exports.compile = function(input){
	var ast = parser.parse(input);
	var analyzer = new SymenticsAnalyzer();
	analyzer.analyze(ast);
	var converter = new Converter();
	return converter.convert(ast);
}