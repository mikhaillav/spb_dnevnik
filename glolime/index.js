/**
 * @file Получение информации с сайта glolime.
 * @module glolime
 * @author mikhaillav <github.com/mikhaillav>
*/

const axios = require('axios')
const parse = require('node-html-parser')
const iconv = require('iconv-lite');

class glolime {

    /**
     * Запрос на school.glolime.ru/api/netrika/userinfo/
     * 
     * Возвращает номер счета
     * @param {Number} merch_gmt 
     * @param {String} merch_url 
     * @param {String} nonce 
     * @param {Number} suid
     * @param {Number} timestamp 
     * @param {String} token
     * @param {String} zsign
    */
        getAccountID(frameData){
            return axios.get(`https://school.glolime.ru/api/netrika/userinfo/?${frameData}`,{ responseType: 'arraybuffer' })
            .then(response => {    
                data = iconv.decode(response.data, 'windows-1251');
    
                const root = parse.parse(data)
                const str = Number(root.querySelectorAll("td")[0].childNodes[0]._rawText)
    
                return str
            })
            .catch(error => {
                console.log(error)
                throw "Something went wrong by getting school.glolime.ru/api/netrika/userinfo/ via frameData";
            });
        }

    /**
     * Запрос на school.glolime.ru/api/netrika/userinfo/
     * 
     * Возвращает номер счета
     * @param {String} frameData 
    */
    getAccountID_frameData(frameData){
        return axios.get(`https://school.glolime.ru/api/netrika/userinfo/?${frameData}`,{ responseType: 'arraybuffer' })
        .then(response => {    
            data = iconv.decode(response.data, 'windows-1251');

            const root = parse.parse(data)
            const str = Number(root.querySelectorAll("td")[0].childNodes[0]._rawText)

            return str
        })
        .catch(error => {
            console.log(error)
            throw "Something went wrong by getting school.glolime.ru/api/netrika/userinfo/ via frameData";
        });
    }

    /**
     * Запрос на school.glolime.ru/acquiring/searchbypaymentnumber/acquier/
     * 
     * Возвращает ссылку на оплату 
     * @param {Number} type 1 - горячее, 2 - буфет
     * @param {Number} usernumber 
    */
    getAddMoneyString(type, usernumber){
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

            const root = parse.parse(data)
            const str = root.querySelectorAll("tbody")[0]

            return {
                hot_feed:    Number(str.childNodes[1].childNodes[1].rawText),
                cafeteria:   Number(str.childNodes[2].childNodes[1].rawText),
                card_update: Number(str.childNodes[3].childNodes[1].rawText),
                sms_warns:   Number(str.childNodes[4].childNodes[1].rawText),
                bracelet:    Number(str.childNodes[5].childNodes[1].rawText),
                mobile_app:  Number(str.childNodes[6].childNodes[1].rawText)
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

            const root = parse.parse(data)
            const str = root.querySelectorAll("tbody")[0]

            return {
                hot_feed:    Number(str.childNodes[1].childNodes[1].rawText),
                cafeteria:   Number(str.childNodes[2].childNodes[1].rawText),
                card_update: Number(str.childNodes[3].childNodes[1].rawText),
                sms_warns:   Number(str.childNodes[4].childNodes[1].rawText),
                bracelet:    Number(str.childNodes[5].childNodes[1].rawText),
                mobile_app:  Number(str.childNodes[6].childNodes[1].rawText)
            }  
        })
        .catch(error => {
            console.log(error)
            throw "Something went wrong by getting school.glolime.ru/api/netrika/account via frameData";
        });
    }
}


module.exports = { glolime }