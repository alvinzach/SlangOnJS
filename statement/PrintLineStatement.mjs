import Statment from "./Statement.mjs";

export default class PrintStatement extends Statment{
     constructor(_ex){
         super();
         this.ex=_ex;
     }
     execute(ctx){
        console.log(this.ex.evaluate()+"\n")
    }
}