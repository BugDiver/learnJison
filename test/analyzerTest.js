var expect = require('chai').expect;

var createNode = require('../src/node.js').createNode;
var SymeticsAnalyzer = require('../src/analyzer.js');

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

	describe('analyze',function(){
		it('should analyze simple assignments',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		var ast = [createNode("=",'ASSIGN',['x',2])];

	 		analyze(ast);

	 		expect(error).to.be.undefiend;
		});	

		it('should analyze multiple assignments',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		var ast = [createNode("=",'ASSIGN',['x',2]),
	 				createNode("=",'ASSIGN',['y',3])];

	 		analyze(ast);

	 		expect(error).to.be.undefiend;
		});

		it('should analyze multiple assignments with expressions',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		var ast = [createNode("=",'ASSIGN',['x',2]),
	 				createNode("=",'ASSIGN',['y',3]),
	 				createNode("+",'OPERATOR',['x','y'])];

	 		analyze(ast);

	 		expect(error).to.be.undefiend;
		});

		it('should throw error if a used variable is not assigned',function(){
	 		analyzer = new SymeticsAnalyzer();

	 		ast = [createNode("=",'ASSIGN',['x',2]),
	 				createNode("=",'ASSIGN',['y',3]),
	 				createNode("+",'OPERATOR',['x','z'])];

	 		analyze(ast);

	 		expect(error).to.be.eql(new Error('z is not defined!'));
		});

	});
	
});