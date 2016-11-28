var expect = require('chai').expect;
var compiler = require('../src/compiler.js');
var CompilerError = require('../src/error.js');

describe('Compiler',function(){

	it('should compile simple assignment and return js code',function(){
	 	var jsCode = compiler.compile('x = 2;');

	 	expect('var x = 2;').to.be.equal(jsCode);
	});

	it('should compile multiple assignments and return js code',function(){
		var foolangCode = `x = 2;
						   y = 3;`

		var expectedJsCode = "var x = 2;"+
							  "var y = 3;";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should compile multiple assignments to exression and return js code',function(){
		var foolangCode = `x = 2;
						   y = x + 2;`

		var expectedJsCode = "var x = 2;"+
							  "var y = x+2;";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should compile multiple assignments to exression only with ids and return js code',function(){
		var foolangCode = `x = 2;
						   y = x + x;`

		var expectedJsCode = "var x = 2;"+
							  "var y = x+x;";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should throw error for undefiend variable used assignment expression',function(){
		var foolangCode = `x = 2;
						   y = x + y;`

	 	var compile = function(){
			compiler.compile(foolangCode);
		}

	 	expect(compile).to.throws(Error,'y is not defined!');
	});

	it('should compile expressions having variables and return js code',function(){
		var foolangCode = `x = 2;
						   x + 2;`
						   
		var expectedJsCode = "var x = 2;"+
							  "console.log(x+2);";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should compile expressions having multiple variables and return js code',function(){
		var foolangCode = `x = 2;
						   y = 3;
						   x + y;`
						   
		var expectedJsCode = "var x = 2;"+
							 "var y = 3;"+
							 "console.log(x+y);";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});


	it('should compile expressions having pow and return js code',function(){
		var foolangCode = `x = 2;
						   y = 3;
						   x ^ y;`
						   
		var expectedJsCode = "var x = 2;"+
							 "var y = 3;"+
							 "console.log(Math.pow(x,y));";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});


	it('should compile expressions having factorials and return js code',function(){
		var foolangCode = `x = 2;
						   x!;`
						   
		var expectedJsCode = "var x = 2;"+
							 "console.log((function fact(n){return n==1?1:n*fact(n-1)})(x));";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});


	it('should compile expressions having multiple variables and multiple operator and return js code',function(){
		var foolangCode = `x = 2;
						   y = 3;
						   x + y + 2;`
						   
		var expectedJsCode = "var x = 2;"+
							 "var y = 3;"+
							 "console.log(x+y+2);";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should compile expressions having multiple variables and multiple expressions and return js code',function(){
		var foolangCode = `x = 2;
						   y = 3;
						   z = 3;
						   x + y + 2;
						   x + y + z + y;`
						   
		var expectedJsCode = "var x = 2;"+
							 "var y = 3;"+
							 "var z = 3;"+
							 "console.log(x+y+2);"+
							 "console.log(x+y+z+y);";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});
	
	it('should compile expressions having conditionals return js code',function(){
		var foolangCode = `x = 2;
						   if true {
						   		y = 3;
						   		x + y;
						   };`
						   
		var expectedJsCode = "var x = 2;"+
							 "if(true){"+
							 "var y = 3;"+
							 "console.log(x+y);"+
							 "}";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should throw error for uscoped variable use js code',function(){
		var foolangCode = `x = 2;
						   if true {
						   		y = 3;
						   };
						   z = 3;
						   x + y + 2;`
						   
		var compile = function(){
			compiler.compile(foolangCode);
		}

	 	expect(compile).to.throws(Error,'y is not defined!');
	});

	it('should compile expressions having loop statement return js code',function(){
		var foolangCode = `x = 2;
						   while x > 2{
						   		y = 3;
						   		x + y;
						   };`
						   
		var expectedJsCode = "var x = 2;"+
							 "while(x>2){"+
							 "var y = 3;"+
							 "console.log(x+y);"+
							 "}";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should throw error for undefiend variable used in predicate',function(){
		var foolangCode = `x = 2;
						   while y > 2 {
						   		y = 3;
						   };`
						   
		var compile = function(){
			compiler.compile(foolangCode);
		}

	 	expect(compile).to.throws(Error,'y is not defined!');
	});

	it('should compile code having fucntion and return js code',function(){
		var foolangCode = `x = 2;
						   myFunction = (y)-> {
						   		y = x + 2;
						   };`
						   
		var expectedJsCode = "var x = 2;"+
							 "var myFunction = function(y){"+
							 	"var y = x+2;"+
							 "};";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should compile code having fucntion and conditionals and return js code',function(){
		var foolangCode = `x = 2;
						   myFunction = (y)-> {
						   		if y > 2 {
						   			y = y - x;
						   		};
						   };`
						   
		var expectedJsCode = "var x = 2;"+
							 "var myFunction = function(y){"+
							 	"if(y>2){"+
							 		"var y = y-x;"+
							 	"}"+
							 "};";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should throw error for undefiend variable used in function body',function(){
		var foolangCode = `x = 2;
						   myFunc = (y)->{
						   		y = x + z;
						   };`
						   
		var compile = function(){
			compiler.compile(foolangCode);
		}
	 	expect(compile).to.throws(Error,'z is not defined!');
	});

	it('should compile code having fucntion and function call and  return js code',function(){
		var foolangCode = `x = 2;
						   myFunction = (y)-> {
						   		if y > 2 {
						   			y = y - x;
						   		};
						   };
						   myFunction(3);`
						   
		var expectedJsCode = "var x = 2;"+
							 "var myFunction = function(y){"+
							 	"if(y>2){"+
							 		"var y = y-x;"+
							 	"}"+
							 "};"+
							 "myFunction(3);";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should compile code having fucntion and function call with identifiers and  return js code',function(){
		var foolangCode = `x = 2;
						   myFunction = (y)-> {
						   		if y > 2 {
						   			y = y - x;
						   		};
						   };
						   myFunction(x);`
						   
		var expectedJsCode = "var x = 2;"+
							 "var myFunction = function(y){"+
							 	"if(y>2){"+
							 		"var y = y-x;"+
							 	"}"+
							 "};"+
							 "myFunction(x);";

	 	var actualJsCode = compiler.compile(foolangCode);

	 	expect(expectedJsCode).to.be.equal(actualJsCode);
	});

	it('should throw error for undefiend variable passed as parameter in function call',function(){
		var foolangCode = `x = 2;
						   myFunc = (y)->{
						   		y = x + 2;
						   };
						   myFunc(z);`
						   
		var compile = function(){
			compiler.compile(foolangCode);
		}
	 	expect(compile).to.throws(Error,'z is not defined!');
	});
});