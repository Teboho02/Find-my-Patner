const username = document.getElementById("username");
const profile_name = document.getElementById("profile_name");
const password = document.getElementById("password");
const age = document.getElementById("age");
const gender = document.getElementById("gender");
const createAcc = document.getElementById("createACC");

async function uploadInformation(user) {
    var encrypted = CryptoJS.AES.encrypt(user.password, "star").toString();


    try {

        const usernameSnapshot = await db.collection("users").doc(user.username).get();
        if (usernameSnapshot.exists) {
          console.log("Username already exists");
          return;
        }


        const docRef = await db.collection("users").doc(user.username).set({
            username: user.username,
            profile_name: user.profile_name,
            password: encryptData(user.password),
            age: user.age,
            gender: user.gender
        });
        

        alert("account created successfully");
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    try {
        const docRef = await db.collection("userInfo").doc(user.username).set({
            profile_name: user.profile_name,
            picture : ""
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

createAcc.addEventListener("click", function() {
    if (!firebase.apps.length) {
        console.error("Firebase is not initialized!");
    } else {
        console.log("working");
    }


    const user = {
        username: username.value,
        profile_name: profile_name.value,
        password: encryptData(password.value),
        age: age.value,
        gender: gender.value
    };

    uploadInformation(user);
});

  function encryptData(plainText) {
    const encryptedData = CryptoJS.AES.encrypt(plainText, "stillLovekamo").toString();
    return plainText;

}
