import { client, main } from "./../helpers/db.js"
import { index } from "../indexes/products.js"
const db = await main()

try {
    // await db.createCollection("products").drop()
    await db.createCollection("products", {
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
    })
    console.log("Esquema de productos creado.")

    await index()

} catch ({...error}) {
    console.log("ERROR products schema", error)
} finally {
    await client.close()
    console.log("closed products schema connection")
}