// translation dictionaries
// (written in js instead of json to allow comments)

// ideas: slang HU?, custom language maker?
const translationDictonary = {
  "HU": {
		/// GENERAL ///
    // days
    "monday": "Hétfő",
    "tuesday": "Kedd",
    "wednesday": "Szerda",
    "thursday": "Csütörtök",
    "friday": "Péntek",
    "saturday": "Szombat",
    "sunday": "Vasárnap",
    // months
    "january": "Január",
    "february": "Február",
    "march": "Március",
    "april": "Április",
    "may": "Május",
    "june": "Június",
    "july": "Július",
    "august": "Augusztus",
    "september": "Szeptember",
    "october": "Október",
    "november": "November",
    "december": "December",
    // school specific
    "class": "Osztály",
    "grade": "Jegy",
    "subject": "Tantárgy",
    "teacher": "Tanár",
    "student": "Diák",
    "timetable": "Órarend",
		"evaluations": "Értékelések",
		"omissions": "Hiányzások",
    "room": "Terem",
    "absence": "Hiányzás",
    "semester": "Félév",
    "exam": "Dolgozat",
    "homework": "Házi feladat",
    // UI actions
    "settings": "Beállítások",
    "save": "Mentés",
    "cancel": "Mégse",
    "edit": "Szerkesztés",
    "delete": "Törlés",
    "close": "Bezárás",
    "loading": "Betöltés...",
    "error": "Hiba",
    "success": "Siker",
		"home_page": "Kezdőlap",

		/// SCHOOL STUFF ///
		// marks
		"mark_1": "Elégséges",
		"mark_2": "Elégséges",
		"mark_3": "Közepes",
		"mark_4": "Jó",
		"mark_5": "Jeles",
		"normal_mark": "Normál jegy",

		
		
		/// NOTIFICATIONS ///
    "grade_notification_msg": "{user} új értékelést kapott ({grade}) {subject} tantárgyból",

		/// INFO ///

		/// HEADERS, TITLES, ETC. ///
		"app_title": "KrétaKopi",

  },
  "EN": {
		/// GENERAL ///
    // days
    "monday": "Monday",
    "tuesday": "Tuesday",
    "wednesday": "Wednesday",
    "thursday": "Thursday",
    "friday": "Friday",
    "saturday": "Saturday",
    "sunday": "Sunday",
    // months
    "january": "January",
    "february": "February",
    "march": "March",
    "april": "April",
    "may": "May",
    "june": "June",
    "july": "July",
    "august": "August",
    "september": "September",
    "october": "October",
    "november": "November",
    "december": "December",
    // school specific
    "class": "Class",
    "grade": "Grade",
    "subject": "Subject",
    "teacher": "Teacher",
    "student": "Student",
    "timetable": "Timetable",
		"evaluations": "Evaluations",
		"omissions": "Omissions",
    "room": "Room",
    "absence": "Absence",
    "semester": "Semester",
    "exam": "Exam",
    "homework": "Homework",
    // UI actions
    "settings": "Settings",
    "save": "Save",
    "cancel": "Cancel",
    "edit": "Edit",
    "delete": "Delete",
    "close": "Close",
    "loading": "Loading...",
    "error": "Error",
    "success": "Success",

		/// SCHOOL STUFF ///
		// marks
		"mark_1": "Failing",
		"mark_2": "Sufficient",
		"mark_3": "Average",
		"mark_4": "Good",
		"mark_5": "Excellent",

    /// NOTIFICATIONS ///
    "grade_notification_msg": "{user} got a new mark ({grade}) from {subject} class",

		/// HEADERS, TITLES, ETC. ///
		"app_title": "ChalkCopi",
  }
}

export default translationDictonary;