var chai = require('chai');
var assert = require('assert');
var expect = chai.expect;

var ParseTree = require("../src/parseTree.js");
var Node = require("../src/node.js").Node;
var nodeTypes = require("../src/node.js").nodeTypes;

describe('ParseTree', function() {
    describe('toString', function() {
        it('shoud give the expression as string.', function() {
            var plus = new Node('+', nodeTypes.OPERATOR);

            var tree = new ParseTree(plus);

            tree.addLeftChild(new Node(1, nodeTypes.NUMBER));
            tree.addRightChild(new Node(2, nodeTypes.NUMBER));

            expect(tree.toString()).to.be.equal('(one plus two)');
        });

        it('shoud give the expression as string for big numbers.', function() {
            var times = new Node('*', nodeTypes.OPERATOR);

            var tree = new ParseTree(times);

            tree.addLeftChild(new Node(1000000000, nodeTypes.NUMBER));
            tree.addRightChild(new Node(2, nodeTypes.NUMBER));

            expect(tree.toString()).to.be.equal('(one billion times two)');
        });
    });
    describe('resolve', function() {
        it('shoud resolve the tree.', function() {
            var plus = new Node('+', nodeTypes.OPERATOR);

            var tree = new ParseTree(plus);

            tree.addLeftChild(new Node(1, nodeTypes.NUMBER));
            tree.addRightChild(new Node(2, nodeTypes.NUMBER));

            expect(3).to.be.equal(tree.resolve());
        });

        it('shoud resolve the tree consisting multiple operators.', function() {
            var plus = new Node('+', nodeTypes.OPERATOR);
            var times = new Node('*', nodeTypes.OPERATOR);

            var parentTree = new ParseTree(plus);
            var childTree = new ParseTree(times)

            childTree.addLeftChild(new Node(3, nodeTypes.NUMBER));
            childTree.addRightChild(new Node(2, nodeTypes.NUMBER));

            parentTree.addLeftChild(childTree);
            parentTree.addRightChild(new Node(3, nodeTypes.NUMBER));

            expect(9).to.be.equal(parentTree.resolve());
        });

        it('shoud resolve the tree consisting with comlex expression.', function() {
            var pow = new Node('^', nodeTypes.OPERATOR);
            var division = new Node('/', nodeTypes.OPERATOR);

            var parentTree = new ParseTree(pow);
            var childTree = new ParseTree(division)

            childTree.addLeftChild(new Node(8, nodeTypes.NUMBER));
            childTree.addRightChild(new Node(2, nodeTypes.NUMBER));

            parentTree.addLeftChild(childTree);
            parentTree.addRightChild(new Node(3, nodeTypes.NUMBER));
            
            expect(64).to.be.equal(parentTree.resolve());
        });
    });
});
