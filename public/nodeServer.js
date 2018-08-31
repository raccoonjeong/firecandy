var admin = require("firebase-admin");
var serviceAccount = require("./hscandy-b0a6d-firebase-adminsdk-a3uqc-24bfed7030.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hscandy-b0a6d.firebaseio.com"
});

var db = admin.database();
var sellerRef = db.ref("candy/seller");
var consumRef = db.ref("candy/consumer");

/*
//그냥 해당경로 데이터 조회하기
sellerRef.on('value', function(snapshot) {
    console.log("밸류..............");
    console.log(snapshot.val());
});
*/

//해당경로에 ADD되면 감지하여 작동
sellerRef.on('child_added', function (data) {
    console.log("ADDED..............");
    console.log(data.val());
    var dbKeyword = data.val().keyword;
    var dbStore = data.val().store;
    console.log("............", dbKeyword);
    console.log("............", dbStore);

    findToken(dbKeyword, dbStore);

});

//추가된 데이터의 키워드로, 그 키워드를 등록한 사용자의 토큰 검색하고 sendMsg 함수 호출
function findToken(key, store) {
    var tokenToReturn = null;
    consumRef.on('value', function (snapshot) {
        console.log("손님별 키워드들..............");
        console.log(snapshot.val());

        var allData = snapshot.val();

        for (tokenToFind in allData) {
            for (keyToFind in allData[tokenToFind]) {
                if (keyToFind === key) {
                    console.log(key+ ", 이 키워드의 토큰은.." + tokenToFind);
                    sendMsg(tokenToFind, store);
                };
            }
        }
    });
}

function sendMsg(token, store) {

    var message = {
        data: {
            'title': store,
            'body': store + " 영업 시작합니다.",
            'icon': 'firebase-logo.png',
            'click_action': 'http://localhost:8080'
        },
        token: token
    };
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

}
