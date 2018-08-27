
var admin = require("firebase-admin");
var serviceAccount = require("./hscandy-b0a6d-firebase-adminsdk-a3uqc-24bfed7030.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hscandy-b0a6d.firebaseio.com"
});
var registrationToken = "dRJhr9Lk_Fo:APA91bFNCKBBvvEJnlvQeQxsF1JTxD-0ZtwvEL1f-nCiqMUQvUUImgjkW41tWax-E40luy3Mjf44MtBefNSTm9tFhp44wmIeqL-KamV214hmLG6ftXtoThfsLqlIU0WbcjW6OxFuUCCT";

// See documentation on defining a message payload.
var message = {
    data: {
        'title': '이거 좀 재밌을지도..',
        'body': '이거 좀 재밌음..',
        'icon': 'firebase-logo.png',
        'click_action': 'http://localhost:8081'
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