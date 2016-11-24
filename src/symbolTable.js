var SymbolTable = function(parent){
	this.table = createParent(parent);
}

SymbolTable.prototype = {
	addSymbol : function(symbol,value){
		this.table[symbol] = value;
	},
	hasSymbol : function(symbol){
		return !!this.table[symbol];
	},
	deleteSymbol : function(symbol){
		return delete this.table[symbol];
	},
	getSymbol : function(symbol){
		return this.table[symbol];
	},
	createChild : function(){
		return new SymbolTable(this.table);
	}
}

var createParent = function(parent){
	var table = {};
	if(!parent) return table;
	for(key in parent){
	  if(parent.hasOwnProperty(key)){
	    table[key] = parent[key];
	  }
	}
	return table;
}

module.exports = SymbolTable;
