import Expression from './Expression.mjs'
import Operators from '../operators.mjs'
export default class BinaryExpression extends Expression{
    constructor(expr1,expr2,op){
        super()
        this.expr1=expr1;
        this.expr2=expr2;
        this.op=op;
    }
    evaluate(ctx){
        switch(this.op){
            case Operators.PLUS:
                return this.expr1.evaluate()+this.expr2.evaluate()
            case Operators.MINUS:
                return this.expr1.evaluate()-this.expr2.evaluate()
            case Operators.DIVISION:
                return this.expr1.evaluate()/this.expr2.evaluate()
            case Operators.MULTIPLY:
                return this.expr1.evaluate()*this.expr2.evaluate()
        }
        return NaN
    }

}