import firebase from "@/firebase";
import { BeforeAndAfter } from "@/types/beforeAndAfter";
import { Faq } from "@/types/faq";
import { Testimonial } from "@/types/testimonial";

type EditProps = {
  link1: string;
  link2: string;
  link3: string;
};

export const editHighlightSection = async ({
  link1,
  link2,
  link3,
}: EditProps) => {
  const highlightsRef = firebase
    .firestore()
    .collection("highlightsSection")
    .doc("XcK8AedFG8EYkLIANt8o");

  // Fetch the current data of the highlightsSection
  const doc = await highlightsRef.get();
  if (!doc.exists) {
    console.log("highlightsSection does not exist!");
    return;
  }

  // update data
  highlightsRef
    .update({
      link1,
      link2,
      link3,
    })
    .then(() => {
      console.log("highlightsSection's info updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating highlightsSection's info: ", error);
    });
};

export const addTestimonial = async (giver: string, content: string) => {
  let testimonialRef = firebase.firestore().collection("testimonials").doc();

  await testimonialRef
    .set({
      id: testimonialRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      giver,
      content,
    })
    .then(() => {
      console.log("Testimonial added successfully!");
    })
    .catch((error) => {
      console.error("Error adding testimonial: ", error);
    });
};

export const editTestimonial = async (
  id: string,
  giver: string,
  content: string
) => {
  let testimonialRef = firebase.firestore().collection("testimonials").doc(id);

  await testimonialRef
    .update({
      giver,
      content,
    })
    .then(() => {
      console.log("Testimonial updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating testimonial: ", error);
    });
};

export const deleteTestimonial = async (testimonial: Testimonial) => {
  const testimonialRef = firebase
    .firestore()
    .collection("testimonials")
    .doc(testimonial.id);

  // Delete testimonial from Firestore
  await testimonialRef
    .delete()
    .then(() => {
      console.log("Testimonial deleted successfully.");
    })
    .catch((error: any) => {
      console.error("Error deleting testimonial: ", error);
    });
};

export const addFaq = async (question: string, answer: string) => {
  let faqRef = firebase.firestore().collection("faqs").doc();

  await faqRef
    .set({
      id: faqRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      question,
      answer,
    })
    .then(() => {
      console.log("Faq added successfully!");
    })
    .catch((error) => {
      console.error("Error adding Faq: ", error);
    });
};

export const editFaq = async (id: string, question: string, answer: string) => {
  let faqRef = firebase.firestore().collection("faqs").doc(id);

  await faqRef
    .update({
      question,
      answer,
    })
    .then(() => {
      console.log("Faq updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating faq: ", error);
    });
};

export const deleteFaq = async (faq: Faq) => {
  const faqRef = firebase.firestore().collection("faqs").doc(faq.id);

  // Delete faq from Firestore
  await faqRef
    .delete()
    .then(() => {
      console.log("Faq deleted successfully.");
    })
    .catch((error: any) => {
      console.error("Error deleting Faq: ", error);
    });
};

export const addBeforeAndAfter = async (
  beforeImageFile?: File,
  afterImageFile?: File
) => {
  let bnaRef = firebase.firestore().collection("bnas").doc();

  await bnaRef
    .set({
      id: bnaRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log("bna created successfully!");
    })
    .catch((error) => {
      console.error("Error creating bna: ", error);
    });

  if (beforeImageFile) {
    // Create a reference to the file in Firebase Storage
    let timestamp = new Date().getTime();
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `images/beforeImages/${beforeImageFile.name}${timestamp}`
    );

    // Upload image to Firebase Storage
    newImageRef.put(beforeImageFile).then((snapshot) => {
      console.log(`Uploaded a ${beforeImageFile.name} image!`);

      // Get the download URL of the image and update the bnas in Firestore
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        bnaRef
          .update({
            beforeImage: downloadURL,
          })
          .then(() => {
            console.log("Before image added successfully to Firestore.");
          })
          .catch((error) => {
            console.error("Error adding Before image to Firestore: ", error);
          });
      });
    });
  }

  if (afterImageFile) {
    // Create a reference to the file in Firebase Storage
    let timestamp = new Date().getTime();
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `images/afterImages/${afterImageFile.name}${timestamp}`
    );

    // Upload image to Firebase Storage
    newImageRef.put(afterImageFile).then((snapshot) => {
      console.log(`Uploaded a ${afterImageFile.name} image!`);

      // Get the download URL of the image and update the bnas in Firestore
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        bnaRef
          .update({
            afterImage: downloadURL,
          })
          .then(() => {
            console.log("After image added successfully to Firestore.");
          })
          .catch((error) => {
            console.error("Error adding After image to Firestore: ", error);
          });
      });
    });
  }
};

export const editBeforeAndAfter = async (
  id: string,
  beforeImage?: string,
  afterImage?: string,
  beforeImageFile?: File,
  afterImageFile?: File
) => {
  let bnaRef = firebase.firestore().collection("bnas").doc(id);

  if (beforeImageFile) {
    // Create a reference to the file in Firebase Storage
    let timestamp = new Date().getTime();
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `images/beforeImages/${beforeImageFile.name}${timestamp}`
    );

    // Upload the new image to Firebase Storage
    newImageRef.put(beforeImageFile).then((snapshot) => {
      console.log(`Uploaded a ${beforeImageFile.name} image!`);

      // Delete before's old image from Firebase Storage
      if (beforeImage) {
        firebase
          .storage()
          .refFromURL(beforeImage)
          .delete()
          .then(() => {
            console.log(
              "Before's old image deleted successfully from Firebase Storage!"
            );
          })
          .catch((error: any) => {
            console.log(
              "Error deleting before's old image from Firebase Storage: ",
              error
            );
          });
      }

      // Get the download URL of the image and update the bnas in Firestore
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        bnaRef
          .update({
            beforeImage: downloadURL,
          })
          .then(() => {
            console.log("Before's Image updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating Before's Image: ", error);
          });
      });
    });
  }

  if (afterImageFile) {
    // Create a reference to the file in Firebase Storage
    let timestamp = new Date().getTime();
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `images/afterImages/${afterImageFile.name}${timestamp}`
    );

    // Upload the new image to Firebase Storage
    newImageRef.put(afterImageFile).then((snapshot) => {
      console.log(`Uploaded a ${afterImageFile.name} image!`);

      // Delete after's old image from Firebase Storage
      if (afterImage) {
        firebase
          .storage()
          .refFromURL(afterImage)
          .delete()
          .then(() => {
            console.log(
              "After's old image deleted successfully from Firebase Storage!"
            );
          })
          .catch((error: any) => {
            console.log(
              "Error deleting after's old image from Firebase Storage: ",
              error
            );
          });
      }

      // Get the download URL of the image and update the bnas in Firestore
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        bnaRef
          .update({
            afterImage: downloadURL,
          })
          .then(() => {
            console.log("After's Image updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating After's Image: ", error);
          });
      });
    });
  }
};

export const deleteBeforeAndAfter = async (bna: BeforeAndAfter) => {
  const bnaRef = firebase.firestore().collection("bnas").doc(bna.id);

  // Delete before's image from Firebase Storage
  if (bna.beforeImage) {
    firebase
      .storage()
      .refFromURL(bna.beforeImage)
      .delete()
      .then(() => {
        console.log(
          "Before's image deleted successfully from Firebase Storage!"
        );
      })
      .catch((error: any) => {
        console.log(
          "Error deleting Before image from Firebase Storage: ",
          error
        );
      });
  }

  // Delete after's image from Firebase Storage
  if (bna.afterImage) {
    firebase
      .storage()
      .refFromURL(bna.afterImage)
      .delete()
      .then(() => {
        console.log(
          "After's image deleted successfully from Firebase Storage!"
        );
      })
      .catch((error: any) => {
        console.log(
          "Error deleting After image from Firebase Storage: ",
          error
        );
      });
  }

  // Delete bna from Firestore
  await bnaRef
    .delete()
    .then(() => {
      console.log("Bna deleted successfully.");
    })
    .catch((error: any) => {
      console.error("Error deleting Bna: ", error);
    });
};
