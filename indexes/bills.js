import { client, main } from "../helpers/db.js"

export const index = async()=> {
    const db = await main()
    try {
        const bills = db.collection("bills") 
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
    } catch ({...error}) {
        console.log("ERROR bills index", error)
    } finally {
        await client.close()
        console.log("closed bills index connection")
    }
}