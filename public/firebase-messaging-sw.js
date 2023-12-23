importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js"
);

{/* <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js"></script> */}


const firebaseConfig = { 
apiKey: "AIzaSyBNwPmF7CwGPm1I2cvloHklUpVCiZEkIjg",
authDomain: "codepth-challenge.firebaseapp.com",
projectId: "codepth-challenge",
storageBucket: "codepth-challenge.appspot.com",
messagingSenderId: "226387316290",
appId: "1:226387316290:web:efce7ede0fdca024c4a7db",};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});