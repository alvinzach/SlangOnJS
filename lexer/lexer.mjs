export default class Lexer {
	TOKENS={
		ILLEGAL_TOKEN:-1,
		TOK_PLUS:'+',
		TOK_MINUS:'-',
		TOK_MUL:'*',
		TOK_DIV:'/',
		TOK_OPAREN:'(',
		TOK_CPAREN:')',
		TOK_DOUBLE:'d',
		TOK_NULL:null
	}
	number;
	constructor(expr){
		this.IEXPR=expr
		this.length=this.IEXPR.length
		this.index=0    
	}
	getToken(){
		tok=this.TOKENS.ILLEGAL_TOKEN
		while(this.index<this.length&&
			(this.IEXPR.charAt(this.index)===' '||this.IEXPR.charAt(this.index)=='\t'))
			this.index++
			if(this.index==this.length)
			return this.TOKENS.TOK_NULL
			switch(this.IEXPR[this.index]){
				case '+':
				var tok=this.TOKENS.TOK_PLUS
				this.index++
				break;
				case '-':
				tok=this.TOKENS.TOK_MINUS
				this.index++
				break;
				case '*':
				tok=this.TOKENS.TOK_MUL
				this.index++
				break;
				case '/':
				tok=this.TOKENS.TOK_DIV
				this.index++
				break;
				case '(':
				tok=this.TOKENS.TOK_OPAREN
				this.index++
				break; 
				case ')':
				tok=this.TOKENS.TOK_CPAREN
				this.index++
				break; 
				case '0':
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
				var str = '';
				while (this.index < this.length &&(
					this.IEXPR.charAt(this.index) === '0' ||
					this.IEXPR.charAt(this.index) === '1' ||
					this.IEXPR.charAt(this.index) === '2' ||
					this.IEXPR.charAt(this.index) === '3' ||
					this.IEXPR.charAt(this.index) === '4' ||
					this.IEXPR.charAt(this.index) === '5' ||
					this.IEXPR.charAt(this.index) === '6' ||
					this.IEXPR.charAt(this.index) === '7' ||
					this.IEXPR.charAt(this.index) === '8' ||
					this.IEXPR.charAt(this.index) === '9')) {
						str += this.IEXPR.charAt(this.index);
						this.index ++;
					}
					this.number = parseFloat(str, 10);
					tok = this.TOKENS.TOK_DOUBLE;
					break;
					default:
					throw new Error('Error while nanalyzing tokens');
				}
				return tok;
			}
			getNumber(){
				return this.number;
			}
		}