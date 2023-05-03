const crypto = require('crypto');
const axios = require('axios');

const apiSecret = 'bKuWKbhfW4N6IfatZ6SlEBsRKlL80XDL';
const jwtToken = '4ybdok0of6nxb03rc66flwrwvsm';
const appToken = 'sbx:Ka5YIiuxJYZVCtIEJR4HOvAl.IlByxdpnRaxKZ4pjeEbQZbE9GVrlAp1T';

let params = {
    externalUserId: 1,
    email: "karthick@yopmail.com",
    phone: "+91 1231231231",
    fixedInfo: {
        country: "IND",
        placeOfBirth: "India"
    }
}
let signature;
let timeStamp = Date.now();
// let concatination = HmacSHA256(`${timeStamp}POST/resources/applicants?levelName=basic-kyc-level`, process.env.REACT_APP_SECRET_KEY);

const message = `${timeStamp}POST/resources/applicants?levelName=basic-kyc-level`;
signature = crypto.createHmac('sha256', apiSecret).update(message).digest('hex');

console.log(signature);

// console.log(concatination);
// signature = `${concatination}`.toString(16).toLowerCase();
// signature = concatination;
// signature = concatination.toString(16).toLowerCase();

axios.post("https://api.sumsub.com/resources/applicants?levelName=basic-kyc-level", data = JSON.stringify(params), {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-App-Token': appToken,
        'X-App-Access-Sig': signature,
        'X-App-Access-Ts': timeStamp,
        'Authorization': `Bearer ${jwtToken}`
    }
}).then(data => console.log(data.response.data)).catch(err => console.log(err));