import OPERATORS from './operators.mjs'
import NumericConstant from './expressions/NumericConstant.mjs'
import BinaryExpression from './expressions/BinaryExpression.mjs'
import Lexer from './lexer/lexer.mjs'
import RDParser from './lexer/RDParser.mjs'

var expr="-2*2*6"
var lex=new RDParser(expr)

console.log(lex.CallExpr().evaluate())