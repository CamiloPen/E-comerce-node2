import { client, main } from "./../helpers/db.js"
import { index } from "../indexes/users.js"
const db = await main()

try {
    // await db.createCollection("users").drop()
    await db.createCollection("users", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["firstName", "lastName", "identificationType", "identificationNumber", "email", "phone", "password", "place", "userType", "registeredDate"],
                properties: {
                    _id: {
                        bsonType: "objectId"
                    },
                    firstName: {
                        bsonType: "string",
                        maxLength: 30,
                    },
                    lastName: {
                        bsonType: "string",
                        maxLength: 30,
                    },
                    identificationType: {
                        bsonType: "string",
                        enum: ["CC", "CE", "PS", "PEP"]
                    },
                    identificationNumber: {
                        bsonType: "string"
                    },
                    email: {
                        bsonType: "string",
                        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
                    },
                    phone: {
                        bsonType: "string"
                    },
                    password: {
                        bsonType: "string",
                        pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$"
                    },
                    place: {
                        bsonType: "object",
                        properties: {
                            city: {
                                bsonType: "string"
                            },
                            country: {
                                bsonType: "string"
                            },
                            address: {
                                bsonType: "string"
                            },
                            zipCode: {
                                bsonType: "int"
                            }
                        }
                    },
                    userType: {
                        bsonType: "array",
                        uniqueItems: true,
                        items: {
                            bsonType: "string"
                        }
                    },
                    registeredDate: {
                        bsonType: "date"
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
    console.log("ERROR users schema", error)
} finally {
    await client.close()
    console.log("closed users schema connection")
}