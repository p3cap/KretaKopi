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

// Returns a list of formatted notifiction massages between from_date and to_date
// from data entries: grades, homework, exams, omissions
function getNotifyList(from_date, to_date) {
  let msg_list = [];
  for (let grd of data["grades"]) {
    let grd_formated = {"date": grd["date"], "description": grd["description"]};
    msg_list.push(grd_formated);
  }
  for (let hwm of data["homework"]) {
    let hwm_formated = {"date": hwm["date"], "description": hwm["description"]};
    msg_list.push(hwm_formated);
  }
  for (let exm of data["exams"]) {
    let exm_formated = {"date": exm["date"], "description": exm["description"]};
    msg_list.push(exm_formated);
  }
  for (let oms of data["omissions"]) {
    let oms_formated = {"date": oms["date"], "description": oms["description"]};
    msg_list.push(oms_formated);
  }
}

export { getDataFromJson, getNotifyList };