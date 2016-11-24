var BooleanNode = function(value){
	this.value = (value === "true");
}

BooleanNode.prototype.toString = function() {
	return this.value;
};

module.exports = BooleanNode;