var _ = require('underscore');
var TB = require('bootstrap-table');
var user_behavior = require('./user_behavior.json');
var table_data = require('./table_data.json');

var allAistoryLists = [];
_.each(user_behavior.data.businessHistoriesMap, function(item) {
	allAistoryLists.push(item.historyLists);
})
var res = _.compact(_.sortBy(_.flatten(allAistoryLists),'actionTime'));

// 将非actionTime或currentCityName的字段塞入others字段
_.each(res, function(item, key) {
	item.others = JSON.stringify(_.omit(item, 'actionTime', 'currentCityName'));
})

$('#table').bootstrapTable({
    data: res
});
