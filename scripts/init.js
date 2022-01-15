const firebaseConfig = {
    apiKey: "AIzaSyBoWoW-Sf-_xMSDzWW9P4hVXbQaVtgmEsU",
    authDomain: "speedtimer-6d0f4.firebaseapp.com",
    projectId: "speedtimer-6d0f4",
    storageBucket: "speedtimer-6d0f4.appspot.com",
    messagingSenderId: "464598425013",
    appId: "1:464598425013:web:e0b88e6e4392befddd4dfc"
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

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();

    var userEntity = {
        id: profile.getId(),
        username: profile.getName(),
        email: profile.getEmail(),
        profile_picture: profile.getImageUrl(),
    };

    localStorage.setItem('myUserEntity', JSON.stringify(userEntity));

    afterSignIn(userEntity);
}

// document.getElementById("signoutLink").addEventListener("click", function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         localStorage.removeItem("myUserEntity");
//     });
// });

function afterSignIn(userProfile) {
    var googleProfile = userProfile;

    var check = firebase.database().ref('users').orderByKey().equalTo(googleProfile.id).once("value", function (snapshot) {
        if (snapshot.exists()) {
            let userData, userSpecialString;

            firebase.database().ref("users/" + googleProfile.id).on("value", (snap) => {
                userData = snap.val();
                userSpecialString = userData.userString;
            });
        } else {
            writeUserData(googleProfile.id, googleProfile.username, googleProfile.email, googleProfile.profile_picture);
        }
    });
}