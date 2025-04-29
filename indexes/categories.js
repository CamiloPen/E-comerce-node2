import { client, main } from "../helpers/db.js"

export const index = async()=> {
    const db = await main()
    try {
        const categories = db.collection("categories") 
        await categories.createIndex({code: 1},
            {
                name: "indexCode",
                wiredTigerIndexConfig: 4096,
            }
        )
    
        await categories.createIndex({name: 1},
            {
                name: "indexName",
                wiredTigerIndexConfig: 4096,
            }
        )

    } catch ({...error}) {
        console.log("ERROR categories index", error)
    } finally {
        await client.close()
        console.log("closed categories index connection")
    }
}