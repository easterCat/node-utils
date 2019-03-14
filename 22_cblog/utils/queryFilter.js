/**
 * Created by easterCat on 2017/11/8.
 */
const _ = require('lodash');

function queryFilter(req) {
    let filter = {
        where: null, // 查询
        words: false, // 给出的where中的条件完全匹配
        order: null, // 排序，用空格分隔（foo,-foo1）
        limit: -1,
        skip: 0,
        only_count: false,
        select: null
    };

    let where = req.query.where || null;
    if (where) {
        try {
            where = JSON.parse(where);
        } catch (error) {
            if (where.includes('{') || where.includes('}')) {
                throw `parse filter.where: ${error}`;
            }
        }
        if (_.isFinite(where)) {
            where = where.toString();
        }
    }

    filter.where = where || {};
    filter.order = req.query.order;
    let limit = req.query.limit;
    if (limit) {
        filter.limit = Number(limit);
    }
    let skip = req.query.skip;
    if (skip) {
        filter.skip = Number(skip);
    }
    filter.only_count = req.query.only_count || false;
    filter.select = req.query.select || null;
    return filter;
}

module.exports = queryFilter;