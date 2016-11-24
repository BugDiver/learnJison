var expect = require('chai').expect;


var NumberNode = require('../src/nodes/numberNode.js');
var OperatorNode = require('../src/nodes/operatorNode.js');
var AssingmentNode = require('../src/nodes/assignmentNode.js');
var IDNode = require('../src/nodes/idNode.js');
var IfNode = require('../src/nodes/ifNode.js');
var BooleanNode = require('../src/nodes/booleanNode.js');

var SymeticsAnalyzer = require('../src/analyzer.js');
var CompilationError = require('../src/error.js');

describe('SymeticsAnalyzer',function(){

	var analyzer;
	var error;
	var location = {first_line: 1,first_column : 1};
	var x = new IDNode('x',location);
	var y = new IDNode('y',location);
	var z = new IDNode('z',location);
	var one = new NumberNode(1);
	var two = new NumberNode(2);
	var three = new NumberNode(3);
	var assignX1 = new AssingmentNode(x,one);
	var assignY2 = new AssingmentNode(y,two);
	var assignZ3 = new AssingmentNode(z,three);
	var assignYX = new AssingmentNode(y,x);
	var assignYZ = new AssingmentNode(y,z);
	var _true = new BooleanNode('true');

	var analyze = function(ast){
		try{
			analyzer.analyze(ast)
		}catch(e){
			if (e.constructor.name == 'CompilationError') {
				error = e;
			}else{
				throw e;
			}
		}
	}

	afterEach(function(){
		analyzer = undefined;
		error = undefined;
	})

	describe('analyze',function(){
		it('should analyze simple assignments',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var ast = [assignX1];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});	

		it('should analyze multiple assignments',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var ast = [assignX1,assignY2];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should analyze multiple assignments with expressions',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,y]);
	 		var ast = [assignX1,assignY2,plus];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should throw error if a used variable is not assigned',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,z]);
	 		var ast = [assignX1,assignY2,plus];

	 		analyze(ast);

	 		expect(error.constructor).to.be.eql(CompilationError);
	 		expect(error.message).to.be.eql('z is not defined!');
	 		expect(error.stack).to.be.eql(`CompilationError: z is not defined!\n\t\tat :1:1`)

		});

		it('should analyze variabale assignment to another variable',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,y]);
	 		var ast = [assignX1,assignYX,plus];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should throw error if a undefined variabale assign to another variable',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,y]);
	 		var ast = [assignX1,assignYZ,plus];

	 		analyze(ast);

	 		expect(error.constructor).to.be.equal(CompilationError);
		});

		it('should analyze multiple assignments with multiple expressions',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,y]);
	 		var minus = new OperatorNode('-',[x,two]);
	 		var ast = [assignX1,assignY2,plus,minus];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should analyze conditional statements',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var cond = new IfNode(_true,[assignX1]);
	 		var ast = [cond];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should analyze scoping for conditional statements',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var cond = new IfNode(_true,[assignY2]);
	 		var plus = new OperatorNode('+',[x,y])
	 		var ast = [assignX1,cond,plus];

	 		analyze(ast);

	 		expect(error.constructor).to.be.equal(CompilationError);
		});

	});
	
});