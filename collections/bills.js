import { client, main } from "./../helpers/db.js"
import { index } from "../indexes/bills.js"
const db = await main()

try {
    // await db.createCollection("bills").drop()
    await db.createCollection("bills", {
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
    })
    console.log("Esquema de productos creado.")

    await index()

} catch ({...error}) {
    console.log("ERROR bills schema", error)
} finally {
    await client.close()
    console.log("closed bills schema connection")
}