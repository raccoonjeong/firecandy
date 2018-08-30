
var admin = require("firebase-admin");
var serviceAccount = require("./hscandy-b0a6d-firebase-adminsdk-a3uqc-24bfed7030.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hscandy-b0a6d.firebaseio.com"
});
var registrationToken = "etUg8xrpRPg:APA91bEaP6nsbUKjfKVpDdMpsAjEwkHlLwm1dU5OZcLzy8Sz4lLu3zf-cPTbX2WgDzSnkw4yRo8ZV59ETqqnrNOcKc-olgHcBQSBCjj6GDL0Y4x7a3q-x4mTNB07syvr52JNrfWgPVSh";

// See documentation on defining a message payload.
var message = {
    data: {
        'title': '이거 좀 재밌을지도..',
        'body': '이거 좀 재밌음..',
        'icon': 'firebase-logo.png',
        'click_action': 'http://localhost:8080'
    },
    token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.

admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });