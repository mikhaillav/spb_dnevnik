<h1 align="center">
   <b>
        <a>spb_dnevnik</a><br>
    </b>
</h1>

<p align="center">Клиент для <a href = "https://dnevnik2.petersburgedu.ru/">электронного дневника</a> Санкт-Петербурга.</p>

[![npm version](https://img.shields.io/npm/v/spb_dnevnik)](https://www.npmjs.org/package/spb_dnevnik)
[![npm downloads](https://img.shields.io/npm/dm/spb_dnevnik)](https://npm-stat.com/charts.html?package=spb_dnevnik)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/635c7a61ac05477793a254cbb75b5fde)](https://app.codacy.com/gh/mikhaillav/spb_dnevnik/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

-   [Возможности](#возможности)
-   [Установка](#установка)
-   [Документация по апи дневника(WIP)](https://mikhaillav.github.io/dnevnik2_docs/)
-   [Примеры](#примеры)
-   [Спасибо](#спасибо)
-   [Лицензия](#лицензия)

## Возможности
-   Функции названы именем апи, к которому они ведут
-   Каждый метод задокументирован по стандартам JSdoc
-   Поддержка платежки glolime (оплата еды в столовой)
   
## Установка
``` 
npm i spb_dnevnik
```
## Примеры
```js
const { dnevnik2 } = require("spb_dnevnik")

//получение айди ученика
async function getEducationID(){
   await dnevnik.login(email, password) // логин в дневнике
   let childs = await dnevnik.get_journal_person_related_child_list(1) // получение списка детей
   return childs.items[0].educations[0].education_id // возвращаем значение айди у первого ученика
}

console.log(getEducationID()) // вернет ваш айди

```

[больше примеров](examples/)

## Спасибо
Отдельное спасибо этим ребятам
-   https://github.com/romanrakhlin/dnevnik-spb за идею с ботом
-   https://github.com/newtover/dnevnik за примеры авторизации и использования апи

## Лицензия

[GPL-3.0](https://ru.wikipedia.org/wiki/GNU_General_Public_License#GPL_v3)
