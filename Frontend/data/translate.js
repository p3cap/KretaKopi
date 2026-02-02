// translation dictionaries
const translationDictonary = {
  "HU": {
    // general
    "monday": "Hétfő",
    "tuesday": "Kedd",
    "wednesday": "Szerda",
    "thursday": "Csütörtök",
    "friday": "Péntek",
    "saturday": "Szombat",
    "sunday": "Vasárnap",
    "class": "osztály",
    "settings": "beállítások",
    "grade": "jegy",

    // notifications
    "grade_notification_msg": "{user} új értékelést kapott ({grade}) {subject} tantárgyból"
  },
  "EN": {
    // general
    "monday": "Monday",
    "tuesday": "Tuesday",
    "wednesday": "Wednesday",
    "thursday": "Thrusday",
    "friday": "Friday",
    "saturday": "Saturday",
    "sunday": "Sunday",
    "class": "Class",
    "settings": "Settings",
    "grade": "Grade",

    // notifications
    "grade_notification_msg": "{user} got a new mark ({grade}) from {subject} class"
  }
}


// functions
import { getDataFromJson } from "./processed_data"

const base_params = {
  "{user}": getDataFromJson("student/name") || "No name",
  "{desc}": "No desc", 
  "{subject}": "No subject", 
  "{grade}": "No grade"
}

// translates based on dictionary AND replaces params
function translateKey(key, params = base_params) {
  let lang = getDataFromJson("user_settings/language") || "EN";
  let translation = translationDictonary[lang][key] || key; // fallback key
  for (const key in base_params) {
    translation = translation.replace(`{${params[key] || key}}`, params[key]); // if key deosnt exits in params
  }
  return translation;
}

export { translateKey };