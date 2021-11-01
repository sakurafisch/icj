import Visitor from "./Visitor.js";

export default class InterpretVisitor extends Visitor {
    visitProg(node) {
        node.body.forEach(stmt => this.visitStmt(stmt));
    }
    visitBinaryExpr(node) {
        const left = this.visitExpr(node.left);
        const op = node.op.type;
        const right = this.visitExpr(node.right);
        switch (op) {
            case "+":
                return left + right;
            case "-":
                return left - right;
            case "*":
                return left * right;
            case "/":
                return left / right;
            case "**":
                return left ** right;
        }
    }
    visitSayHi(node) {
        console.log(`hi ${node.value}`);
    }
    visitPrintStmt(node) {
        console.log(this.visitExpr(node.value));
    }
    visitNumLiteral(node) {
        return parseInt(node.value)
    }
}
