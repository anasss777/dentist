import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { Tip } from "@/types/tips";

type Props = {
  tipTitleAr: string;
  tipTitleEn: string;
  contentAr: string;
  contentEn: string;
  tipImage?: File;
};

export const addTip = async ({
  tipTitleAr,
  tipTitleEn,
  contentAr,
  contentEn,
  tipImage,
}: Props) => {
  let newTipRef = firebase.firestore().collection("tips").doc();

  await newTipRef.set({
    tipId: newTipRef.id,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    tipTitleAr,
    tipTitleEn,
    contentAr,
    contentEn,
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
  tipTitleAr: string;
  tipTitleEn: string;
  contentAr: string;
  contentEn: string;
  tipImage?: File;
  oldTipImage?: string;
};

export const EditTip = async ({
  tipId,
  tipTitleAr,
  tipTitleEn,
  contentAr,
  contentEn,
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
            console.log("tipImage updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating tipImage: ", error);
          });
      });
    });
  }

  // update data
  tipRef
    .update({
      tipTitleAr,
      tipTitleEn,
      contentAr,
      contentEn,
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
        if (tip.tipImage) {
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
              console.log(
                "Error deleting image from Firebase Storage: ",
                error
              );
            });
        }

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

export const AddComment = async (
  tipId: string,
  commenterName: string,
  commentContent: string
) => {
  try {
    let docRefComment = await firebase.firestore().collection("comments").add({
      commentContent,
      commenterName,
    });

    await docRefComment.update({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: docRefComment.id,
    });

    console.log("Document written with ID: ", docRefComment.id);

    await firebase
      .firestore()
      .collection("tips")
      .doc(tipId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(docRefComment),
      });
  } catch (error) {
    console.log("Error adding comment");
  }
};

export const deleteComment = async (tip: Tip, commentId: string) => {
  // Get the comment document
  let docRefComment = firebase
    .firestore()
    .collection("comments")
    .doc(commentId);

  const comment = await docRefComment.get();

  if (!comment?.exists) {
    console.log("No such comment!");
    return;
  }

  // Remove the comment reference from the tip document
  await firebase
    .firestore()
    .collection("tips")
    .doc(tip.tipId)
    .update({
      comments: firebase.firestore.FieldValue.arrayRemove(docRefComment),
    });

  // Delete the comment document
  await docRefComment.delete();

  console.log("Comment deleted with ID: ", commentId);
};

export const reportComment = async (
  comment: Comment,
  tip: Tip,
  reportContent: string
) => {
  try {
    let docRefReport = await firebase.firestore().collection("reports").add({
      comment,
      tip,
      reportContent,
    });

    await docRefReport.update({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: docRefReport.id,
    });

    console.log("Document written with ID: ", docRefReport.id);

    await firebase
      .firestore()
      .collection("comments")
      .doc(comment.id)
      .update({
        reports: firebase.firestore.FieldValue.arrayUnion(docRefReport),
      });
  } catch (error) {
    console.log("Error adding report");
  }
};

export const getReportedCommentsByTip = async (tip: Tip) => {
  let reportedComments: Comment[] = [];
  const commentsIds = tip?.comments?.map((comment) => comment.id);
  const commentsRefs = commentsIds?.map((commentId) =>
    firebase.firestore().doc(`comments/${commentId}`)
  );

  if (commentsRefs) {
    const commentSnaps = await Promise.all(
      commentsRefs.map(async (ref) => await ref.get())
    );

    const commentsData: Comment[] = commentSnaps?.map(
      (commentSnap) => ({ ...commentSnap.data() } as Comment)
    );

    reportedComments = commentsData.filter(
      (cData) => cData.reports && cData.reports?.length > 0
    );
  }

  return reportedComments;
};
