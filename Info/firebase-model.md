# Firestore adatmodell (KretaKopi)

## Áttekintés
Fő collectionök:
- absences
- grades
- rooms
- schools
- students
- subjects
- teachers
- timetable
- users

---

## Konvenciók
- ID mezők: `studentId`, `teacherId`, `subjectId`, `schoolId`, `roomId`, `uId`
- `date`: timestamp jelölő
- `viewed`: boolean jelölő, hogy a felhasználó látta-e


---

## Collection: `absences`
### Document (példa)
Mezők:
- `date` (timestamp, kötelező) — hiányzás dátuma
- `justified` (boolean, kötelező) — igazolt-e
- `lessons` (number, kötelező) — hány óráról hiányzott
- `studentId` (string, kötelező)
- `viewed` (boolean, kötelező) — megtekintve
- `note` (string, opcionális)
---

## Collection: `grades`
### Document (példa)
Mezők:
- `teacherId` (string, kötelező)
- `date` (timestamp, kötelező) — jegy dátuma
- `studentId` (string, kötelező)
- `subjectId` (string, kötelező)
- `type` (string, kötelező) — pl. "dolgozat" / "felelet" / "házi" 
- `value` (number, kötelező) — pl. 1–5
- `viewed` (boolean, kötelező) — megtekintve
- `weight` (number, kötelező) — súlyozás (pl. 100)
- `note` (string, opcionális)

---

## Collection: `rooms`
### Document (példa)
Mezők:
- `capacity` (number, kötelező) - terem kapacitása
- `floor` (number, kötelező) - emelet
- `name` (string, opcionális) - pl. A105
- `schoolId` (string, kötelező)

---

## Collection: `schools`
### Document (példa)
Mezők:
- `OMnumber` (number, kötelező) — intézmény OM azonosító
- `address` (string, kötelező)
- `city` (string, kötelező)
- `postAddress` (number, kötelező)
- `email` (string, kötelező)
- `name` (string, kötelező)

---

## Collection: `students`
### Document (példa)
Mezők:
- `OMnumber` (number, kötelező) — diák OM azonosító
- `class` (string, kötelező) — pl. "9a "
- `firstName` (string, kötelező) - keresztnév
- `lastName` (string, kötelező) - vezetéknév
- `schoolId` (string, kötelező)
- `uId` (string, kötelező)

---

## Collection: `subjects`
### Document (példa)
Mezők:
- `name` (string, kötelező)
- `weeklyHours` (number, opcionális)
- `schoolId` (string, kötelező)

---

## Collection: `teachers`
### Document (példa)
Mezők:
- `OMnumber` (number, kötelező) - tanár OM azonosító
- `email` (string, kötelező)
- `firstName` (string, kötelező)
- `lastName` (string, kötelező)
- `schoolId` (string, kötelező)
- `subjectIds` (string[], kötelező) - akár több tantárgyat is taníthat
- `uId` (string, kötelező)


---

## Collection: `timetable`
### Document (példa)
Mezők:
- `class` (string, kötelező) — pl. "11c"
- `day` (string, kötelező) — pl. "Monday" / "Hétfő"
- `lessonNumber` (number, opcionális) — 1..n
- `roomId` (string, kötelező)
- `schoolId` (string, kötelező)
- `subjectId` (string, kötelező)
- `teacherId` (string, kötelező)



---

## Collection: `users/{uid}`
### Document (példa)
Cél: Auth + jogosultságok a Rules számára.

- `role` ("student" | "teacher" | "admin", kötelező!)
- `schoolId` (string, kötelező)
- `studentId` (string, opcionális, kötelező)
- `teacherId` (string, opcionális, kötelező)

