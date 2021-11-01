import Lexer from './lexer/Lexer.js';
import Source from './lexer/Source.js'
import Parser from './parser/Parser.js';
// import util from "util";
// import InterpretVisitor from './interpreter/InterpretVisitor.js';
import YamlVisitor from './interpreter/YamlVisitor.js';
import InterpretVisitor from './interpreter/InterpretVisitor.js';

(function main() {
    const code = `print 1 + 2 ** 3 * 5`;
    const src = new Source(code);
    const lexer = new Lexer(src);
    const parser = new Parser(lexer);

    const ast = parser.parseProg();
    const visitor = new InterpretVisitor();
    visitor.visitProg(ast);
})()



// (function main() {
//     // lexer
//     const code = `hi "lexer"`;
//     const src = new Source(code);
//     const lexer = new Lexer(src);

//     // // Log lexer output
//     // while (true) {
//     //     const tok = lexer.next();
//     //     if (tok.type === TokenType.EOF) {
//     //         break;
//     //     }
//     //     console.log(tok);
//     // }

//     // parser
//     const parser = new Parser(lexer);
//     const ast = parser.parseProg();
//     console.log(util.inspect(ast, true, null));

//     // interpreter
//     const visitor = new InterpretVisitor();
//     visitor.visitProg(ast);

// })();
