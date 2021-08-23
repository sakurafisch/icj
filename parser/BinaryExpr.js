import Node from "./Node.js"
import NodeType from "./NodeType.js"

export default class BinaryExpr extends Node {
    constructor(loc, op, left, right) {
        super(NodeType.BINARY_EXPR, loc);
        this.op = op;
        this.left = left;
        this.right = right;
    }
}
