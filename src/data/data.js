import userData from "./TestData/sample_userdata.json" assert { type: "json" };

// returns data from json in the following format:
// getData("grades/Subject-Id") => [{"grade":4...},{"grade":...}]
function getData(json_key) {
  const path = json_key.split("/");
  let data = userData;

  for (const key of path) {
    data = data[key];
    if (data === undefined) return undefined;
  }

  return data;
}

function writeData(json_key, value) {
	const path = json_key.split("/")
	let data = userData;

	for (let i = 0; i < path.length - 1; i++) {
		data = data[path[i]]
		if (data === undefined) return undefined
	}

	data[path[path.length - 1]] = value
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   // PL
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   // [{
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //     "date": "2020-03-05",
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //     "title": "Szar (karót) kaptál öcsi",
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //     "ref": {jegy object},
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //     "class": "Töri"
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //   },
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   // {
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //     "date": "2022-11-67",
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //     "title": "Házi feladat",
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //     "ref": {hf object},
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //     "class": "Töri"
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   //   }
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //   // ]

function getNotifyList(filter = (e) => true) {
  const data = userData; // userData = your JSON object
  let msg_list = [];

  for (const [classId, grades] of Object.entries(data.grades)) {
    grades.forEach(g => {
      msg_list.push({
        date: g.date,
        class: classId,
        title: `New grade: ${g.description}`,
        ref: { grade: g.grade, weight: g.weight }
      });
    });
  }

  data.homework.forEach(hw => {
    msg_list.push({
      date: hw.assigned_date,
      class: hw.class_id,
      title: `Homework assigned: ${hw.description}`,
      ref: { deadline: hw.deadline }
    });
  });

  data.omissions.forEach(o => {
    msg_list.push({
      date: o.date,
      class: o.class_id,
      title: `Class absence: ${o.is_justified ? "Justified" : "Unjustified"}`,
      ref: { is_justified: o.is_justified }
    });
  });

  for (const msg of Object.values(data.massages)) {
    msg_list.push({
      date: msg.date,
      class: "Message",
      title: msg.title,
      ref: { message: msg.message }
    });
  }

  return msg_list.filter(filter);
}


export { getData, writeData, getNotifyList };