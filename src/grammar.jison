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
    : ID '=' TERMINALS  {$$ = createNode($2,'ASSIGN',[$1,$3]);}
    | ID '=' ID {$$ = createNode($2,'ASSIGN',[$1,createNode($3,'ID')]);}
    ; 

expressions
    : expression
    | TERMINALS OPERATOR expressions { $$ = createNode($2,'OPERATOR',[$1,$3])}
    | ID OPERATOR expressions { $$ = createNode($2,'OPERATOR',[$1,$3])}
    ;

expression
    : ID  OPERATOR ID { $$ = createNode($2,'OPERATOR',[$1,$3])}
    | ID OPERATOR  TERMINALS { $$ = createNode($2,'OPERATOR',[$1,$3])}
    | TERMINALS OPERATOR  ID { $$ = createNode($2,'OPERATOR',[$1,$3])}
    | TERMINALS OPERATOR  TERMINALS { $$ = createNode($2,'OPERATOR',[$1,$3])}
    ;


TERMINALS
    : NUMBER {$$= Number(yytext);}
    ;
