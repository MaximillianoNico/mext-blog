const _get = require('lodash/get');
const axios = require('axios');

const headers = {
    "Content-Type": 'application/json',
    Authorization: process.env.FCM_KEY, 
};

/**
 * send
 */
exports.send = ({ title, body, url, topic }) => {
    const payload = {
        notification:{
            title, body,
            icon: 'https://imgur.com/JmN3iEL',
            click_action: url,
        },
        to: `/topics/${topic}`,
    };
    return axios.post(process.env.FCM_URL, payload, { headers });
}

exports.createOrUpdateTopic = function (req, res, next) {
    const topic = _get(req.body, 'topic') || 'suzuki';
    const token = _get(req.body, 'token') || '';

    const payload = {
        to: `/topics/${topic}`,
        registration_tokens: [token]
    }

    console.log('payload : ', payload);

    const headers = {
        "Content-Type": 'application/json',
        Authorization: process.env.FCM_KEY, 
    }
    axios.post(process.env.FCM_GOOGLE_APIS, payload, { headers})
        .then(resp => {
            console.log('resp : ', resp.data)
        }).catch(err => {
            console.log('err : ', err);
        })

    console.log("Success create topics notification");
    return res.send({ status: 'Success', payload });
};

exports.sendNotificationByTopic = (req, res, next) => {
    const { body } = req;
    const topic = _get(req.body, 'topic') || '';
    const title = _get(body, 'title') || '';
    const bodyContent = _get(body, 'desc') || '';

    const urlArticle = _get(req.body, 'url') || '';

    this.send({ title, topic, body: bodyContent, url: urlArticle})
        .then(resp => {
            console.log('resp  : ', resp.data);
            return res.send({ status: 'Success', data: resp.data });
        })
        .catch(err => {
            console.log('error : ', err);
            res.send({ status: 'error' , err})
        })
    
    console.log('Success send notification');
}
