%{
    var path = require('path');
    var createNode = require(path.resolve('./src/node.js')).createNode;
%}


%lex

%%
\s+                                             /* Skip */
\d+                                             return 'NUMBER';
[a-z][a-zA-Z0-9\_]*                             return 'ID';
";"                                             return ';';
"="                                             return '=';
"+"|"-"|"*"|"/"|"^"|"!"                         return 'OPERATOR'
<<EOF>>                                         return 'EOF';
/lex


%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'

%start program

%%


program
    : statements EOF { 
                    /*console.log(JSON.stringify($$));*/
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
    ;

assignment
    : '=' ID  TERMINALS  {$$ = createNode($1,'ASSIGN',[$2,$3]);}
    ;

expressions
    : expression
    | OPERATOR TERMINALS expressions { $$ = createNode($1,'OPERATOR',[$2,$3])}
    | OPERATOR ID expressions { $$ = createNode($1,'OPERATOR',[$2,$3])}
    | OPERATOR expression expressions { $$ = createNode($1,'OPERATOR',[$2,$3])}
    ;

expression
    : OPERATOR ID  ID { $$ = createNode($1,'OPERATOR',[$2,$3])}
    | OPERATOR ID  TERMINALS { $$ = createNode($1,'OPERATOR',[$2,$3])}
    | OPERATOR TERMINALS  ID { $$ = createNode($1,'OPERATOR',[$2,$3])}
    | OPERATOR TERMINALS  TERMINALS { $$ = createNode($1,'OPERATOR',[$2,$3])}
    ;


TERMINALS
    : NUMBER {$$= Number(yytext);}
    ;
