import Visitor from "./Visitor.js";

export default class InterpretVisitor extends Visitor {
    visitProg(node) {
        node.body.forEach(stmt => this.visitSayHi(stmt));
    }
    visitSayHi(node) {
        console.log(`hi ${node.value}`);
    }
}
