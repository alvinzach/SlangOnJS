import Expression from './Expression.mjs'
import Operators from '../operators.mjs'
export default class BinaryExpression extends Expression{
    constructor(expr1,op){
        super()
        this.expr1=expr1;
        this.op=op;
    }
    evaluate(ctx){
        switch(this.op){
            case Operators.PLUS:
                return this.expr1.evaluate(ctx)
            case Operators.MINUS:
                return -1*this.expr1.evaluate(ctx)
        }
        return NaN
    }

}