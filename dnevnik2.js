/**
 * @file Получение информации с дневника.
 * @module dnevnik2
 * @author mikhaillav <github.com/mikhaillav>
*/

const axios = require('axios')
const fs = require('fs')


/** Класс дневника */
class dnevnik2 {
  /**
   * Конструктор класса.
  */
  constructor() {
    this.headers ={ 
      headers : {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:96.0) Gecko/20100101 Firefox/96.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "text/plain",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Cookie": ""
      }
    }
  }

  /**
   * Вход в дневник, получение токена.
   * @param {String} email 
   * @param {String} password 
   */
  async login(email,password){
    await axios.post('https://dnevnik2.petersburgedu.ru/api/user/auth/login',{
      type: "email",
      login: email,
      password: password,
      activation_code: null,
      _isEmpty: false
    })
    .then(response => {
      fs.writeFileSync("token.txt", response.data.data.token)
    })
    .catch(error => {
      throw "Your password or email probably invalid. Or you try connect api too many times (wait a bit)."
    });
  }

  /**
   * Запрос на api/journal/institution/related-institution-list.
   * 
   * Возвращает информацию о школе.
   * @param {String} p_page
   * @param {String} p_jurisdictions
  */
  get_api_journal_institution_related_institution_list(p_page, p_jurisdictions) {
    this.headers['headers']['Cookie'] = 'X-JWT-Token=' + fs.readFileSync("token.txt", 'utf8')
    return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/institution/related-institution-list?p_page=${p_page}&p_jurisdictions[]=${p_jurisdictions}`,this.headers)
    .then(response => {
      return response.data.data
    })
    .catch(error => {
      console.log(error)
      throw "Something went wrong by getting api/journal/institution/related-institution-list";
    });
  }

  /**
   * Запрос на api/journal/institution/related-jurisdiction-list.
   * 
   * Возвращает информацию о районе.
   * @param {String} p_page
  */
  get_api_journal_institution_related_jurisdiction_list(p_page) {
    this.headers['headers']['Cookie'] = 'X-JWT-Token=' + fs.readFileSync("token.txt", 'utf8')
    return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/institution/related-jurisdiction-list?p_page=${p_page}`,this.headers)
    .then(response => {
      return response.data.data
    })
    .catch(error => {
      console.log(error)
      throw "Something went wrong by getting api/journal/institution/related-jurisdiction-list";
    });
  }

  /**
   * Запрос на api/journal/lesson/list-by-education.
   * 
   * Возвращает информацию о предметах за период.
   * @param {Number} p_page 
   * @param {String} p_datetime_from DD.MM.YYYY HH:MM:SS
   * @param {String} p_datetime_to DD.MM.YYYY HH:MM:SS
   * @param {Number} p_educations 
  */
  get_api_journal_lesson_list_by_education(p_page, p_datetime_from, p_datetime_to, p_educations) {
    this.headers['headers']['Cookie'] = 'X-JWT-Token=' + fs.readFileSync("token.txt", 'utf8')
    return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/lesson/list-by-education?p_page=${p_page}&p_datetime_from=${p_datetime_from}&p_datetime_to=${p_datetime_to}&p_educations%5B%5D=${p_educations}`,this.headers)
    .then(response => {
      return response.data.data
    })
    .catch(error => {
      console.log(error)
      throw "Something went wrong by getting api/journal/lesson/list-by-education";
    });
  }

  /**
   * Запрос на api/journal/estimate/table.
   * 
   * Возвращает информацю об оценках за период.
   * @param {Number} p_educations 
   * @param {String} p_date_from DD.MM.YYYY
   * @param {String} p_date_to DD.MM.YYYY
   * @param {Number} p_page 
  */
  get_api_journal_estimate_table(p_educations, p_date_from, p_date_to, p_limit = 1, p_page = 1) {
    this.headers['headers']['Cookie'] = 'X-JWT-Token=' + fs.readFileSync("token.txt", 'utf8')
    return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/estimate/table?p_educations[]=${p_educations}&p_date_from=${p_date_from}&p_date_to=${p_date_to}&p_limit=${p_limit}&p_page=${p_page}`,this.headers)
    .then(response => {
      return response.data.data
    })
    .catch(error => {
      console.log(error)
      throw "Something went wrong by getting api/journal/estimate/table";
    });
  } 
}

module.exports = dnevnik2