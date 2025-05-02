import { client, main } from "../helpers/db.js";
import { User } from "./users.js"
import { Category } from "./categories.js"
import { PaymentMethod } from "./paymentMethods.js"
import { Product } from "./products.js"
import { Bill } from "./bills.js"

const db = await main();
const session = db.client.startSession();

try{
    const config = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' }
    }

    const userColl = new User()
    const categoryColl = new Category()
    const paymentMethodColl = new PaymentMethod()
    const productColl = new Product()
    const billColl = new Bill()
  
    await session.withTransaction( async ()=>{
        await userColl.generateUsersCollection( db )
        await categoryColl.generateCategoriesCollection( db )
        await paymentMethodColl.generatePaymentMethodsCollection( db )
        await productColl.generateProductsCollection( db )
        await billColl.generateBillsCollection( db )
        console.log("Colecciones e Indices creados correctamente")
    }, config );
  }
  catch( error ){
    console.log( error );
  }
  finally {
    if( session.transaction.isActive ) await session.abortTransaction();
    await session.endSession();
    await client.close();
  }