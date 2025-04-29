import { client, main } from "./../helpers/db.js"
import { index } from "../indexes/paymentMethods.js"
const db = await main()

try {
    // await db.createCollection("paymentMethods").drop()
    await db.createCollection("paymentMethods", {
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
    })
    console.log("Esquema de productos creado.")

    await index()

} catch ({...error}) {
    console.log("ERROR paymentMethods schema", error)
} finally {
    await client.close()
    console.log("closed paymentMethods schema connection")
}