var ReferenceError = function ReferenceError(message,loc){
    var error = new Error(message);
    error.constructor = ReferenceError;
    error.stack = formatStack(message,loc);
    return error;
};


formatStack = function(msg,loc){
	return `ReferenceError: ${msg}
		at :${loc.line}:${loc.char}`
}



module.exports = ReferenceError;