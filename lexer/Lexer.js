import { EOL, EOF } from "./const.js";
import Token from "./Token.js";
import TokenType from "./TokenType.js";
import process from 'process';


export default class Lexer {
    constructor(src) {
        this.src = src;
    }

    next() {
        this.skipWhitespace();
        const ch = this.src.peek();
        switch(ch) {
            case '"':
                return this.readString();
            case "h":
                return this.readHi();
            case EOF:
                return new Token(TokenType.EOF);
            default:
                throw new Error(this.makeErrMsg());
        }
    }

    makeErrMsg() {
        return `Unexpected char at line: ${this.src.line} column: ${this.src.col}`;
    }

    readHi() {
        const tok = new Token(TokenType.HI);
        tok.loc.start = this.src.getPos();
        const hi = this.src.read(2);
        if (hi !== "hi") {
            this.makeErrMsg();
            process.exit();
        }
        // assert.ok(hi === "hi", this.makeErrMsg());
        tok.loc.end = this.src.getPos();
        tok.value = "hi";
        return tok;
    }

    readString() {
        const tok = new Token(TokenType.STRING);
        tok.loc.start = this.src.getPos();
        this.src.read();
        const v = [];
        while (true) {
            let ch = this.src.read();
            if (ch == '"') {
                break;
            }
            if (ch === EOF) {
                throw new Error(this.makeErrMsg());
            }
            v.push(ch);
        }
        tok.loc.end = this.src.getPos();
        tok.value = v.join("");
        return tok;
    }

    skipWhitespace() {
        while (true) {
            let ch = this.src.peek();
            if (ch === " " || ch === "\t" || ch === EOL) {
                this.src.read();
                continue;
            }
            break;
        }
    }

    peek() {
        this.src.pushPos();
        const tok = this.next();
        this.src.restorePos();
        return tok;
    }

    getPos() {
        return this.src.getPos();
    }
}
