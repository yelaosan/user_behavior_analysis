var _ = require('underscore');
var moment = require('moment');
var TB = require('bootstrap-table');
var user_behavior = require('./user_behavior.json');

var allAistoryLists = [];
_.each(user_behavior.data.businessHistoriesMap, function(item, key) {
	item.type = key;
	
	allAistoryLists.push(_.map(_.flatten(_.compact(item.historyLists)), function(ite){
		ite.type = key;
		return ite;
	}));
})
var res = _.sortBy(_.flatten(allAistoryLists),'actionTime');

// 请求远端
$.get('https://free-api.heweather.com/v5/weather?city=%E5%8C%97%E4%BA%AC&key=06b7f31d7d9c45acadf4fc30ba8ec9ce', function(data){console.log(data)})

// 将非actionTime或currentCityName的字段塞入others字段
_.each(res, function(item, key) {
	item.actionTime = moment(item.actionTime).format('YYYY-MM-DD HH:mm:ss');

	var type = item.type;
	var others;
	if(type === 'HOTEL') {
		item.others = JSON.stringify(_.pick(item, 'pvedHotels','checkInCityName','checkInDate','userCoordinate')).replace(/[\{\}\"]/g, '');
	}else if (type === 'TICKET') {
		item.others = JSON.stringify(_.pick(item, 'keyword','currentName')).replace(/[\{\}\"]/g, '');
	}else if (type === 'VACATION') {
		item.others = JSON.stringify(_.pick(item, 'depCityName', 'query')).replace(/[\{\}\"]/g, '');
	};
})

$('#table').bootstrapTable({
    data: res
});
