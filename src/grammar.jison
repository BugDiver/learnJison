/* description: Parses and executes mathematical expressions. */

%{  
    var path = require('path')
    var ParseTree = require(path.resolve('./src/parseTree.js'));
    var Node = require(path.resolve('./src/node.js')).Node;
    var nodeTypes = require(path.resolve('./src/node.js')).nodeTypes;

    var buildTree = function(lc,pr,rc){
        var tree = new ParseTree(new Node(pr,nodeTypes.OPERATOR));
        tree.addLeftChild(lc);
        tree.addRightChild(rc);
        return tree;
    } 
%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"+"                   return '+'
"-"                   return '-'
"-"                   return '-'
"*"                   return '*'
"/"                   return '/'
"^"                   return '^'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    ;

e
    : e '+' e
        {$$ = buildTree($1,$2,$3);} 
    
    | e '-' e
        {$$ = buildTree($1,$2,$3);}

    | e '*' e
        {$$ = buildTree($1,$2,$3);}

    | e '/' e
        {$$ = buildTree($1,$2,$3);}

    | e '^' e
        {$$ = buildTree($1,$2,$3);}

    | NUMBER
        {$$ = Number(yytext);}
    ;