// Пример получения баланса через апи glolime

const { dnevnik2, glolime } = require('../index');

const dnevnik = new dnevnik2();
const golime = new glolime();

const email = "email";
const password = "password";

async function main(){
  await dnevnik.login(email, password);
  let child_data = await dnevnik.get_journal_person_related_child_list(1);
  let edu_id = child_data.items[0].educations[0].education_id; // берем первого ученика из списка и первое учереждение из списка
  let iframe = await dnevnik.get_journal_fps_list(1,1,edu_id);
  let balance = await golime.getBalance_frameData(iframe.iframe[0].frameData);

  console.log(`Горячее питание: ${balance.hot_feed}`);
  console.log(`Буффет: ${balance.cafeteria}`);
  console.log(`Перевыпуск карты: ${balance.card_update}`);
  console.log(`SMS-оповещения: ${balance.sms_warns}`);
  console.log(`Выпуск браслета: ${balance.bracelet}`);
  console.log(`Мобильное приложение: ${balance.mobile_app}`);
}

main();
