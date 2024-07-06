import firebase from "@/firebase";

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
