var CallNode = function(name,params){
	this.name = name;
	this.params = params;
}

CallNode.prototype.toString = function() {
	return `${this.name.toString()}(${this.params.toString()})`;
};

module.exports = CallNode;