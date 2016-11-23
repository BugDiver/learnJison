var expect = require('chai').expect;

var createNode = require('../src/node.js').createNode;
var Converter = require('../src/converter.js');


describe('Converter',function(){
	describe('converte',function(){

		it('should convert a tree consisting a simple assignment in js code',function(){
			var converter = new Converter();
		 	var ast = [createNode('=','ASSIGN',['x',2])];

		 	var expectedJsCode = 'var x = 2;'

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a multiple assignment in js code',function(){
			var converter = new Converter();
		 	var ast = [createNode('=','ASSIGN',['x',2]),
		 				createNode('=','ASSIGN',['y',2])];

		 	var expectedJsCode = 'var x = 2;'+
		 						 'var y = 2;';

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a multiple assignment to another variable in js code',function(){
			var converter = new Converter();
		 	var ast = [createNode('=','ASSIGN',['x',2]),
		 				createNode('=','ASSIGN',['y',createNode('x','ID')])];

		 	var expectedJsCode = 'var x = 2;'+
		 						 'var y = x;';

		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});


		it('should convert a tree consisting a multiple assignment and an expression in js code',function(){
			var converter = new Converter();
		 	var ast = [createNode('=','ASSIGN',['x',2]),
		 				createNode('=','ASSIGN',['y',2]),
		 				createNode('+','OPERATOR',['x','y'])];

		 	var expectedJsCode = 'var x = 2;'+
		 						 'var y = 2;'+
		 						 'console.log(x+y);';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});

		it('should convert a tree consisting a multiple assignment and a complex expression in js code',function(){
			var converter = new Converter();
		 	var ast = [	createNode('=','ASSIGN',['x',2]),
		 				createNode('=','ASSIGN',['y',3]),
		 				createNode('=','ASSIGN',['z',3]),
		 				createNode('+','OPERATOR',['x','y']),
		 				createNode('+','OPERATOR',['x',
		 					createNode('+','OPERATOR',['y',
		 						createNode('+','OPERATOR',['z','y']
		 						)]
		 					)]
		 				)];

		 	var expectedJsCode = 'var x = 2;'+
		 						 'var y = 3;'+
		 						 'var z = 3;'+
		 						 'console.log(x+y);'+
		 						 'console.log(x+y+z+y);';
		 	expect(expectedJsCode).to.be.equal(converter.convert(ast));
		});



	});
});