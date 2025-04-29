export class Categories {
    code;
    name;
    active;

    constructor(code, name, active = true) {
        this.code = code
        this.name = name
        this.active = active
    }
}