/**
 * @file Получение информации с дневника.
 * @module dnevnik2
 * @author mikhaillav <github.com/mikhaillav>
*/

const axios = require("axios")
const { glolime } = require("./glolime")

/** Класс дневника */
class dnevnik2 {
	constructor() {
		this.headers ={ 
			headers : {
				"Cookie": ""
			}
		}
	}

	/**
	 * Запрос на api/user/auth/login.
	 * 
	 * Вход в дневник, получение токена.
	 * @param {String} email 
	 * @param {String} password 	
	 */
	async login(email, password){
		await axios.post("https://dnevnik2.petersburgedu.ru/api/user/auth/login",{
			type: "email",
			login: email,
			password: password,
			activation_code: null,
			_isEmpty: false
		})
		.then(response => {
			this.headers["headers"]["Cookie"] = "X-JWT-Token=" + response.data.data.token
		})
		.catch(() => {
			throw "Your password or email probably invalid. Or you try connect api too many times (wait a bit)."
		});
	}

	/**
	 * Вход в дневник, через токен.
	 * @param {String} token 
	 */
	async login_token(token){
		this.headers["headers"]["Cookie"] = "X-JWT-Token=" + token;
	}

	/**
	 * Запрос на указанное апи с указанной query-строкой.
	 * 
	 * Возвращает какую-либо информацию.
	 * @param {String} api путь до апи 
	 * @param {String} [query] query-строка 
	 */
	get_api(api = "", query = "") {
		if(query != "" && !query.startsWith("?")){
			query = "?" + query;
		}
		if(!api.startsWith("api/")){
			api = "api/" + api;
		}

		return axios.get(`https://dnevnik2.petersburgedu.ru/${api}/${query}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw `Something went wrong by getting api/${api}`;
		});
	} 

	/**
	 * Запрос на api/journal/subject/list-studied.
	 * 
	 * Возвращает информацию об изучаемых предметах.
	 * @param {Number} p_limit лимит
	 * @param {Number} p_page номер страницы
	 * @param {Number} p_educations айди ученика
	 * @param {Number} p_groups айди класса
	 * @param {Number} [p_periods] период
	 */
	get_api_journal_subject_list_studied(p_limit, p_page, p_educations, p_groups, p_periods) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/subject/list-studied?p_limit=${p_limit}&p_page=${p_page}&p_educations%5B%5D=${p_educations}&p_groups%5B%5D=${p_groups}&p_periods%5B%5D=${p_periods}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/subject/list-studied";
		});
	} 

	/**
	 * Запрос на api/journal/person/get-classroom-teacher.
	 * 
	 * Возвращает информацию о классном руководителе.
	 * @param {Number} p_groups айди класса
	 */
	get_journal_person_get_classroom_teacher(p_groups) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/person/get-classroom-teacher/${p_groups}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/person/get-classroom-teacher";
		});
	} 

	/**
	 * Запрос на api/cms/banner/list.
	 * 
	 * Возвращает информационные ресурсы.
	 * @param {Number} p_page
	 */
	get_cms_banner_list(p_page) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/cms/banner/list?p_page=${p_page}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/cms/banner/list";
		});
	} 

	/**
	 * Запрос на api/journal/announcement/list-open.
	 * 
	 * Возвращает оповещения.
	 * @param {Number} p_page
	 */
	get_journal_announcement_list_open(p_page) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/announcement/list-open?p_page=${p_page}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/announcement/list-open";
		});
	} 

	/**
	 * Запрос на api/user/permission/get.
	 * 
	 * Возвращает информацию о разрешениях.
	 */
	get_user_permission_get() {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/user/permission/get`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/user/permission/get";
		});
	} 

	/**
	 * Запрос на api/journal/schedule/list-by-education.
	 * 
	 * Возвращает информацю о расписании за период.
	 * @param {Number} p_page номер страницы
	 * @param {String} p_datetime_from дата и время начала периода (DD.MM.YYYY HH:MM:SS)
	 * @param {String} p_datetime_to дата и время конца периода (DD.MM.YYYY HH:MM:SS)
	 * @param {Number} p_educations айди ученика
	 */
	get_journal_schedule_list_by_education(p_page, p_datetime_from, p_datetime_to, p_educations) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/schedule/list-by-education?p_page=${p_page}&p_datetime_from=${p_datetime_from}&p_datetime_to=${p_datetime_to}&p_educations[]=${p_educations}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/schedule/list-by-education";
		});
	} 

	/**
	 * Запрос на api/journal/fps/list.
	 * 
	 * Возвращает информацию о питании.
	 * @param {Number} p_limit лимит для выписок как я понял, но это не точно
	 * @param {Number} p_page номер страницы
	 * @param {Number} p_education айди ученика
	 * 
	 */
	get_journal_fps_list(p_limit, p_page, p_education) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/fps/list?p_limit=${p_limit}&p_page=${p_page}&p_education=${p_education}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/fps/list";
		});
	}

	/**
	 * Запрос на api/group/group/get-list-period.
	 * 
	 * Возвращает информацию о четверти/семестрах.
	 * @param {Number} p_group_ids айди класса
	 * @param {Number} p_page номер страницы
	 * 
	 */
	get_group_group_get_list_period(p_group_ids, p_page) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/group/group/get-list-period?p_group_ids[]=${p_group_ids}&p_page=${p_page}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/group/group/get-list-period";
		});
	}

	/**
	 * Запрос на api/journal/person/related-child-list.
	 * 
	 * Возвращает информацию об ученике.
	 * @param {Number} p_page номер страницы
	 */
	get_journal_person_related_child_list(p_page) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/person/related-child-list?p_page=${p_page}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/person/related-child-list";
		});
	}

	/**
	 * Запрос на api/journal/teacher/list.
	 * 
	 * Возвращает информацию об учителях.
	 * @param {Number} p_page номер страницы
	 * @param {Number} p_educations айди ученика
	 */
	get_journal_teacher_list(p_page, p_educations) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/teacher/list?p_page=${p_page}&p_educations[]=${p_educations}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/teacher/list";
		});
	}

	/**
	 * Запрос на api/journal/person/related-person-list.
	 * 
	 * Возвращает информацию об ученике.
	 * @param {Number} p_page номер страницы
	 * @param {Number} p_jurisdictions айди района
	 * @param {Number} p_institutions айди школы
	 * @param {Number} p_groups айди класса
	 */
	get_journal_person_related_person_list(p_page, p_jurisdictions, p_institutions, p_groups) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/person/related-person-list?p_page=${p_page}&p_jurisdictions[]=${p_jurisdictions}&p_institutions[]=${p_institutions}&p_groups[]=${p_groups}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/person/related-person-list";
		});
	}

	/**
	 * Запрос на api/journal/group/related-group-list.
	 * 
	 * Возвращает информацию о классе.
	 * @param {Number} p_page номер страницы
	 * @param {Number} p_jurisdictions айди района
	 * @param {Number} p_institutions айди школы
	 */
	get_journal_group_related_group_list(p_page, p_jurisdictions, p_institutions) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/group/related-group-list?p_page=${p_page}&p_jurisdictions[]=${p_jurisdictions}&p_institutions[]=${p_institutions}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/group/related-group-list";
		});
	}

	/**
	 * Запрос на api/journal/institution/related-institution-list.
	 * 
	 * Возвращает информацию о школе.
	 * @param {Number} p_page номер страницы
	 * @param {Number} p_jurisdictions айди района
	 */
	get_journal_institution_related_institution_list(p_page, p_jurisdictions) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/institution/related-institution-list?p_page=${p_page}&p_jurisdictions[]=${p_jurisdictions}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/institution/related-institution-list";
		});
	}

	/**
	 * Запрос на api/journal/institution/related-jurisdiction-list.
	 * 
	 * Возвращает информацию о районе.
	 * @param {Number} p_page номер страницы
	 */
	get_journal_institution_related_jurisdiction_list(p_page) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/institution/related-jurisdiction-list?p_page=${p_page}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/institution/related-jurisdiction-list";
		});
	}

	/**
	 * Запрос на api/journal/lesson/list-by-education.
	 * 
	 * Возвращает информацию об уроках за период.
	 * @param {Number} p_page номер страницы
	 * @param {String} p_datetime_from дата и время начала периода (DD.MM.YYYY HH:MM:SS)
	 * @param {String} p_datetime_to дата и время конца периода (DD.MM.YYYY HH:MM:SS)
	 * @param {Number} p_educations айди ученика
	 */
	get_journal_lesson_list_by_education(p_page, p_datetime_from, p_datetime_to, p_educations) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/lesson/list-by-education?p_page=${p_page}&p_datetime_from=${p_datetime_from}&p_datetime_to=${p_datetime_to}&p_educations[]=${p_educations}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/lesson/list-by-education";
		});
	}

	/**
	 * Запрос на api/journal/estimate/table.
	 * 
	 * Возвращает информацю об оценках за период.
	 * @param {Number} p_educations айди ученика
	 * @param {String} p_date_from дата и время начала периода (DD.MM.YYYY)
	 * @param {String} p_date_to дата и время конца периода (DD.MM.YYYY)
	 * @param {Number} p_limit_ лимит оценок
	 * @param {Number} p_page номер страницы
	 */
	get_journal_estimate_table(p_educations, p_date_from, p_date_to, p_limit = 1, p_page = 1) {
		return axios.get(`https://dnevnik2.petersburgedu.ru/api/journal/estimate/table?p_educations[]=${p_educations}&p_date_from=${p_date_from}&p_date_to=${p_date_to}&p_limit=${p_limit}&p_page=${p_page}`,this.headers)
		.then(response => {
			return response.data.data;
		})
		.catch(() => {
			throw "Something went wrong by getting api/journal/estimate/table";
		});
	} 
}

module.exports = { dnevnik2, glolime }