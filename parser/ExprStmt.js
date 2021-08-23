import Node from "./Node.js"
import NodeType from "./NodeType.js"

export default class ExprStmt extends Node {
    constructor(loc, value) {
        super(NodeType.EXPR_STMT, loc);
        this.value = value;
    }
}
