// Пример использования метода get_api()

const { dnevnik2 } = require('../index')

const dnevnik = new dnevnik2()

const email = "email"
const password = "password"
const p_educations = 1

// получим информацию об учителях
async function main(){
  await dnevnik.login(email, password)
  let teachers = await dnevnik.get_api("api/journal/teacher/list", `p_page=1&p_educations=${p_educations}`)
  console.log(teachers)
}

main()