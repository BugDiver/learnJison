var IDNode = function(value,loc){
	this.value  = value;
	this.loc = loc;
}


IDNode.prototype = {
	toString : function() {
		return this.value;
	},
	getLocation : function(){
		return {line : this.loc.first_line, char : this.loc.first_column};
	}
};

module.exports = IDNode;