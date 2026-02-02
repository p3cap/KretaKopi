import { getData } from "./processed_data"
import languages from "./languges.json" assert { type: "json" };

const base_params = {
  "desc": "No desc", 
  "subject": "No subject", 
  "grade": "No grade" 
}

function translatedKey(key, params = base_params) {
  let lang = getData["user_settings"]["language"]
  let translation = languages[lang][key] || key; // fallback key
  translation.replace("{user}", getData("student/name"))
  translation.replace("{subject}", params["subject"])
  translation.replace("{grade}", params["grade"])
  translation.replace("{desc}", params["desc"])
  return translation;
}

export { translatedKey };