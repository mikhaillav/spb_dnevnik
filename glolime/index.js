/**
 * @file Получение информации с сайта glolime.
 * @module glolime
 * @author mikhaillav <github.com/mikhaillav>
*/

const axios = require('axios')
const cheerio = require('cheerio')
const iconv = require('iconv-lite');

class glolime {

    /**
     * Запрос на school.glolime.ru/acquiring/searchbypaymentnumber/acquier/
     * 
     * Возвращает ссылку на оплату 
     * @param {Number} type 1 - горячее, 2 - буфет
     * @param {Number} usernumber 
    */
    getNumberID_frameData(frameData){
        return axios.get(`https://school.glolime.ru/api/netrika/userinfo/?${frameData}`,{ responseType: 'arraybuffer' })
        .then(response => {    
            data = iconv.decode(response.data, 'windows-1251');

            const balance = cheerio.load(data);
            let str = balance('.document-list').find(balance('td'))[0].children[0].data
            
            return str  
        })
        .catch(error => {
            console.log(error)
            throw "Something went wrong by getting school.glolime.ru/api/netrika/transfer/create/";
        });
    }

    /**
     * Запрос на school.glolime.ru/acquiring/searchbypaymentnumber/acquier/
     * 
     * Возвращает ссылку на оплату 
     * @param {Number} type 1 - горячее, 2 - буфет
     * @param {Number} usernumber 
    */
    addMoney(type, usernumber){
        return `https://school.glolime.ru/acquiring/searchbypaymentnumber/acquier/?type=${type}&usernumber=${usernumber}`
    }

    /**
     * Запрос на school.glolime.ru/api/netrika/transfer/create/
     * 
     * Дает возможность сделать перевод со счета на счет
     * @param {Number} sourceAccount номер аккаунта откуда переводить (отсчет с еденицы)
     * @param {Number} destinationAccount номер аккаунта куда переводить (отсчет с еденицы)
     * @param {Number} sum сумма перевода в рублях 
     * @param {Number} merch_gmt 
     * @param {String} merch_url 
     * @param {String} nonce 
     * @param {Number} suid
     * @param {Number} timestamp 
     * @param {String} token
     * @param {String} zsign
    */
    transferMoney(sourceAccount, destinationAccount, sum, merch_gmt, merch_url, nonce, suid, timestamp, token, zsign){
        return axios.get(`https://school.glolime.ru/api/netrika/transfer/create/?sourceAccount=${sourceAccount}&destinationAccount=${destinationAccount}&sum=${sum}&merch_gmt=${merch_gmt}&merch_url=${merch_url}&nonce=${nonce}&suid=${suid}&timestamp=${timestamp}&token=${token}&zsign=${zsign}`)
        .then(response => {    })
        .catch(error => {
            console.log(error)
            throw "Something went wrong by getting school.glolime.ru/api/netrika/transfer/create/";
        });
    }

    /**
     * Запрос на school.glolime.ru/api/netrika/transfer/create/
     * 
     * Дает возможность сделать перевод со счета на счет
     * @param {String} frameData строка query-запроса, но в апи называется frameData  
    */
    transferMoney_frameData(frameData){
        return axios.get(`https://school.glolime.ru/api/netrika/transfer/create/?${frameData}`)
        .then(response => {    })
        .catch(error => {
            console.log(error)
            throw "Something went wrong by getting school.glolime.ru/api/netrika/transfer/create/";
        });
    }


    /**
     * Запрос на school.glolime.ru/api/netrika/account/
     * 
     * Возвращает информацию о балансе питания.
     * @param {Number} merch_gmt 
     * @param {String} merch_url 
     * @param {String} nonce 
     * @param {Number} suid
     * @param {Number} timestamp 
     * @param {String} token
     * @param {String} zsign
    */
    getBalance(merch_gmt, merch_url, nonce, suid, timestamp, token, zsign){
        return axios.get(`https://school.glolime.ru/api/netrika/account/?merch_gmt=${merch_gmt}&merch_url=${merch_url}&nonce=${nonce}&suid=${suid}&timestamp=${timestamp}&token=${token}&zsign=${zsign}`,{ responseType: 'arraybuffer' })
        .then(response => {
            data = iconv.decode(response.data, 'windows-1251');

            const balance = cheerio.load(data);
            let str = balance('.document-list').find(balance('tbody')).find(balance('.textalign-right'))

            return {
                hot_feed: str[0].children[0].data,
                cafeteria: str[1].children[0].data,
                card_update: str[2].children[0].data,
                sms_warns: str[3].children[0].data,
                bracelet: str[4].children[0].data,
                mobile_app: str[5].children[0].data
            }  
        })
        .catch(error => {
            console.log(error)
            throw "Something went wrong by getting school.glolime.ru/api/netrika/account";
        });
    }

    /**
     * Запрос на school.glolime.ru/api/netrika/account/
     * 
     * Возвращает информацию о балансе питания.
     * @param {String} frameData строка query-запроса, но в апи называется frameData  
    */
    getBalance_frameData(frameData){
        return axios.get(`https://school.glolime.ru/api/netrika/account/?${frameData}`, { responseType: 'arraybuffer' })
        .then(response => {
            data = iconv.decode(response.data, 'windows-1251');

            const balance = cheerio.load(data);
            let str = balance('.document-list').find(balance('tbody')).find(balance('.textalign-right'))

            return {
                hot_feed: str[0].children[0].data,
                cafeteria: str[1].children[0].data,
                card_update: str[2].children[0].data,
                sms_warns: str[3].children[0].data,
                bracelet: str[4].children[0].data,
                mobile_app: str[5].children[0].data
            }  
        })
        .catch(error => {
            console.log(error)
            throw "Something went wrong by getting school.glolime.ru/api/netrika/account via frameData";
        });
    }
}


module.exports = { glolime }