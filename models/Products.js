export class Products {
    code;
    name;
    description;
    image;
    price;
    stock;
    brand;
    condition;
    active;
    vat;
    category;

    constructor(code, name, description, image, price, stock, brand, condition, active = true, vat, category) {
        this.code = code
        this.name = name
        this.description = description
        this.image = image
        this.price = price
        this.stock = stock
        this.brand = brand
        this.condition = condition
        this.active = active
        this.vat = vat
        this.category = category
    }
}