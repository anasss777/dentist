import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { Tip } from "@/types/tips";

type Props = {
  tipTitle: string;
  content: string;
  tipImage?: File;
};

export const addTip = async ({ tipTitle, content, tipImage }: Props) => {
  let newTipRef = firebase.firestore().collection("tips").doc();

  await newTipRef.set({
    tipId: newTipRef.id,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    tipTitle,
    content,
  });

  if (tipImage) {
    // Create a reference to the file in Firebase Storage
    let timestamp = new Date().getTime();
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `images/tips/${tipImage.name}${timestamp}`
    );

    // Upload image to Firebase Storage
    newImageRef.put(tipImage).then((snapshot) => {
      console.log(`Uploaded a ${tipImage.name} image!`);

      // Get the download URL of the image and update the tip in Firestore
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        newTipRef
          .update({
            tipImage: downloadURL,
          })
          .then(() => {
            console.log("Tip image updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating tip image: ", error);
          });
      });
    });
  }
};

type EditProps = {
  tipId: string;
  tipTitle: string;
  content: string;
  tipImage?: File;
  oldTipImage?: string;
};

export const EditTip = async ({
  tipId,
  tipTitle,
  content,
  tipImage,
  oldTipImage,
}: EditProps) => {
  const tipRef = firebase.firestore().collection("tips").doc(tipId);

  // Fetch the current data of the tip
  const doc = await tipRef.get();
  if (!doc.exists) {
    console.log("Tip does not exist!");
    return;
  }

  if (tipImage) {
    // Create a reference to the file in Firebase Storage
    let timestamp = new Date().getTime();
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `images/tips/${tipImage.name}${timestamp}`
    );

    // Upload the new image to Firebase Storage
    newImageRef.put(tipImage).then((snapshot) => {
      console.log(`Uploaded a ${tipImage.name} image!`);

      // Delete tip's old image from Firebase Storage
      if (oldTipImage) {
        firebase
          .storage()
          .refFromURL(oldTipImage)
          .delete()
          .then(() => {
            console.log(
              "Tip's old image deleted successfully from Firebase Storage!"
            );
          })
          .catch((error: any) => {
            console.log(
              "Error deleting old image from Firebase Storage: ",
              error
            );
          });
      }

      // Get the download URL of the image and update the tip in Firestore
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        tipRef
          .update({
            tipImage: downloadURL,
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

  // update data
  tipRef
    .update({
      tipTitle,
      content,
    })
    .then(() => {
      console.log("Tip updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating tip: ", error);
    });
};

export const deleteTip = (tip: Tip) => {
  const tipRef = firebase.firestore().collection("tips").doc(tip.tipId);

  tipRef
    .get()
    .then(async (doc: firebase.firestore.DocumentSnapshot) => {
      if (doc.exists) {
        const commentsIds = doc
          ?.data()
          ?.comments?.map((comment: Comment) => comment.id);
        const commentsRefs = commentsIds?.map((commentId: string) =>
          firebase.firestore().doc(`comments/${commentId}`)
        );

        // Delete each comment
        if (commentsRefs) {
          commentsRefs.forEach(
            (commentRef: firebase.firestore.DocumentReference) => {
              commentRef
                .delete()
                .then(() => {
                  console.log("Comment deleted successfully.");
                })
                .catch((error: any) => {
                  console.error("Error deleting comment: ", error);
                });
            }
          );
        }

        // Delete tip's image from Firebase Storage
        firebase
          .storage()
          .refFromURL(tip.tipImage)
          .delete()
          .then(() => {
            console.log(
              "Tip's image deleted successfully from Firebase Storage!"
            );
          })
          .catch((error: any) => {
            console.log("Error deleting image from Firebase Storage: ", error);
          });

        // Delete tip from Firestore
        tipRef
          .delete()
          .then(() => {
            console.log("Tip deleted successfully.");
          })
          .catch((error: any) => {
            console.error("Error deleting tip: ", error);
          });
      } else {
        console.log("No such document!");
      }
    })
    .catch((error: any) => {
      console.log("Error getting document:", error);
    });
};
