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
        const num = this.parseNum();
        return this.parseExpr1(num);
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

    parseExpr1(left) {
        const node = new BinaryExpr();
        node.left = left;
        node.op = this.lexer.peek();
        if (!Lexer.isOp(node.op.type)) {
            return left;
        }
        this.lexer.next();
        if (!Lexer.isOp(node.op.type)) {
            throw new Error(this.makeErrMsg(node.op));
        }
        node.right = this.parseExpr();
        return node;
    }

    makeErrMsg(tok) {
        const loc = tok.loc;
        return `Unexpected token at line: ${loc.start.line} column: ${loc.start.col}`;
    }
}
