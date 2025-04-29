import { client, main } from "../helpers/db.js"
import { insert } from "../data/products.js"

export const index = async()=> {
    const db = await main()
    try {
        const products = db.collection("products") 
        await products.createIndex({firstName: 1},
            {
                name: "indexFirstName",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await products.createIndex({lastName: 1},
            {
                name: "indexLastName",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await products.createIndex({identificationNumber: 1},
            {
                name: "indexIdNumber",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await products.createIndex({"place.city": 1},
            {
                name: "indexPlaceCity",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await products.createIndex({"place.country": 1},
            {
                name: "indexPlaceCountry",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await products.createIndex({registeredDate: 1},
            {
                name: "IndexRegisteredDate",
                wiredTigerIndexConfig: 4096,
            }
        )

        await insert()
    } catch ({...error}) {
        console.log("ERROR products index", error)
    } finally {
        await client.close()
        console.log("closed products index connection")
    }
}