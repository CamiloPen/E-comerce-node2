export class Users {
    firstName;
    lastName;
    identificationType;
    identificationNumber;
    email;
    phone;
    password;
    place = {
        city,
        country,
        address,
        zipCode,
    };
    userType;
    registeredDate;
    active;

    constructor(firstName, lastName, identificationType, identificationNumber, email, phone, password, place, userType, registeredDate, active = true) {
        this.firstName = firstName
        this.lastName = lastName
        this.identificationType = identificationType
        this.identificationNumber = identificationNumber
        this.email = email
        this.phone = phone
        this.password = password
        this.place = place
        this.userType = userType
        this.registeredDate = registeredDate
        this.active = active
    }

    
}