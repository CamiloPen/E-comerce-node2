import { client, main } from '../helpers/db.js';
import { ObjectId } from 'mongodb';

export const insert = async()=>{
    const db = await main();
    const paymentMethods = db.collection('paymentMethods');
    const data = [
        {
            _id: new ObjectId("680e783a3794673853a348db"),
            code: "PAY001",
            name: "Credit Card Payment",
            active: true
        },
        {
            _id: new ObjectId("680e783a3794673853a348dc"),
            code: "PAY002",
            name: "Debit Card Payment",
            active: true
        },
        {
            _id: new ObjectId("680e783a3794673853a348dd"),
            code: "PAY003",
            name: "Bank Transfer",
            active: true
        },
        {
            _id: new ObjectId("680e783a3794673853a348de"),
            code: "PAY004",
            name: "Cash on Delivery",
            active: true
        },
        {
            _id: new ObjectId("680e783a3794673853a348df"),
            code: "PAY005",
            name: "PayPal Online Payment",
            active: true
        }
    ]
    try {
        let res = await paymentMethods.insertMany(data);
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