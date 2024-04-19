function getQueryObj(search) {
  var query = {};
  search = search.trim();
  if (search.startsWith('?')) {
    search = search.slice(1);
    search = search.split('=', '&');

    for (var i = 0; i < search.length; i += 2) {
      query[search[i]] = search[i + 1];
    }
  }
  return query;
}

function getQueryString(queryObj) {
  var queryString = '?';
  var attrs = [];
  Object.entries(queryObj).forEach(function (pair) {
    attrs.push(pair[0] + '=' + pair[1]);
  })
  queryString += attrs.join('&');
  return queryString;
}