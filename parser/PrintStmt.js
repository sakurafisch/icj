import Node from "./Node.js"
import NodeType from "./NodeType.js";

export default class PrintStmt extends Node {
    constructor(loc, value) {
        super(NodeType.PRINT_STMT, loc);
        this.value = value;
    }
}
