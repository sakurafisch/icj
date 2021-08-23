import SourceLoc from "../lexer/SourceLoc.js";

export default class Node {
    constructor(type, loc) {
        this.type = type;
        this.loc = loc || new SourceLoc();
    }
}
