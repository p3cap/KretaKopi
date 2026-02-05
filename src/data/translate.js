// dictionary
import translationDictonary from './langDictionary.js'
// functions
import { getData } from './data.js'

// base for {key} based dynamic texts
const baseDynamicTexts = {
  '{user}': getData('student/name') || 'No name',
  '{desc}': 'No desc',
  '{subject}': 'No subject',
  '{grade}': 'No grade',
}

// translates based on dictionary AND replaces placeholders
// usage: translateKey('settings', {"{desc}": "Hablablablablublublubhablublublbublbululu"})
function translateKey(translationKey, dynamicTexts = baseDynamicTexts) {
  const lang = getData('user_settings/language')
  const key = translationDictonary[translationKey]
  let translation = key ? key[lang] : translationKey
  for (const placeholder in baseDynamicTexts) {
    // replace placeholders
    translation = translation.replace(
      placeholder,
      dynamicTexts[placeholder] || baseDynamicTexts[placeholder],
    )
  }

  return translation
}

export { translateKey, baseDynamicTexts }
