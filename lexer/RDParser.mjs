import Lexer from "./lexer.mjs";
import NumericConstant from "../expressions/NumericConstant.mjs"
import UnaryExpression from "../expressions/UnaryExpression.mjs"
import BinaryExpression from "../expressions/BinaryExpression.mjs"
import operators from "../operators.mjs";
import PrintStatement from "../statement/PrintStatement.mjs";
export default class RDParser extends Lexer {
    current_token;
    retvalue;
    CallExpr() {
        this.current_token = this.getToken()
        return this.Expr()
    }
    CallStmt() {
        /// The Grammar is
        ///
        /// <stmtlist> := { <statement> }+
        ///
        /// {<statement> := <printstmt> | <printlinestmt>
        /// <printstmt> := print <expr >;
        ///
        /// <printlinestmt>:= printline <expr>;
        ///
        /// <Expr> ::= <Term> | <Term> { + | - } <Expr>
        /// <Term> ::= <Factor> | <Factor> {*|/} <Term>
        /// <Factor>::= <number> | ( <expr> ) | {+|-} <factor>

        this.current_token = this.getToken()
        return this.Statement(this.current_token)
        
    }
    Statement(token){
       
        this.current_token = this.getToken()
        
        let expr=this.Expr()
        console.log("cureent"+this.current_token)
        switch(token){
            case this.TOKENS.TOK_PRINT:
                this.retvalue=new PrintStatement(expr)
                break;
            case this.TOKENS.TOK_PRINTLN:
                this.retvalue= new PrintStatement(expr)
                break;
            default:
                throw new Error('Invalid expression')
        }
        return this.retvalue
    }
    // <Expr> ::= <Term> | Term { + | - } <Expr>
    // <Term> ::= <Factor> | <Factor> {*|/} <Term>
    // <Factor>::= <number> | ( <expr> ) | {+|-} <factor>
    Expr() {
        let retvalue = this.Term()
        while (this.current_token == this.TOKENS.TOK_PLUS || this.current_token == this.TOKENS.TOK_MINUS) {
            var I_Token = this.current_token
            this.current_token = this.getToken()
            var e1 = this.Expr()
            retvalue = new BinaryExpression(retvalue, e1,
                I_Token == this.TOKENS.TOK_PLUS ? operators.PLUS : operators.MINUS)
        }
        return retvalue
    }
    Term() {
        let retvalue = this.Factor()
        while (this.current_token == this.TOKENS.TOK_MUL || this.current_token == this.TOKENS.TOK_DIV) {
            var I_Token = this.current_token
            this.current_token = this.getToken()
            var e1 = this.Term()
            retvalue = new BinaryExpression(retvalue, e1,
                I_Token == this.TOKENS.TOK_MUL ? operators.MULTIPLY : operators.DIVISION)
        }
        return retvalue
    }
    Factor() {
        this.retvalue = null
        if (this.current_token === this.TOKENS.TOK_DOUBLE) {
            this.retvalue = new NumericConstant(this.getNumber())
            this.current_token = this.getToken()
        } else if (this.current_token === this.TOKENS.TOK_OPAREN) {
            this.current_token = this.getToken()
            this.retvalue = this.Expr()
            if (this.current_token != this.TOKENS.TOK_CPAREN) {
                throw new Error("Missing closing paranthesis")
            }
            this.current_token = this.getToken()
        } else if (this.current_token === this.TOKENS.TOK_PLUS || this.current_token === this.TOKENS.TOK_MINUS) {
            var I_Token = this.current_token
            this.current_token = this.getToken()
            this.retvalue = this.Factor()
            this.retvalue = new UnaryExpression(this.retvalue,
                I_Token === this.TOKENS.TOKEN_PLUS ? operators.PLUS : operators.MINUS)
        } else {
            throw new Error("Invalid token : " + this.current_token)
        }
        return this.retvalue
    }
}