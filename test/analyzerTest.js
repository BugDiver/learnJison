var expect = require('chai').expect;


var NumberNode = require('../src/nodes/numberNode.js');
var OperatorNode = require('../src/nodes/operatorNode.js');
var AssingmentNode = require('../src/nodes/assignmentNode.js');
var IDNode = require('../src/nodes/idNode.js');
var IfNode = require('../src/nodes/ifNode.js');
var ElseNode = require('../src/nodes/elseNode.js');
var BooleanNode = require('../src/nodes/booleanNode.js');
var FuncNode = require('../src/nodes/funcNode.js');

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
	var xLessThan2 = new OperatorNode('<',[x,two]);

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

		it('should analyze variabale assignment to an expression',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,y]);
	 		var expressionAssignment = new AssingmentNode(x,plus);

	 		var ast = [assignX1,assignYX,expressionAssignment];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should throw error if a undefined variabale is used in a assignment expression',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,y]);
	 		var expressionAssignment = new AssingmentNode(x,plus);

	 		var ast = [assignX1,expressionAssignment];

	 		analyze(ast);

	 		expect(error.constructor).to.be.equal(CompilationError);
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

		it('should analyze conditional statements with else block',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var _if = new IfNode(_true,[assignX1]);
	 		var _else = new ElseNode([assignY2]);
	 		var ast = [[_if,_else]];

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
	 		expect(error.message).to.be.eql('y is not defined!');
		});

		it('should analyze scoping for conditional statements',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var _if = new IfNode(_true,[assignY2]);
	 		var innerOp = new OperatorNode('+',[x,z])
	 		var _else = new ElseNode([assignZ3,innerOp]);
	 		var plus = new OperatorNode('+',[x,z]);

	 		var ast = [assignX1,[_if,_else],plus];

	 		analyze(ast);

	 		expect(error.constructor).to.be.equal(CompilationError);
	 		expect(error.message).to.be.eql('z is not defined!');
		});

		it('should analyze different scoping for different conditional statements',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var _if = new IfNode(_true,[assignY2]);
	 		var innerOp = new OperatorNode('+',[x,y])
	 		var _else = new ElseNode([assignZ3,innerOp]);
	 		var plus = new OperatorNode('+',[x,z]);

	 		var ast = [assignX1,[_if,_else],plus];

	 		analyze(ast);

	 		expect(error.constructor).to.be.equal(CompilationError);
	 		expect(error.message).to.be.eql('y is not defined!');
		});

		it('should analyze varibles in predicate for conditional statements',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var _if = new IfNode(xLessThan2,[assignY2]);
	 		var _else = new ElseNode([assignZ3]);
	 		
	 		var ast = [assignX1,[_if,_else]];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should throw error if  varibles in predicate are undefiend',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var _if = new IfNode(xLessThan2,[assignY2]);
	 		var _else = new ElseNode([assignZ3]);
	 		
	 		var ast = [[_if,_else]];

	 		analyze(ast);

	 		expect(error.constructor).to.be.equal(CompilationError);
		});

		it('should analyze loop statements',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var _while = new WhileNode(xLessThan2,[assignY2])

	 		var ast  = [assignX1,_while];
	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should throw error for undefiend variables used in predicate for loop statements',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var _while = new WhileNode(xLessThan2,[assignX1])

	 		var ast  = [assignY2,_while];
	 		analyze(ast);

	 		expect(error.constructor).to.be.eql(CompilationError);
		});
		it('should throw error for undefiend variables used in loop block',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,z]);
	 		var _while = new WhileNode(xLessThan2,[plus]);

	 		var ast  = [assignX1,_while];
	 		analyze(ast);

	 		expect(error.constructor).to.be.eql(CompilationError);
	 		expect(error.message).to.be.eql('z is not defined!');

		});

		it('should analyze function statements',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var myfunction = new FuncNode([x,y],[assignX1,assignY2]);

	 		var ast  = [assignX1,new AssingmentNode(new IDNode('myfunction'),myfunction)];
	 		
	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it.only('should analyze arguments used in function body',function(){
	 		analyzer = new SymeticsAnalyzer();
	 		var plus = new OperatorNode('+',[x,y]);
	 		var myfunction = new FuncNode([x,y],[plus]);

	 		var ast  = [assignX1,new AssingmentNode(new IDNode('myfunction'),myfunction)];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

	});
});