export class User {
    #firstName;
    #lastName;
    #identificationType;
    #identificationNumber;
    #email;
    #phone;
    #password;
    #place;
    #userType;
    #registeredDate;
    #active;

    constructor(firstName, lastName, identificationType, identificationNumber, email, phone, password, place, userType, registeredDate, active) {
        this.#firstName = firstName
        this.#lastName = lastName
        this.#identificationType = identificationType
        this.#identificationNumber = identificationNumber
        this.#email = email
        this.#phone = phone
        this.#password = password
        this.#place = place
        this.#userType = userType
        this.#registeredDate = registeredDate
        this.#active = active
    }

    set firstName(firstName){this.#firstName = firstName}
    set lastName(lastName){this.#lastName = lastName}
    set identificationType(identificationType){this.#identificationType = identificationType}
    set identificationNumber(identificationNumber){this.#identificationNumber = identificationNumber}
    set email(email){this.#email = email}
    set phone(phone){this.#phone = phone}
    set password(password){this.#password = password}
    set place(place){this.#place = place}
    set userType(userType){this.#userType = userType}
    set registeredDate(registeredDate){this.#registeredDate = registeredDate}
    set active(active){this.#active = active}

    get firstName() { return this.#firstName}
    get lastName() { return this.#lastName}
    get identificationType() { return this.#identificationType}
    get identificationNumber() { return this.#identificationNumber}
    get email() { return this.#email}
    get phone() { return this.#phone}
    get password() { return this.#password}
    get place() { return this.#place}
    get userType() { return this.#userType}
    get registeredDate() { return this.#registeredDate}
    get active() { return this.#active}

    #collection = {
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
    }

    async #create( db ) {
        await db.createCollection("users", this.#collection);
    }

    async #generateIndexes( db ) {
        const users = db.collection("users") 
        await users.createIndex({firstName: 1},
            {
                name: "indexFirstName",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await users.createIndex({lastName: 1},
            {
                name: "indexLastName",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await users.createIndex({identificationNumber: 1},
            {
                name: "indexIdNumber",
                unique: true,
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await users.createIndex({"place.city": 1},
            {
                name: "indexPlaceCity",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await users.createIndex({"place.country": 1},
            {
                name: "indexPlaceCountry",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await users.createIndex({registeredDate: 1},
            {
                name: "IndexRegisteredDate",
                wiredTigerIndexConfig: 4096,
            }
        )

        await users.createIndex({userType: 1},
            {
                name: "IndexUserType",
                wiredTigerIndexConfig: 4096,
            }
        )
    }

    async generateUsersCollection( db ) {
        await this.#create( db )
        await this.#generateIndexes( db )
    }
}