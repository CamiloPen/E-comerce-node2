import { client, main } from '../helpers/db.js';
import { ObjectId } from 'mongodb';

export const insert = async()=>{
    const db = await main();
    const categories = db.collection('categories');
    const data = [
        {
            _id: new ObjectId("680e783a3794673853a348d6"),
            code: "CAT001",
            name: "Electronics and Gadgets",
            active: true
        },
        {
            _id: new ObjectId("680e783a3794673853a348d7"),
            code: "CAT002",
            name: "Home and Kitchen Appliances",
            active: true
        },
        {
            _id: new ObjectId("680e783a3794673853a348d8"),
            code: "CAT003",
            name: "Men's Fashion and Accessories",
            active: true
        },
        {
            _id: new ObjectId("680e783a3794673853a348d9"),
            code: "CAT004",
            name: "Women's Clothing and Footwear",
            active: false
        },
        {
            _id: new ObjectId("680e783a3794673853a348da"),
            code: "CAT005",
            name: "Outdoor Sports and Camping Gear",
            active: true
        }
    ]    
    try {
        let res = await categories.insertMany(data);
        console.log("Datos de los fabricantes insertados");
        console.log(res);

    } catch ({ writeErrors, ...error }) {
        const {
            errInfo: { details: { schemaRulesNotSatisfied } }
        } = writeErrors[0].err;
        console.log(schemaRulesNotSatisfied[0]);
    } finally {
        await client.close();
        console.log("maker data connection closed");
    }
}