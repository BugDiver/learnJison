var CompilationError = function(msg){
	this.error = new Error(msg);
	this.constructor.name = 'CompilationError';
}

module.exports = CompilationError;