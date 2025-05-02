export class Product {
    #code;
    #name;
    #description;
    #image;
    #price;
    #stock;
    #brand;
    #condition;
    #active;
    #vat;
    #category;

    constructor(code, name, description, image, price, stock, brand, condition, active, vat, category) {
        this.#code = code
        this.#name = name
        this.#description = description
        this.#image = image
        this.#price = price
        this.#stock = stock
        this.#brand = brand
        this.#condition = condition
        this.#active = active
        this.#vat = vat
        this.#category = category
    }

    set code(code){this.#code = code}
    set name(name){this.#name = name}
    set description(description){this.#description = description}
    set image(image){this.#image = image}
    set price(price){this.#price = price}
    set stock(stock){this.#stock = stock}
    set brand(brand){this.#brand = brand}
    set condition(condition){this.#condition = condition}
    set active(active){this.#active = active}
    set vat(vat){this.#vat = vat}
    set category(category){this.#category = category}

    get code() { return this.#code}
    get name() { return this.#name}
    get description() { return this.#description}
    get image() { return this.#image}
    get price() { return this.#price}
    get stock() { return this.#stock}
    get brand() { return this.#brand}
    get condition() { return this.#condition}
    get active() { return this.#active}
    get vat() { return this.#vat}
    get category() { return this.#category}

    #collection = {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["code", "name", "description", "image", "price", "stock", "brand", "condition", "vat", "category"],
                properties: {
                    _id: {
                        bsonType: "objectId"
                    },
                    code: {
                        bsonType: "string",
                    },
                    name: {
                        bsonType: "string",
                        minLength: 10,
                        maxLength: 100
                    },
                    description: {
                        bsonType: "string",
                        minLength: 10,
                        maxLength: 200
                    },
                    image: {
                        bsonType: "string",
                        pattern: "^(https?:\\/\\/)([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w\\.-]*)*\\/?$"
                    },
                    price: {
                        bsonType: "int",
                        minimum: 1,
                    },
                    stock: {
                        bsonType: "int",
                        minimum: 1
                    },
                    brand: {
                        bsonType: "string",
                        minLength: 10,
                        maxLength: 100
                    },
                    condition: {
                        bsonType: "string",
                        minLength: 10,
                        maxLength: 100
                    },
                    active: {
                        bsonType: "bool"
                    },
                    vat: {
                        bsonType: "int",
                        minimum: 1
                    },
                    category: {
                        bsonType: "objectId", 
                    }
                },
                additionalProperties: false
            }
        }
    }

    async #create( db ) {
        await db.createCollection("products", this.#collection);
    }

    async #generateIndexes( db ) {
        const products = db.collection("products")
        await products.createIndex({code: 1},
            {
                name: "indexCode",
                unique: true,
                wiredTigerIndexConfig: 4096,
            }
        )

        await products.createIndex({name: 1},
            {
                name: "indexName",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await products.createIndex({price: 1},
            {
                name: "indexPrice",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await products.createIndex({brand: 1},
            {
                name: "indexBrand",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await products.createIndex({category: 1},
            {
                name: "indexCategory",
                wiredTigerIndexConfig: 4096,
            }
        )
    }

    async generateProductsCollection( db ) {
        await this.#create( db )
        await this.#generateIndexes( db )
    }
}