<h1 align="center">
   <b>
        <a>spb_dnevnik</a><br>
    </b>
</h1>

<p align="center">Клиент для <a href = "https://dnevnik2.petersburgedu.ru/">электронного дневника</a> Санкт-Петербурга.</p>

[![npm version](https://img.shields.io/npm/v/spb_dnevnik)](https://www.npmjs.org/package/spb_dnevnik)
[![npm downloads](https://img.shields.io/npm/dm/spb_dnevnik)](https://npm-stat.com/charts.html?package=spb_dnevnik)

- [Возможности](#возможности)
- [Установка](#установка)
- [Документация по апи дневника(WIP)](https://mikhaillav.github.io/dnevnik2_docs/)
- [Примеры](#примеры)
- [Спасибо](#спасибо)
- [Лицензия](#лицензия)

## Возможности
   - Функции названы именем апи, к которому они велут
   - Каждый метод задокументирован по стандартам JSdoc
   - Поддержка платежки glolime (оплата еды в столовой)
## Установка
``` 
npm i spb_dnevnik
```

## Примеры
```js
const { dnevnik2 } = require("spb_dnevnik"); // импорт 

//получение айди ученика
async function getEducationID(){
   await dnevnik.login(email, password) // логин в дневнике
   childs = await dnevnik.get_journal_person_related_child_list(1) // получение списка детей (если родитель) и самого себя (если ученик)
   return childs.items[0].educations[0].education_id // возвращаем значение функции
}

console.log(getEducationID()) // вернет ваш айди

```

## Спасибо
Отдельное спасибо этим ребятам
- https://github.com/romanrakhlin/dnevnik-spb за идею с ботом
- https://github.com/newtover/dnevnik за примеры авторизации и использования апи

## Лицензия

[GPL-3.0](https://ru.wikipedia.org/wiki/GNU_General_Public_License#GPL_v3)
