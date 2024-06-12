document.addEventListener("DOMContentLoaded", function() {
    const nameLabel = document.getElementById("nameLabel");
    const ageLabel = document.getElementById("ageLabel");
    const genderLabel = document.getElementById("genderLabel");
    const profilePictureInput = document.getElementById("profile_picture");
    const pic = document.getElementById("picLabel");

    const username = localStorage.getItem("username");
    

    //get the name age and gender and profile pic if assigned

    profilePictureInput.addEventListener("change", function() {
        pic.style.display = "none";
        profile_picture_preview.style.display = "";
    
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const profilePicturePreview = document.getElementById("profile_picture_preview");
                profilePicturePreview.src = e.target.result;
                profilePicturePreview.style.display = "block"; // Show the <img> tag
            }
            reader.readAsDataURL(file);
        }
    });
});


const userDetails = ()=>{

}

const convertBase64 = (image)=>{

}

async function getData(username) {
    try {
        const querySnapshot = await db.collection("users").get();
        let isValidUser = false;
        
        querySnapshot.forEach((doc) => {
            const userData = doc.data();



        });

    } catch (e) {
        console.error("Error getting data: ", e);
    }
}