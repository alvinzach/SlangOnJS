import Expression from './Expression.mjs'
export default class NumericConstant extends Expression{
    constructor(value){
        super()
        this.value=value;
    }
    evaluate(ctx){
        return this.value;
    }

}