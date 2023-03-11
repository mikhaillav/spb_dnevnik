const dnevnik2 = require('spb_dnevnik')
let dnevnik = new dnevnik2

dnevnik.login(email,password).then(() => {
  dnevnik.getdays(p_page,p_datetime_from, p_datetime_to, p_educations).then((data) => {
    subjects = []

    data.items.forEach(el => {
      subjects[el.subject_name] = []
    });

    data.items.forEach(el => {

      obj = {
        "Theme": el.content_name,
        "HomeWork": "",
        "Marks": "",
        "Date": el.datetime_to
      }

      if(el.estimates[0] != undefined){
        obj.Marks = el.estimates[0].estimate_value_name
      }

      el.tasks.forEach(ej => {
        obj.HomeWork = ej.task_name
      });

      subjects[el.subject_name].push(obj)
    });
    console.log(subjects)
  })
})