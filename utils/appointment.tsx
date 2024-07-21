import firebase from "@/firebase";
import { doc, deleteDoc, getFirestore, getDoc } from "firebase/firestore";
import { Appointment } from "@/types/appointment";

type Props = {
  name: string;
  email: string;
  phoneNumber: number;
  date: Date;
  time: string;
  reason: string;
};

type EditProps = {
  id: string;
  date: Date;
  time: string;
  reason: string;
};

export const addAppointment = async ({
  name,
  email,
  phoneNumber,
  date,
  time,
  reason,
}: Props) => {
  let appointmentRef = firebase.firestore().collection("appointments").doc();

  await appointmentRef
    .set({
      id: appointmentRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name,
      email,
      phoneNumber,
      date,
      time,
      reason,
    })
    .then(() => {
      console.log("Appointment added successfully to Firestore!");
    })
    .catch((error) => {
      console.error("Error adding appointment to Firestore: ", error);
    });
};

export const editAppointment = async ({
  id,
  date,
  time,
  reason,
}: EditProps) => {
  let appointmentRef = firebase.firestore().collection("appointments").doc(id);

  await appointmentRef
    .update({
      date,
      time,
      reason,
    })
    .then(() => {
      console.log("Appointment updated successfully!");
    })
    .catch((error) => {
      console.error("Error updating appointment: ", error);
    });
};

export const deleteAppointment = async (appointment: Appointment) => {
  const appointmentRef = firebase
    .firestore()
    .collection("appointments")
    .doc(appointment.id);

  // Delete appointment from Firestore
  await appointmentRef
    .delete()
    .then(() => {
      console.log("Appointment deleted successfully.");
    })
    .catch((error: any) => {
      console.error("Error deleting appointment: ", error);
    });
};

export const deleteDocIfDatePassed = async (date: Date, docId: string) => {
  const db = getFirestore();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight to compare only the date part

  if (date < today) {
    const docRef = doc(db, "appointments", docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      await deleteDoc(docRef);
      console.log(`Document with ID ${docId} has been deleted.`);
    } else {
      console.log(`Document with ID ${docId} does not exist.`);
    }
  } else {
    console.log(
      `The date has not passed yet. Document with ID ${docId} will not be deleted.`
    );
  }
};
