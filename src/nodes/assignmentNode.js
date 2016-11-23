var AssignNode = function(key ,value){
	this.key = key;
	this.value = value;
}

AssignNode.prototype.toString = function(){
	return `var ${this.key.toString()} = ${this.value.toString()};`
}

module.exports = AssignNode;