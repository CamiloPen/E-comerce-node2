export class Category {
    #code;
    #name;
    #active;

    constructor(code, name, active) {
        this.#code = code
        this.#name = name
        this.#active = active
    }

    set code(code){this.#code = code}
    set name(name){this.#name = name}
    set active(active){this.#active = active}

    get code() { return this.#code}
    get name() { return this.#name}
    get active() { return this.#active}

    #collection = {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["code", "name"],
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
                    active: {
                        bsonType: "bool"
                    }
                },
                additionalProperties: false
            }
        }
    }

    async #create( db ) {
        await db.createCollection("categories", this.#collection);
    }

    async #generateIndexes( db ) {
        const categories = db.collection("categories") 
        await categories.createIndex({code: 1},
            {
                name: "indexCode",
                unique: true,
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await categories.createIndex({name: 1},
            {
                name: "indexName",
                wiredTigerIndexConfig: 4096,
            }
        )
    }

    async generateCategoriesCollection( db ) {
        await this.#create( db )
        await this.#generateIndexes( db )
    }
}