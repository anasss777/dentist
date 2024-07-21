// "use server";

import nodemailer from "nodemailer";

export const getDaysUntilAppointment = (
  appointmentDay: string,
  today: string
): number => {
  // Parse the input strings to Date objects
  const appointmentDate = new Date(appointmentDay);
  const todayDate = new Date(today);

  // Calculate the time difference in milliseconds
  const timeDifference = appointmentDate.getTime() - todayDate.getTime();

  // Calculate the difference in days
  const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Return -1 if the appointment day has passed, otherwise return the day difference
  return dayDifference < 0 ? -1 : dayDifference;
};

export const splitDateTime = (dateTimeString: string): [string, string] => {
  // Split the input string by the comma and trim any whitespace
  const [date, time] = dateTimeString.split(",").map((part) => part.trim());

  // Return the result as a tuple (array with two elements)
  return [date, time];
};

export const getDayOfWeek = (date: number, locale: string) => {
  const daysOfWeek: any = {
    en: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    ar: [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    tr: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],
  };

  const selectedDaysOfWeek = daysOfWeek[locale] || daysOfWeek["en"];
  return selectedDaysOfWeek[date];
};

export const getByLocale = (
  locale: string,
  textAr: string,
  textEn: string,
  textTr: string
) => {
  return locale === "ar" ? textAr : locale === "en" ? textEn : textTr;
};

// export async function sendEmail(
//   to: string,
//   subject: string,
//   text: string
// ): Promise<void> {
//   // Create a transporter object using SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.office365.com", // Replace with your SMTP server address
//     port: 587, // Replace with your SMTP server port
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "email@example.com", // Replace with your SMTP server email
//       pass: "password", // Replace with your SMTP server password
//     },
//   });

//   // Set up email data
//   let mailOptions = {
//     from: '"user name" <email@example.com>', // Sender address
//     to: to, // List of receivers
//     subject: subject, // Subject line
//     text: text, // Plain text body
//   };

//   // Send email
//   try {
//     let info = await transporter.sendMail(mailOptions);
//     console.log("Message sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// }
