var expect = require('chai').expect;
var compiler = require('../src/compiler.js');

describe('Compiler',function(){
	it('should compile simple assignment and return js code',function(){
	 	var jsCode = compiler.compile('= x 2;');

	 	expect('var x = 2;').to.be.equal(jsCode);
	});

	it('should compile multiple assignments and return js code',function(){
		var foolangCode = `= x 2;
						   = y 3;`

		var expectedJsCode = "var x = 2;"+
							  "var y = 3;"

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should compile expressions having variables and return js code',function(){
		var foolangCode = `= x 2;
						   + x 2;`
						   
		var expectedJsCode = "var x = 2;"+
							  "console.log(x+2);"

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should compile expressions having multiple variables and return js code',function(){
		var foolangCode = `= x 2;
						   = y 3;
						   + x y;`
						   
		var expectedJsCode = "var x = 2;"+
							 "var y = 3;"+
							 "console.log(x+y);"

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

});