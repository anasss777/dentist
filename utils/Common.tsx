import { DateValue } from "@nextui-org/react";

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

export const getDayOfWeek = (selectedDate: DateValue, locale: string) => {
  const localeString =
    locale === "ar" ? "ar-EG" : locale === "en" ? "en-US" : "tr-TR";
  return selectedDate
    .toDate("gmt")
    .toLocaleDateString(localeString, { weekday: "long" });
};
