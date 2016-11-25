%{
    location = undefined;
    var path = require('path');
    var NumberNode = require(path.resolve('./src/nodes/numberNode.js'));
    var OperatorNode = require(path.resolve('./src/nodes/operatorNode.js'));
    var AssingmentNode = require(path.resolve('./src/nodes/assignmentNode.js'));
    var IDNode = require(path.resolve('./src/nodes/idNode.js'));
    var BooleanNode = require(path.resolve('./src/nodes/booleanNode.js'));
    var IfNode = require(path.resolve('./src/nodes/ifNode.js'));
    var ElseNode = require(path.resolve('./src/nodes/elseNode.js'));
%}

%lex
%%
\s+                                             /* Skip */
\d+                                             return 'NUMBER';
"if"                                            return 'if'
"else"                                          return 'else'
"true"|"fasle"                                  return 'BOOLEAN'
[a-z][a-zA-Z0-9\_]*                             location = yylloc;return 'ID';
' '                                             return 'SPACE'
"{"                                             return '{';
"}"                                             return '}';
";"                                             return ';';
"="                                             return '=';
">="|"<="|"<"|">"|"=="                          return 'COMPARATOR'
"+"|"-"|"*"|"/"|"^"|"!"                         return 'OPERATOR'
<<EOF>>                                         return 'EOF';
/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'

%start program%%

program
    : statements EOF { 
                    // console.log(JSON.stringify($$));
                    return $$;
       }
    ;

statements
    : statement {$$ = [$1];}
    | statements statement {$$ = $1, $$.push($2)}
    ;

statement
    : assignment ';'
    | expressions ';'
    | condition ';'
    ;



condition
    : 'if' predicate block {$$ = new IfNode($2,$3) }
    | 'if' predicate block 'else' block {$$ = [new IfNode($2,$3),new ElseNode($5)] }
    ;

predicate
    : boolean
    | identifier  COMPARATOR identifier { $$ = new OperatorNode($2,[$1,$3])}
    | identifier COMPARATOR  number { $$ = new OperatorNode($2,[$1,$3])}
    | number COMPARATOR  identifier { $$ = new OperatorNode($2,[$1,$3])}
    | number COMPARATOR  number { $$ = new OperatorNode($2,[$1,$3])}
    ;


assignment
    : identifier '=' number  {$$ = new AssingmentNode($1,$3);}
    | identifier '=' identifier {$$ = new AssingmentNode($1,$3);}
    ; 

expressions
    : expression
    | number OPERATOR expressions { $$ = new OperatorNode($2,[$1,$3])}
    | identifier OPERATOR expressions { $$ = new OperatorNode($2,[$1,$3])}
    ;

expression
    : identifier  OPERATOR identifier { $$ = new OperatorNode($2,[$1,$3])}
    | identifier OPERATOR  number { $$ = new OperatorNode($2,[$1,$3])}
    | number OPERATOR  identifier { $$ = new OperatorNode($2,[$1,$3])}
    | number OPERATOR  number { $$ = new OperatorNode($2,[$1,$3])}
    ;

block
    : '{' statements '}' {$$ = $2}
    ;

boolean
    : BOOLEAN {$$ = new BooleanNode(yytext)}
    ;

number
    : NUMBER {$$= new NumberNode(Number(yytext));}
    ;

identifier
    : ID {$$ = new IDNode(yytext,location)}
    ;