import { client, main } from "../helpers/db.js"

export const index = async()=> {
    const db = await main()
    try {
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
    } catch ({...error}) {
        console.log("ERROR users index", error)
    } finally {
        await client.close()
        console.log("closed users index connection")
    }
}