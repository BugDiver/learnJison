var Node = function Node(data, type, children) {
    this.data = data;
    this.type = type;
    this.children = children;
};


var createNode = function (data, type, children) {
    return new Node(data,type,children);
};

exports.createNode = createNode;
exports.Node = Node;
