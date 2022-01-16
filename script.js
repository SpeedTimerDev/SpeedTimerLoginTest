const firebaseConfig = {
    apiKey: "AIzaSyDGyliCvD8UjUOAphjguLLuH55E-Y4r9Uo",
    authDomain: "turnkey-agility-338113.firebaseapp.com",
    databaseURL: "https://turnkey-agility-338113-default-rtdb.firebaseio.com",
    projectId: "turnkey-agility-338113",
    storageBucket: "turnkey-agility-338113.appspot.com",
    messagingSenderId: "796393754460",
    appId: "1:796393754460:web:ab34cf0f23a5bda3acbb99",
    measurementId: "G-R75G7P7N72"
};

firebase.initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl,
        userString: "new user string"
    });
}

function setSpecialString(userId, specialString) {
    firebase.database().ref('users/' + userId).update({
        userString: specialString
    });
}