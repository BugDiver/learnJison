var CompilationError = function CompilationError(message,loc){
    var error = new Error(message);
    error.constructor = CompilationError;
    error.stack = formatStack(message,loc);
    return error;
};


formatStack = function(msg,loc){
	return `CompilationError: ${msg}
		at :${loc.line}:${loc.char}`
}



module.exports = CompilationError;