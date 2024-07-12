import firebase from "@/firebase";
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
