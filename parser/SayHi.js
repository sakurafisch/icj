import NodeType from "./NodeType.js";
import Node from "./Node.js"

export default class SayHi extends Node {
    constructor(loc, value) {
        super(NodeType.SAY_HI, loc);
        this.value = value;
    }
}
