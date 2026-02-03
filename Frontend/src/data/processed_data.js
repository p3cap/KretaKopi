import userData from "./sample_userdata.json" assert { type: "json" };

// returns data from json in the following format:
// getData("grades/Subject-Id") => [{"grade":4...},{"grade":...}]
function getDataFromJson(json_key) {
  const path = json_key.split("/");
  let data = userData;

  for (const key of path) {
    data = data[key];
    if (data === undefined) return undefined;
  }

  return data;
}

function editDataFromJson(json_key, value) {
	const path = json_key.split("/")
	let data = userData

	for (let i = 0; i < path.length - 1; i++) {
		data = data[path[i]]
		if (data === undefined) return undefined
	}

	data[path[path.length - 1]] = value
}


// Returns a list of formatted notifiction massages with filtering (eg. date range)
// from data entries: grades, homework, exams, omissions
function getNotifyList(filter = (e) => true) {
  let includeData = [].concat(data["grades"], data["homework"], data["exams"], data["omissions"]);
  let msg_list = [];
  for (let item of includeData) {
    let formatedItem = { //revise, seems useless
      "date": item["date"],
      "title": item["title"],
      "desc": item["desc"],
      "class": item["class"]
    };
    msg_list.push(formatedItem);
  }

  return msg_list.filter(filter);
}

export { getDataFromJson, editDataFromJson, getNotifyList };