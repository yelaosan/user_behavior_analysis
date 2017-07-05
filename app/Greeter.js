var _ = require('');
var user_behavior = require('./user_behavior.json');

module.exports = function() {
  	var allAistoryLists = [];
	_.each(data_all.data.businessHistoriesMap, function(item) {
		allAistoryLists.push(item.historyLists);
	})
	var res =_.sortBy(_.flatten(allAistoryLists),'actionTime');
	console.log(res);
	document.querySelector('#root').innerHTML = JSON.stringify(res);
};