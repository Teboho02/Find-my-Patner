async function getData() {
  console.log("running");
  try {
    const myUsername = localStorage.getItem("username");
    let req = [];
    let ids = [];
    const querySnapshot = await db.collection("chatInvite").get();

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.to === myUsername && !userData.Accepted) {
        req.push(userData);
        ids.push(doc.id);
      }
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });

    if (req.length > 0) {
      const cardContainer = document.querySelector(".card__content");

      req.forEach(async (userData) => {
        const senderPicture = await getPicture(userData.from);

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = senderPicture; // Set the profile picture URL
        img.style.width = "45px";
        img.style.height = "45px";

        const label = document.createElement("label");
        label.textContent = `${userData.from} has requested to chat with you`;

        const buttonAccept = document.createElement("button");
        buttonAccept.textContent = "Accept";

        buttonAccept.addEventListener("click", async () => {
          console.log("Accepted");
          ids.forEach(async (id) => {
            await update(id);
            await createFirstMessage(userData.from);
          });
          // After accepting, remove the card from UI
          card.remove();
        });

        const buttonReject = document.createElement("button");
        buttonReject.textContent = "Reject";

        buttonReject.addEventListener("click", async () => {
          console.log("Rejected");
          // Perform rejection action if needed, e.g., update status or remove from UI
          // For now, just removing the card
          card.remove();
        });

        card.appendChild(img);
        card.appendChild(label);
        card.appendChild(buttonAccept);
        card.appendChild(buttonReject);

        cardContainer.appendChild(card);
      });
    }
  } catch (e) {
    console.error("Error getting data: ", e);
  }
}

async function getPicture(username) {
  try {
    const querySnapshot = await db.collection("Profile").where("username", "==", username).get();
    let profilePicture = "";
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      profilePicture = userData.profile_picture;
    });
    return profilePicture;
  } catch (e) {
    console.error("Error getting picture: ", e);
    return ""; // Return default picture or handle error as needed
  }
}

async function update(id) {
  try {
    await db.collection("chatInvite").doc(id).update({
      Accepted: true
    });
    console.log("Successfully updated");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}

async function createFirstMessage(to) {
  try {
    await db.collection("Message").add({
      From: localStorage.getItem("username"),
      To: to,
      message: "Chat request accepted",
      time: new Date().toLocaleString() // Example timestamp format
    });
    console.log("Message created successfully");
  } catch (e) {
    console.error("Error creating message: ", e);
  }
}

getData();
