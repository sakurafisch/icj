import NodeType from "../parser/NodeType.js";

// 这是一个基类，空着的方法留给子类去实现
// visitStmt 和 visitExpr 做一个简单的任务派发
export default class Visitor {
    visitProg(node) {}
    visitSayHi(node) {}
    visitExprStmt(node) {}
    visitStmt(node) {
        switch (node.type) {
            case NodeType.EXPR_STMT:
                return this.visitExprStmt(node);
            case NodeType.SAY_HI:
                return this.visitSayHi(node);
        }
    }
    visitStmtList(list) {}
    visitNumLiteral(node) {}
    visitBinaryExpr(node) {}
    visitExpr(node) {
        switch (node.type) {
            case NodeType.NUMBER:
                return this.visitNumLiteral(node);
            case NodeType.BINARY_EXPR:
                return this.visitBinaryExpr(node);
        }
    }
}
