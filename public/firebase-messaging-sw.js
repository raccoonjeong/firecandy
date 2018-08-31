// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/4.10.0/firebase-app.js');
importScripts('/__/firebase/4.10.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');




var messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    // const notificationOptions = {
    //     body: 'Background Message body.',
    //     icon: '/images/icon2.jpg'
    // };

    const notificationOptions = {

        body: payload.data.body,
        icon: '/image/truck.jpg',
        actions: [
            {action: 'like', title: 'Like'},
            {action: 'reply', title: 'Reply'}]

    };

    self.addEventListener('notificationclick', function(event) {
        var messageId = event.notification.data;

        event.notification.close();

        if (event.action === 'like') {
            clients.openWindow(payload.data.click_action);
        }
        else if (event.action === 'reply') {
            clients.openWindow(payload.data.click_action);
        }
        else {
            clients.openWindow(payload.data.click_action);
        }
    }, false);



    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});

