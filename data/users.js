import { client, main } from '../helpers/db.js';
import { ObjectId } from 'mongodb';

export const insert = async()=>{
    const db = await main();
    const users = db.collection('users');
    const data = [
        {
            _id: new ObjectId("680e62d7d6771704ac66462c"),
            firstName: "Sebastian",
            lastName: "Montenegro",
            identificationType: "CC",
            identificationNumber: "1234567890",
            email: "sebastian.montenegro@example.com",
            phone: "3001234567",
            password: "S3b@stiAn9",
            place: {
                city: "Bogotá",
                country: "Colombia",
                address: "Cra 10 # 20-30",
                zipCode: 110111
            },
            userType: ["buyer"],
            registeredDate: new Date("2025-01-15T10:00:00Z"),
            active: true
        },
        {
            _id: new ObjectId("680e62d7d6771704ac66462d"),
            firstName: "Valentina",
            lastName: "Rodriguez",
            identificationType: "CE",
            identificationNumber: "9876543210",
            email: "valentina.rodriguez@example.net",
            phone: "3109876543",
            password: "V@l3ntina8",
            place: {
                city: "Medellin",
                country: "Colombia",
                address: "Calle 50 # 45-60",
                zipCode: 50021
            },
            userType: ["seller"],
            registeredDate: new Date("2025-02-20T14:30:00Z"),
            active: true
        },
        {
            _id: new ObjectId("680e62d7d6771704ac66462e"),
            firstName: "Federico",
            lastName: "Fischbach",
            identificationType: "PEP",
            identificationNumber: "PEP2023456",
            email: "federico.fischbach@example.org",
            phone: "3156549870",
            password: "F3d3r!co7",
            place: {
                city: "Cali",
                country: "Colombia",
                address: "Av 6N # 34-52",
                zipCode: 760001
            },
            userType: ["buyer", "seller"],
            registeredDate: new Date("2025-03-10T08:15:00Z"),
            active: false
        },
        {
            _id: new ObjectId("680e62d7d6771704ac66462f"),
            firstName: "Manuela",
            lastName: "Gonzalez",
            identificationType: "CC",
            identificationNumber: "654321987",
            email: "manuela.gonzalez@example.co",
            phone: "3017654321",
            password: "M@nu3la23",
            place: {
                city: "Barranquilla",
                country: "Colombia",
                address: "Carrera 40 # 45-23",
                zipCode: 80001
            },
            userType: ["buyer"],
            registeredDate: new Date("2025-03-25T12:45:00Z"),
            active: true
        },
        {
            _id: new ObjectId("680e62d7d6771704ac664630"),
            firstName: "Camilo",
            lastName: "Torres",
            identificationType: "PS",
            identificationNumber: "PS1234567",
            email: "camilo.torres@example.com",
            phone: "3021239876",
            password: "C@m1lo98T",
            place: {
                city: "Pereira",
                country: "Colombia",
                address: "Calle 20 # 15-40",
                zipCode: 660002
            },
            userType: ["seller"],
            registeredDate: new Date("2025-01-28T09:00:00Z"),
            active: true
        },
        {
            _id: new ObjectId("680e62d7d6771704ac664631"),
            firstName: "Daniela",
            lastName: "Castaneda",
            identificationType: "CC",
            identificationNumber: "1029384756",
            email: "daniela.castaneda@example.net",
            phone: "3113456789",
            password: "D@ni3laP9",
            place: {
                city: "Cartagena",
                country: "Colombia",
                address: "Av Pedro de Heredia # 50-25",
                zipCode: 130001
            },
            userType: ["seller"],
            registeredDate: new Date("2025-03-01T16:30:00Z"),
            active: true
        },
        {
            _id: new ObjectId("680e62d7d6771704ac664632"),
            firstName: "Santiago",
            lastName: "Vargas",
            identificationType: "CE",
            identificationNumber: "CE9832471",
            email: "santiago.vargas@example.edu",
            phone: "3002345678",
            password: "S4nti@go5",
            place: {
                city: "Manizales",
                country: "Colombia",
                address: "Carrera 23 # 65-80",
                zipCode: 170004
            },
            userType: ["buyer"],
            registeredDate: new Date("2025-02-15T11:00:00Z"),
            active: false
        },
        {
            _id: new ObjectId("680e62d7d6771704ac664633"),
            firstName: "Isabella",
            lastName: "Martinez",
            identificationType: "PEP",
            identificationNumber: "PEP9876543",
            email: "isabella.martinez@example.info",
            phone: "3209871234",
            password: "1s@bElla7",
            place: {
                city: "Santa Marta",
                country: "Colombia",
                address: "Carrera 5 # 12-34",
                zipCode: 470004
            },
            userType: ["buyer", "seller"],
            registeredDate: new Date("2025-04-05T15:15:00Z"),
            active: true
        },
        {
            _id: new ObjectId("680e62d7d6771704ac664634"),
            firstName: "Alejandro",
            lastName: "Giraldo",
            identificationType: "PS",
            identificationNumber: "PS3456789",
            email: "alejandro.giraldo@example.io",
            phone: "3135678901",
            password: "A1ej@ndrO",
            place: {
                city: "Bucaramanga",
                country: "Colombia",
                address: "Calle 45 # 27-60",
                zipCode: 680003
            },
            userType: ["buyer"],
            registeredDate: new Date("2025-01-18T13:30:00Z"),
            active: true
        },
        {
            _id: new ObjectId("680e62d7d6771704ac664635"),
            firstName: "Mariana",
            lastName: "Salazar",
            identificationType: "CC",
            identificationNumber: "1092837465",
            email: "mariana.salazar@example.biz",
            phone: "3146789012",
            password: "M@r1ana8S",
            place: {
                city: "Cúcuta",
                country: "Colombia",
                address: "Av 0 # 5-10",
                zipCode: 540001
            },
            userType: ["seller"],
            registeredDate: new Date("2025-04-10T10:10:00Z"),
            active: false
        }
    ];    
    try {
        let res = await users.insertMany(data);
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