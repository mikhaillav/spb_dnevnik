# spb_dnevnik
Клиент для [электронного дневника](https://dnevnik2.petersburgedu.ru/) Санкт-Петербурга. 

- [Документация](#документация)

## Документация
- **login(email,password) - Вход в дневник, получение токена.**
```js
/**
 * Запрос на api/user/auth/login.
 * @param {String} email 
 * @param {String} password 
*/
dnevnik.login(email, password).then(() => {
  //код
})
```

- **get_journal_institution_related_jurisdiction_list(p_page) - Возвращает информацию о районе.**
```js
/**
 * Запрос на api/journal/institution/related-jurisdiction-list.
 * @param {Number} p_page номер страницы
*/
dnevnik.get_journal_institution_related_jurisdiction_list(p_page).then((data) => {
  console.log(data)
})
```

- **get_journal_institution_related_institution_list(p_page, p_jurisdictions) - Возвращает информацию о школе.**
```js
/**
 * Запрос на api/journal/institution/related-institution-list.
 * @param {Number} p_page номер страницы
 * @param {Number} p_jurisdictions айди района
*/
dnevnik.get_journal_institution_related_institution_list(p_page, p_jurisdictions).then((data) => {
  console.log(data)
})
```

- **get_journal_group_related_group_list(p_page, p_jurisdictions, p_institutions) - Возвращает информацию о классе.**
```js
/**
 * Запрос на api/journal/group/related-group-list.
 * @param {Number} p_page номер страницы
 * @param {Number} p_jurisdictions айди района
 * @param {Number} p_institutions айди школы
*/
dnevnik.get_journal_group_related_group_list(p_page, p_jurisdictions, p_institutions).then((data) => {
  console.log(data)
})
```

- **get_journal_person_related_person_list(p_page, p_jurisdictions, p_institutions, p_groups) - Возвращает информацию о ученике.**
```js
/**
 * Запрос на api/journal/person/related-person-list.
 * @param {Number} p_page номер страницы
 * @param {Number} p_jurisdictions айди района
 * @param {Number} p_institutions айди школы
 * @param {Number} p_groups айди класса
*/
dnevnik.get_journal_person_related_person_list(p_page, p_jurisdictions, p_institutions, p_groups).then((data) => {
  console.log(data)
})
```

- **get_journal_lesson_list_by_education(p_page, p_datetime_from, p_datetime_to, p_educations) - Возвращает информацию о предметах за период.**
```js
/**
 * Запрос на api/journal/lesson/list-by-education.
 * @param {Number} p_page номер страницы
 * @param {String} p_datetime_from дата и время начала периода (DD.MM.YYYY HH:MM:SS)
 * @param {String} p_datetime_to дата и время конца периода (DD.MM.YYYY HH:MM:SS)
 * @param {Number} p_educations айди ученика
*/
dnevnik.get_journal_lesson_list_by_education(p_page, p_datetime_from, p_datetime_to, p_educations).then((data) => {
  console.log(data)
})
```

- **get_journal_estimate_table(p_educations, p_date_from, p_date_to, p_limit, p_page) - Возвращает информацю об оценках за период.**
```js
/**
 * Запрос на api/journal/estimate/table.
 * @param {Number} p_educations айди ученика
 * @param {String} p_date_from дата и время начала периода (DD.MM.YYYY HH:MM:SS)
 * @param {String} p_date_to дата и время конца периода (DD.MM.YYYY HH:MM:SS)
 * @param {Number} p_limit_ лимит оценок
 * @param {Number} p_page номер страницы
*/
dnevnik.get_journal_estimate_table(p_educations, p_date_from, p_date_to, p_limit = 1, p_page = 1).then((data) => {
  console.log(data)
})
```
