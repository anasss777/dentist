"use client";

import firebase from "@/firebase";
import BeforeAndAfter from "@/components/BeforeAndAfter";
import Faq from "@/components/Faq";
import Contact from "@/components/Home/Contact";
import Hero from "@/components/Home/Hero";
import Highlights from "@/components/Home/Highlights";
import Intro from "@/components/Home/Intro";
import Services from "@/components/Home/Services";
import Testimonial from "@/components/Testimonial";
import Tips from "@/components/Tips";
import { deleteDocIfDatePassed } from "@/utils/appointment";
import { useEffect } from "react";
import { Appointment } from "@/types/appointment";

export default function Home() {
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("appointments")
      .onSnapshot((snapshot) => {
        const newAppointment: Appointment[] = []; // Create a new array to hold updated appointments
        snapshot?.forEach((doc) => {
          const appointmentData = doc.data() as Appointment;
          newAppointment.push({
            id: doc.id,
            ...appointmentData,
          } as Appointment);

          // Call deleteDocIfDatePassed for each document
          deleteDocIfDatePassed(appointmentData.date.toDate(), doc.id);
        });
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <main>
      <Hero />
      <Intro />
      <Services />
      <Highlights />
      <BeforeAndAfter />
      <Tips />
      <Testimonial />
      <Faq />
      <Contact />
    </main>
  );
}
