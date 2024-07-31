import firebase from "@/firebase";

type EditProps = {
  userId: string;
  name: string;
  phoneNumber: number;
  gender: string;
  country: string;
};

export const EditProfileInfo = async ({
  userId,
  name,
  phoneNumber,
  gender,
  country,
}: EditProps) => {
  const profileRef = firebase.firestore().collection("profiles").doc(userId);

  // Fetch the current data of the profile
  const doc = await profileRef.get();
  if (!doc.exists) {
    console.log("Profile does not exist!");
    return;
  }

  // update data
  profileRef
    .update({
      name,
      phoneNumber,
      gender,
      country,
    })
    .then(() => {
      console.log("Profile updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating Profile: ", error);
    });
};

type PropsEditImage = {
  image: File;
  profileId: string;
  oldImage: string;
};

export const updateProfileImage = async ({
  image,
  profileId,
  oldImage,
}: PropsEditImage) => {
  const profileRef = firebase.firestore().collection("profiles").doc(profileId);

  // Fetch the current data of the profile
  const doc = await profileRef.get();
  if (!doc.exists) {
    console.log("Profile does not exist!");
    return;
  }

  const docData = doc.data();
  if (!docData) {
    console.log("No data found in the document!");
    return;
  }

  // Create a reference to the file in Firebase Storage
  const storageRef = firebase.storage().ref();

  if (docData.profileImage) {
    let oldImageSrc;

    // Check if docData.profileImage is a full URL or a path
    try {
      new URL(docData.profileImage);
      // If no error is thrown, docData.profileImage is a full URL
      oldImageSrc = firebase.storage().refFromURL(docData.profileImage);
    } catch (_) {
      // If an error is thrown, docData.profileImage is a path
      oldImageSrc = storageRef.child(docData.profileImage);
    }

    // Delete the old image from Firebase Storage
    oldImageSrc
      .delete()
      .then(() => {
        console.log("Old image deleted successfully!");
        uploadNewImage();
      })
      .catch((error) => {
        console.error("Error deleting old image: ", error);
      });
  } else {
    uploadNewImage();
  }

  function uploadNewImage() {
    const newImageRef = storageRef.child(
      `images/profiles/${profileId}/${image.name}${profileId}`
    );

    // Upload the new image to Firebase Storage
    newImageRef.put(image).then((snapshot) => {
      console.log(`Uploaded a ${image.name} image!`);

      // Get the download URL of the image and update the profile
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        profileRef
          .update({
            profileImage: downloadURL,
          })
          .then(() => {
            console.log("Profile updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating profile: ", error);
          });
      });
    });
  }
};
