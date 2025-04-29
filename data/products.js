import { client, main } from '../helpers/db.js';
import { ObjectId } from 'mongodb';

export const insert = async()=>{
    const db = await main();
    const products = db.collection('products');
    const data = [
        {
            _id: new  ObjectId('680e8406bae3fefc2c01ef85'),
            code: "PROD001",
            name: "Ultra HD Smart Television 55 Inch",
            description: "High-definition smart TV with voice control and built-in streaming services, ideal for home entertainment.",
            image: "https://example.com/images/tv-smart-55.jpg",
            price: 2500000,
            stock: 20,
            brand: "VisionTech Electronics",
            condition: "Brand New with Manufacturer Warranty",
            active: true,
            vat: 19,
            category: new ObjectId("680e783a3794673853a348d6")
          },
          {
            _id: new  ObjectId('680e8406bae3fefc2c01ef86'),
            code: "PROD002",
            name: "Ergonomic Executive Office Chair",
            description: "Comfortable and adjustable office chair with lumbar support, ideal for long working hours at home or office.",
            image: "https://example.com/images/office-chair.jpg",
            price: 750000,
            stock: 15,
            brand: "ErgoComfort Seating",
            condition: "New with Packaging",
            active: true,
            vat: 19,
            category: new ObjectId("680e783a3794673853a348d7")
          },
          {
            _id: new  ObjectId('680e8406bae3fefc2c01ef87'),
            code: "PROD003",
            name: "Men's Waterproof Running Sneakers",
            description: "Durable and stylish running shoes designed for maximum comfort and water resistance, perfect for outdoor sports.",
            image: "https://example.com/images/running-sneakers-men.jpg",
            price: 350000,
            stock: 40,
            brand: "SportX Footwear",
            condition: "New with Original Box",
            active: true,
            vat: 19,
            category: new ObjectId("680e783a3794673853a348d8")
          },
          {
            _id: new  ObjectId('680e8406bae3fefc2c01ef88'),
            code: "PROD004",
            name: "Digital SLR Professional Camera Lens Kit",
            description: "Full professional DSLR camera lens kit with 4 zoom lenses, carrying case and cleaning accessories included.",
            image: "https://example.com/images/camera-lens-kit.jpg",
            price: 4500000,
            stock: 10,
            brand: "PhotoPro Gear",
            condition: "Brand New Factory Sealed",
            active: true,
            vat: 19,
            category: new ObjectId("680e783a3794673853a348d6")
          },
          {
            _id: new  ObjectId('680e8406bae3fefc2c01ef89'),
            code: "PROD005",
            name: "All-Terrain Mountain Bicycle",
            description: "Rugged mountain bike with dual suspension system, perfect for off-road adventures and city commuting alike.",
            image: "https://example.com/images/mountain-bike.jpg",
            price: 1850000,
            stock: 12,
            brand: "AdventureWheels Bikes",
            condition: "Brand New Fully Assembled",
            active: true,
            vat: 19,
            category: new ObjectId("680e783a3794673853a348da")
          }
    ]
    try {
        let res = await products.insertMany(data);
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