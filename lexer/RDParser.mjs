import Lexer from "./lexer.mjs";
import NumericConstant from "../expressions/NumericConstant.mjs"
import UnaryExpression from "../expressions/UnaryExpression.mjs"
import BinaryExpression from "../expressions/BinaryExpression.mjs"
import operators from "../operators.mjs";
export default class RDParser extends Lexer {
    current_token;
    retvalue;
    CallExpr() {
        this.current_token = this.getToken()
        return this.Expr()
    }
    // <Expr> ::= <Term> | Term { + | - } <Expr>
    // <Term> ::= <Factor> | <Factor> {*|/} <Term>
    // <Factor>::= <number> | ( <expr> ) | {+|-} <factor>
    Expr() {
        let retvalue = this.Term()
        console.log(retvalue)
        console.log(this.current_token)
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