var expect = require('chai').expect;

var SymbolTable = require('../src/symbolTable.js');

describe('SymbolTable',function(){
	it('should be able to hold a key value',function(){
	 	var table = new SymbolTable();
	 	table.addSymbol('x',3);

	 	expect(table.hasSymbol('x')).to.be.true;
	});

	it('should be able to tell if a symbol exists in scope',function(){
	 	var table = new SymbolTable();
	 	table.addSymbol('x',3);
	 	var child  = table.createChild();
	 	child.addSymbol('y',3);

	 	expect(table.hasSymbol('x')).to.be.true;
	});

	it('should be able to delete a symbol ',function(){
	 	var table = new SymbolTable();
	 	table.addSymbol('x',3);
	 	var child  = table.createChild();
	 	child.addSymbol('y',3);
	 	
	 	expect(table.deleteSymbol('x')).to.be.true;
	 	expect(table.hasSymbol('x')).to.be.false;	
	});

	it('should be able to get value of a symbol ',function(){
	 	var table = new SymbolTable();
	 	table.addSymbol('x',3);
	 	var child  = table.createChild();
	 	child.addSymbol('y',3);
	 	
	 	expect(table.getSymbol('x')).to.be.eql(3);
	 	expect(child.getSymbol('x')).to.be.eql(3);
	 	expect(child.getSymbol('y')).to.be.eql(3);
	});

	it('should be able to create a new child symbol table which parent should be exsiting table',function(){
	 	var table = new SymbolTable();
	 	table.addSymbol('x',3);
	 	var child = table.createChild();

	 	expect(child.hasSymbol('x')).to.be.true;
	});

	it('parent shlould not be able to access child\'s symbols ' ,function(){
	 	var table = new SymbolTable();
	 	table.addSymbol('x',3);
	 	var child = table.createChild();
	 	child.addSymbol('y',3);

	 	expect(table.hasSymbol('y')).to.be.false;
	});

	it('hasSymbol for key with value undefined gives false' ,function(){
	 	var table = new SymbolTable();
	 	table.addSymbol('x',undefined);
	 	
	 	expect(table.hasSymbol('x')).to.be.false;
	});

});