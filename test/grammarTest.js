var path = require('path');
var expect = require('chai').expect;
var Parser = require('jison').Parser;
var grammar = require('fs').readFileSync('./src/grammar.jison','utf-8');


var parser = new Parser(grammar);

describe('grammar',function(){
	describe('String Representation',function(){
		it('should parse "1+2" and give a tree which string representation is "(one plus two)"',function(){
	 	var actual = parser.parse('1+2');
	 	var expected = '(one plus two)';
	 	expect(expected).to.be.equal(actual.toString());
		});

		it('should parse "1 * 2" and give a tree which string representation is "(one times two)"',function(){
		 	var actual = parser.parse('1 * 2');
		 	var expected = '(one times two)';
		 	expect(expected).to.be.equal(actual.toString().toString());
		});

		it('should parse  "1 + 2 * 3" and give a tree which string representation is "(one plus (two times three))"',function(){
		 	var actual = parser.parse('1 + 2 * 3');
		 	var expected = '(one plus (two times three))';
		 	expect(expected).to.be.equal(actual.toString());
		});

		it('should parse complex expressions and give tree which  can be represented',function(){
		 	var actual = parser.parse('10000 + 20 * 31 + 123 * 456456');
		 	var expected = 	'((ten thousand plus (twenty times thirty one))'+
		 					' plus ' +
		 					'(one hundred twenty three times four hundred fifty six thousand four hundred fifty six))';
		 	expect(expected).to.be.equal(actual.toString())
		});

		it('should be able handle big numbers',function(){
		 	var actual = parser.parse('10000000000 + 3 * 4');
		 	var expected = '(ten billion plus (three times four))';
		 	expect(expected).to.be.equal(actual.toString());
		});
	});
	
	describe('Evaluation',function(){
		it('should parse "1 * 2" and give a tree which can be resolved to 3',function(){
		 	var tree = parser.parse('1+2');
		 	var expected = 3;
		 	expect(expected).to.be.equal(tree.resolve());
		});

		it('should parse "1 * 2 + 3" and give a tree which can be resolved to 5',function(){
		 	var tree = parser.parse('1 * 2 + 3');
		 	var expected = 5;
		 	expect(expected).to.be.equal(tree.resolve());
		});	

		it('should parse complex expressions and give a tree which can be resolved',function(){
		 	var tree = parser.parse('10000 + 20 * 31 + 123 * 456456');
		 	var expected = 	56154708;
		 	expect(expected).to.be.equal(tree.resolve())
		});
	});
	
});