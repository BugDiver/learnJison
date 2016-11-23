var Parser = require('jison').Parser;
var grammar = require('fs').readFileSync('./src/grammar.jison','utf8');
var parser = new Parser(grammar);

exports.parse = function(input){
	return parser.parse(input);
}