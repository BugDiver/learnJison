var NumberNode = function(value){
	this.value = value;
}

NumberNode.prototype.toString = function() {
	return this.value;
};
module.exports = NumberNode;