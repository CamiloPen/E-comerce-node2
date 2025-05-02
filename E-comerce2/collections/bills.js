export class Bill {
    #reference;
    #date;
    #client;
    #paymentMethod;
    #seller;
    #details;

    constructor(reference, date, client, paymentMethod, seller, details) {
        this.#reference = reference
        this.#date = date
        this.#client = client
        this.#paymentMethod = paymentMethod
        this.#seller = seller
        this.#details = details
    }

    set reference(reference){this.#reference = reference}
    set date(date){this.#date = date}
    set client(client){this.#client = client}
    set paymentMethod(paymentMethod){this.#paymentMethod = paymentMethod}
    set seller(seller){this.#seller = seller}
    set details(details){this.#details = details}

    get reference() { return this.#reference}
    get date() { return this.#date}
    get client() { return this.#client}
    get paymentMethod() { return this.#paymentMethod}
    get seller() { return this.#seller}
    get details() { return this.#details}

    #collection = {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["reference", "date", "client", "paymentMethod", "seller", "details"],
                properties: {
                    _id: {
                        bsonType: "objectId"
                    },
                    reference: {
                        bsonType: "string",
                    },
                    date: {
                        bsonType: "date",
                    },
                    client: {
                        bsonType: "objectId",
                    },
                    paymentMethod: {
                        bsonType: "objectId",
                    },
                    seller: {
                        bsonType: "objectId",
                    },
                    details: {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: ["product", "quantity", "price"],
                            properties: {
                                product: {
                                    bsonType: "objectId",
                                },
                                quantity: {
                                    bsonType: "int",
                                    minimum: 1,
                                },
                                price: {
                                    bsonType: "int",
                                    minimum: 1,
                                }
                            }
                        }
                    },
                },
                additionalProperties: false
            }
        }
    }

    async #create( db ) {
        await db.createCollection("bills", this.#collection);
    }

    async #generateIndexes( db ) {
        const bills = db.collection("bills");
        await bills.createIndex(
            {reference: 1},
            {
                name: "indexReference",
                unique: true,
                wiredTigerIndexConfig: 4096,    
            }
        )

        await bills.createIndex(
            {date: 1},
            {
                name: "indexDate",
                wiredTigerIndexConfig: 4096,    
            }
        )

        await bills.createIndex(
            {client: 1},
            {
                name: "indexClient",
                wiredTigerIndexConfig: 4096,
            }
        )

        await bills.createIndex(
            {seller: 1},
            {
                name: "indexSeller",
                wiredTigerIndexConfig: 4096,
            }
        )
    }

    async generateBillsCollection( db ) {
        await this.#create( db )
        await this.#generateIndexes( db )
    }
}