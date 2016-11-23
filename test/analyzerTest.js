var expect = require('chai').expect;

var createNode = require('../src/node.js').createNode;
var SymeticsAnalyzer = require('../src/analyzer.js');
var CompilationError = require('../src/error.js');

describe('SymeticsAnalyzer',function(){
	var analyzer;
	var error;
	

	var analyze = function(ast){
		try{
			analyzer.analyze(ast)
		}catch(e){
			error = e;
		}
	}

	afterEach(function(){
		analyzer = undefined;
		error = undefined;
	})

	describe('analyze',function(){
		it('should analyze simple assignments',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		var ast = [createNode("=",'ASSIGN',['x',2])];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});	

		it('should analyze multiple assignments',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		var ast = [createNode("=",'ASSIGN',['x',2]),
	 				createNode("=",'ASSIGN',['y',3])];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should analyze multiple assignments with expressions',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		var ast = [createNode("=",'ASSIGN',['x',2]),
	 				createNode("=",'ASSIGN',['y',3]),
	 				createNode("+",'OPERATOR',['x','y'])];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should throw error if a used variable is not assigned',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		ast = [createNode("=",'ASSIGN',['x',2]),
	 				createNode("=",'ASSIGN',['y',3]),
	 				createNode("+",'OPERATOR',['x','z'])];

	 		analyze(ast);

	 		expect(error.constructor).to.be.eql(CompilationError);
	 		expect(error.error.message).to.be.eql('z is not defined!')

		});

		it('should analyze variabale assignment to another variable',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		ast = [createNode("=",'ASSIGN',['x',2]),
	 				createNode("=",'ASSIGN',['y','x']),
	 				createNode('+','ASSIGN',['x','y'])];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should throw error if a undefined variabale assign to another variable',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		ast = [createNode("=",'ASSIGN',['x',2]),
	 				createNode("=",'ASSIGN',['y',createNode('z','ID')]),
	 				createNode('+','OPERATOR',['x','y'])];

	 		analyze(ast);

	 		expect(error.constructor).to.be.eql(CompilationError);
		});

		it('should analyze multiple assignments with multiple expressions',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		var ast = [createNode('=','ASSIGN',['x',2]),
	 				createNode('=','ASSIGN',['y',3]),
	 				createNode('+','OPERATOR',['x','y']),
	 				createNode('-','OPERATOR',['x',2])];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

		it('should analyze multiple assignments with slightly complex expressions',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		var ast = [createNode('=','ASSIGN',['x',2]),
	 				createNode('=','ASSIGN',['y',3]),
	 				createNode('=','ASSIGN',['z',3]),
	 				createNode('+','OPERATOR',['x','y']),
	 				createNode('+','OPERATOR',['x',
	 					createNode('+','OPERATOR',['y',
	 						createNode('+','OPERATOR',['z','y']
	 						)]
	 					)]
	 				)];

	 		analyze(ast);

	 		expect(error).to.be.undefined;
		});

	});
	
});