import { client, main } from '../helpers/db.js';
import { ObjectId } from 'mongodb';

export const insert = async()=>{
    const db = await main();
    const bills = db.collection('bills');
    const data = [
        {
            _id: new ObjectId("680e8692388b4e9e0c322111"),
            reference: "SALE001",
            date: new Date("2025-01-15T10:30:00Z"),
            client: new ObjectId("680e62d7d6771704ac66462c"),
            paymentMethod: new ObjectId("680e783a3794673853a348db"),
            seller: new ObjectId("680e62d7d6771704ac66462d"),
            details: [
                {
                    product: new ObjectId("680e7d7cf33af6197161ed9f"),
                    quantity: 1,
                    price: 2500000
                },
                {
                    product: new ObjectId("680e7d7cf33af6197161eda0"),
                    quantity: 2,
                    price: 750000
                }
            ]
        },
        {
            _id: new ObjectId("680e8692388b4e9e0c322112"),
            reference: "SALE002",
            date: new Date("2025-02-20T14:45:00Z"),
            client: new ObjectId("680e62d7d6771704ac66462e"),
            paymentMethod: new ObjectId("680e783a3794673853a348dc"),
            seller: new ObjectId("680e62d7d6771704ac664630"),
            details: [
                {
                    product: new ObjectId("680e7d7cf33af6197161eda1"),
                    quantity: 1,
                    price: 350000
                }
            ]
        },
        {
            _id: new ObjectId("680e8692388b4e9e0c322113"),
            reference: "SALE003",
            date: new Date("2025-03-10T09:15:00Z"),
            client: new ObjectId("680e62d7d6771704ac664632"),
            paymentMethod: new ObjectId("680e783a3794673853a348dd"),
            seller: new ObjectId("680e62d7d6771704ac66462e"),
            details: [
                {
                    product: new ObjectId("680e7d7cf33af6197161eda2"),
                    quantity: 1,
                    price: 4500000
                },
                {
                    product: new ObjectId("680e7d7cf33af6197161eda3"),
                    quantity: 1,
                    price: 1850000
                }
            ]
        },
        {
            _id: new ObjectId("680e8692388b4e9e0c322114"),
            reference: "SALE004",
            date: new Date("2025-04-05T16:00:00Z"),
            client: new ObjectId("680e62d7d6771704ac664633"),
            paymentMethod: new ObjectId("680e783a3794673853a348de"),
            seller: new ObjectId("680e62d7d6771704ac664631"),
            details: [
                {
                    product: new ObjectId("680e7d7cf33af6197161eda0"),
                    quantity: 3,
                    price: 750000
                },
                {
                    product: new ObjectId("680e7d7cf33af6197161eda1"),
                    quantity: 2,
                    price: 350000
                }
            ]
        },
        {
            _id: new ObjectId("680e8692388b4e9e0c322115"),
            reference: "SALE005",
            date: new Date("2025-04-25T11:20:00Z"),
            client: new ObjectId("680e62d7d6771704ac664634"),
            paymentMethod: new ObjectId("680e783a3794673853a348df"),
            seller: new ObjectId("680e62d7d6771704ac664633"),
            details: [
                {
                    product: new ObjectId("680e7d7cf33af6197161ed9f"),
                    quantity: 1,
                    price: 2500000
                },
                {
                    product: new ObjectId("680e7d7cf33af6197161eda3"),
                    quantity: 1,
                    price: 1850000
                },
                {
                    product: new ObjectId("680e7d7cf33af6197161eda1"),
                    quantity: 2,
                    price: 350000
                }
            ]
        }
    ]
    try {
        let res = await bills.insertMany(data);
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