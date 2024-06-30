const username = document.getElementById("username");
const password = document.getElementById("password");
const si = document.getElementById("sii");

if (localStorage.getItem("username") != null) {
    //TODOs uncomment later
    // window.location.href = "./profile/profile.html"
}





async function getData(username, password) {

    const userDocRef = db.collection("users").doc(username);

    const userDocSnap = await userDocRef.get();

    return userDocSnap.data().password == password ? true : false;

}

si.addEventListener("click", async () => {

    const result = await getData(username.value, password.value);

    if (result) {
        localStorage.setItem("username", username.value);

        //check if profile is already filled

        const username = username.value; // Replace with the actual username

        const userDocRef = db.collection("Profile").doc(username);

        userDocRef.get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    console.log("No such document!");
                    window.location.href = "./profile/profile.html";

                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });




    } else {
        alert("Invalid username or password");
    }
});

