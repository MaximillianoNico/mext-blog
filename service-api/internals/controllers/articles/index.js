const _get = require('lodash/get');
const Articles = require('../../model/Articles');

const Notification = require('../notification');

exports.add = (req, res, next) => {
    const { body } = req;
    const payload = {
        title: _get(body, 'title') || '-',
        topic: _get(body, 'topic') || '-',
        body: _get(body, 'body') || '-',
    };
    Articles.insertMany([ payload ], (err, article) => {
        if (err) return res.send({ status: 'Error', err });

        Notification.send(payload);
        return res.send({ status: 'Success', data: article});
    })
};

exports.update = (req, res, next) => {
    // 
}

exports.delete = (req, res, next) => {
    // 
}

exports.get = (req, res, next) => {
    Articles.find({}, (err, docs) => {
        if (err) return res.send(err);
        res.send({ status: "Success", data: docs });
    })
}