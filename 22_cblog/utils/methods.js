/**
 * Created by easterCat on 2017/11/7.
 */

const Q = require('q');
const _ = require('lodash');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports = {
    add,
    cursor,
    query,
    queryOne,
    updateById,
    applyFilter,
    getCount,
    queryById,
    removeById
};

function add(Model, data) {
    data = _.omit(data, '_id');
    let model = new Model(data);
    return model.save(data)
        .then(data => {
            return data && data.view();
        })
        .catch(err => {
            console.log(err);
        });
}

/**
 *
 * @param Model
 * @param query <Object>
 * @param projection <Object> 要返回的可选字段
 */
function cursor(Model, query, projection = null) {
    // query.js的cursor
    return Model.find(query, projection).cursor();
}

function query(Model, query, projection = null) {
    return Model.find(query, projection)
        .then(data => data && data.map(item => item && item.view()));
}

function queryOne(Model, query, projection = null) {
    return Model.findOne(query, projection)
        .then(data => {
            return data && data.view();
        });
}

function queryById(Model, _id, projection = null) {
    return Model.findById(_id, projection)
        .then(data => data && data.view());
}

function updateById(Model, _id, data, upsert) {
    return Model.findByIdAndUpdate(_id, data, {new: true, upsert})
        .then(data => {
            return data && data.view();
        });
}

function removeById(Model, _id) {
    return Model.findByIdAndRemove(_id)
        .then(data => data && data.view());
}

function applyFilter(Model, filter, byCursor = false) {
    filter.where = filter.where || {};
    if (!filter.order && Model.orderKey) {
        filter.order = Model.orderKey();
    }
    let query = Model.find(filter.where);
    if (filter.select) {
        query.select(filter.select);
    }
    if (filter.order) {
        query.sort(filter.order);
    }
    let skip = filter.skip;
    if (skip) {
        query.skip(skip);
    }
    let limit = filter.limit;
    if (limit && limit > 0) {
        query.limit(limit);
    }
    if (!byCursor) {
        return query.exec()
            .then(results => results && results.map(result => result.view()));
    }
    return query.cursor();
}

function getCount(Model, query = {}) {
    return Model.find(query).count();
}