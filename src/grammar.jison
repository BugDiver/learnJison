/* description: Parses and executes mathematical expressions. */

%{  
    var path = require('path')
    var convert = require(path.resolve('./src/toWord.js'));
    var ParseTree = require(path.resolve('./src/parseTree.js'));
    var Node = require(path.resolve('./src/node.js')).Node;
    var nodeTypes = require(path.resolve('./src/node.js')).nodeTypes;
%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"*"                   return '*'
"+"                   return '+'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1.toString();}
    ;

e
    : e '+' e
       {
            var tree = new ParseTree(new Node($2,nodeTypes.OPERATOR));
            if($1.constructor ==  Number){
                tree.addLeftChild(new Node($1,nodeTypes.NUMBER));
            }else{
                tree.addLeftChild($1);
            }
            if($3.constructor ==  Number){
                tree.addRightChild(new Node($3,nodeTypes.NUMBER));
            }else{
                tree.addRightChild($3);
            }
            $$ = tree;
       } 
    
    | e '*' e
        {
            var tree = new ParseTree(new Node($2,nodeTypes.OPERATOR));
            if($1.constructor ==  Number){
                tree.addLeftChild(new Node($1,nodeTypes.NUMBER));
            }else{
                tree.addLeftChild($1);
            }
            if($3.constructor ==  Number){
                tree.addRightChild(new Node($3,nodeTypes.NUMBER));
            }else{
                tree.addRightChild($3);
            }
            $$ = tree;
        }


    | NUMBER
        {$$ = Number(yytext);}
    ;