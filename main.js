import Lexer from './lexer/Lexer.js';
import Source from './lexer/Source.js'
import TokenType from './lexer/TokenType.js';
import Parser from './parser/Parser.js';
import util from "util";



(function main() {
    const code = `hi "lexer"`;
    const src = new Source(code);
    const lexer = new Lexer(src);

    // while (true) {
    //     const tok = lexer.next();
    //     if (tok.type === TokenType.EOF) {
    //         break;
    //     }
    //     console.log(tok);
    // }

    const parser = new Parser(lexer);
    const ast = parser.parseProg();
    console.log(util.inspect(ast, true, null));
})();
