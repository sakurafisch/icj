import SourceLoc from './SourceLoc.js';

export default class Token {
    constructor(type, value, loc) {
        this.type = type;
        this.value = value;
        this.loc = loc || new SourceLoc();
    }
}