const crypto = require('crypto');
const moment = require('moment');
const https = require('https');
const axios = require('axios').default;

// const apiKey = '4ybdok0of6nxb03rc66flwrwvsm';
const apiKey = 'sbx:5QqhvjpNm7HcbMnsv1Ot3M1f.bgJcom57wQlnKM3rvPsHswS8kfVFvo7S';
const apiSecret = 'vjCrTVdbaS2B0QAEFJRFuevl9V6c0A2X';
const jwtToken = '4ybdok0of6nxb03rc66flwrwvsm';
const apiUrl = '';
const endpoint = '/resources';
const userId = '8c42114c-ad1e-4288-b1c2-568756b22802';
const levelName = "basic-kyc-level";
// const timestamp = moment.utc().format('YYYY-MM-DDTHH:mm:ss\\Z');
// const timestamp = Date.now();
const timestamp = Math.round(Date.now() / 1000);


let requestData = `${timestamp}POST/resources/applicants?userId=${userId}&levelName=basic-kyc-level`;
const hash = crypto.createHash('sha256').update(requestData).digest('hex');

// const message = `${timestamp}POST/resources/applicants?levelName=basic-kyc-level`;
const signature = crypto.createHmac('sha256', apiSecret).update(hash).digest('hex');

const xAppSignature = `Signature ${apiKey}:${signature}:${timestamp}`;

// const options = {
//     hostname: 'api.sumsub.com',
//     path: endpoint,
//     method: 'POST',
//     headers: {
//         'Authorization': `Bearer ${jwtToken}`,
//         'X-App-Token': apiKey,
//         'X-App-Access-Sig': `Signature ${apiKey}:${signature}`,
//         'X-App-Access-Ts': timestamp,
//         'Content-Type': 'application/json',
//     },
// };



// function makeSignature()


// console.log(message);
// console.log(signature);
// console.log(signature.toString(16).toLowerCase());
console.log(timestamp);

axios.post(`https://api.sumsub.com/resources/accessTokens?userId=${userId}&levelName=${levelName}`, null, {
    headers: {
        'Content-Type': 'application/json',
        'X-App-Token': apiKey,
        'X-App-Access-Sig': xAppSignature,
        'X-App-Access-Ts': timestamp,
        'Authorization': `Bearer ${jwtToken}`
    },
}).then(data => console.log(data.response.data)).catch(err => console.log(err.response.data));

// axios.get(`https://api.sumsub.com/resources/status/api`, {
//     headers: {
//         'X-App-Token': apiKey,
//         'X-App-Access-Sig': signature,
//         'X-App-Access-Ts': timestamp,
//         'Content-Type': 'application/json',
//     },
// }).then(data => console.log(data)).catch(err => console.log(err.response.data));

// const req = https.request(options, (res) => {
//     console.log(`statusCode: ${res.statusCode}`);
//     res.on('data', (d) => {
//         process.stdout.write(d);
//     });
// });

// req.on('error', (error) => {
//     console.error(error);
// });

// req.end();