import { client, main } from "../helpers/db.js"
import { insert } from "../data/paymentMethods.js"

export const index = async()=> {
    const db = await main()
    try {
        const paymentMethods = db.collection("paymentMethods") 
        await paymentMethods.createIndex({code: 1},
            {
                name: "indexCode",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await paymentMethods.createIndex({name: 1},
            {
                name: "indexName",
                wiredTigerIndexConfig: 4096,
            }
        )

        await insert()
    } catch ({...error}) {
        console.log("ERROR paymentMethods index", error)
    } finally {
        await client.close()
        console.log("closed paymentMethods index connection")
    }
}