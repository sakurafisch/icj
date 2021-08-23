import Lexer from './Lexer.js';
import Source from './Source.js'
import TokenType from './TokenType.js';



(function main() {
    const code = `hi "lexer"`;
    const src = new Source(code);
    const lexer = new Lexer(src);

    while (true) {
        const tok = lexer.next();
        if (tok.type === TokenType.EOF) {
            break;
        }
        console.log(tok);
    }
})();
