import { client, main } from "./helpers/db.js";
import { ObjectId } from 'mongodb';
import { indexUser} from "./indexes/users.js";
import { indexBills } from "./indexes/bills.js";
import { indexCategories } from "./indexes/categories.js";
import { indexPayment } from "./indexes/paymentMethods.js";
import { indexProducts } from "./indexes/products.js";

const db = await main();
const usersCol = db.collection("users");
const billsCol = db.collection("bills");
const productsCol = db.collection("products");
const categoriesCol = db.collection("categories");
const paymentMethodsCol = db.collection("paymentMethods");
 
// CREATE INDEX
async function createIndex() {
    try {
        await indexUser(usersCol)
        await indexBills(billsCol)
        await indexCategories(categoriesCol)
        await indexPayment(paymentMethodsCol)
        await indexProducts(productsCol)
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}

// createIndex()

const dataCategories = 
   
async function insertData() {
    try {
        await usersCol.insertMany(dataUsers)
        await categoriesCol.insertMany(dataCategories)
        await paymentMethodsCol.insertMany(dataPayment)
    } catch (error) {
        console.log(error)
    } finally {
        await productsCol.insertMany(dataProducts)
        await billsCol.insertMany(dataBills)
        await client.close()
    }
}

insertData()