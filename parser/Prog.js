import Node from "./Node.js"
import NodeType from "./NodeType.js";

export default class Prog extends Node {
    constructor(loc, body = []) {
        super(NodeType.Prog, loc);
        this.body = body;
    }
}
