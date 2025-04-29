export class Bills {
    reference;
    date;
    client;
    paymentMethod;
    seller;
    details = [];

    constructor(reference, date, client, paymentMethod, seller, details) {
        this.reference = reference
        this.date = date
        this.client = client
        this.paymentMethod = paymentMethod
        this.seller = seller
        this.details = details
    }
}