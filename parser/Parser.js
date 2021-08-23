import TokenType from "../lexer/TokenType.js";
import process from 'process';
import Prog from './Prog.js'
import SayHi from './SayHi.js'

export default class Perser {
    constructor(lexer) {
        this.lexer = lexer;
    }

    parseProg() {
        const node = new Prog();
        node.loc.start = this.lexer.getPos();

        while (true) {
            const tok = this.lexer.peek();
            if (tok.type === TokenType.EOF) {
                break;
            }
            node.body.push(this.parseSayHi());
        }
        node.loc.end = this.lexer.getPos();
        return node;
    }

    parseSayHi() {
        const node = new SayHi();
        let tok = this.lexer.next();
        if (tok.type !== TokenType.HI) {
            this.makeErrMsg();
            process.exit();
        }
        // assert.ok(tok.type === TokenType.HI, this.makeErrMsg(tok));

        node.loc.start = tok.loc.start;
        tok = this.lexer.next();

        if (tok.type !== TokenType.STRING) {
            this.makeErrMsg();
            process.exit();
        }
        // assert.ok(tok.type === TokenType.STRING, this.makeErrMsg(tok));

        node.value = tok.value;
        node.loc.end = tok.loc.end;
        return node;
    };

    makeErrMsg(tok) {
        const loc = tok.loc;
        return `Unexpected token at line: ${loc.start.line} column: ${loc.start.col}`;
    }
}
