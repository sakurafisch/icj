import Node from "./Node.js";
import NodeType from "./NodeType.js";

export default class NumLiteral extends Node {
    constructor(loc, value) {
        super(NodeType.NUMBER, loc);
        this.value = value;
    }
}
