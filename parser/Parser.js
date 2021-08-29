import TokenType from "../lexer/TokenType.js";
import process from 'process';
import Prog from './Prog.js'
import SayHi from './SayHi.js'
import ExprStmt from "./ExprStmt.js";
import NumLiteral from "./Numliteral.js";
import BinaryExpr from "./BinaryExpr.js";
import Lexer from "../lexer/Lexer.js";

export default class Perser {
    constructor(lexer) {
        this.lexer = lexer;
    }

    parseProg() {
        // const node = new Prog();
        // node.loc.start = this.lexer.getPos();

        // while (true) {
        //     const tok = this.lexer.peek();
        //     if (tok.type === TokenType.EOF) {
        //         break;
        //     }
        //     node.body.push(this.parseSayHi());
        // }
        // node.loc.end = this.lexer.getPos();
        // return node;

        const node = new Prog();
        node.loc.start = this.lexer.getPos();
        while (true) {
            const tok = this.lexer.peek();
            let stmt;
            if (tok.type === TokenType.EOF) {
                break;
            }
            if (tok.type === TokenType.HI) {
                stmt = this.parseSayHi();
            }
            if (tok.type === TokenType.NUMBER) {
                stmt = this.parseExprStmt();
            }
            node.body.push(stmt);
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

    parseExprStmt() {
        const node = new ExprStmt();
        const expr = this.parseExpr();
        node.loc = expr.loc;
        node.value = expr;
        return node;
    }

    parseExpr() {
        let left = this.parseTerm();
        while (true) {
            const op = this.lexer.peek();
            if (op.type !== "+" && op.type !== "-") {
                break;
            }
            this.lexer.next();
            const node = new BinaryExpr();
            node.left = left;
            node.op = op;
            node.right = this.parseTerm();
            left = node;
        }
        return left;
    }

    parseNum() {
        const node = new NumLiteral();
        let tok = this.lexer.next();
        if (tok.type !== TokenType.NUMBER) {
            throw new Error(this.makeErrMsg(tok));
        }
        node.loc = tok.loc;
        node.value = tok.value;
        return node;
    }

    parseTerm() {
        let left = this.parseExpo();
        while (true) {
            const op = this.lexer.peek();
            if (op.type !== "*" && op.type !== "/") {
                break;
            }
            this.lexer.next();
            const node = new BinaryExpr();
            node.left = left;
            node.op = op;
            node.right = this.parseExpo();
            left = node;
        }
        return left;
    }

    parseExpo() {
        let left = this.parseFactor();
        while (true) {
            const op = this.lexer.peek();
            if (op.type !== "**") {
                break;
            }
            this.lexer.next();
            const node = new BinaryExpr();
            node.left = left;
            node.op = op;
            node.right = this.parseFactor();
            left = node;
        }
        return left;
    }

    parseFactor() {
        return this.parseNum();
    }

    makeErrMsg(tok) {
        const loc = tok.loc;
        return `Unexpected token at line: ${loc.start.line} column: ${loc.start.col}`;
    }
}
