var searchButton = document.querySelector('#searchButton');
var searchInput = document.querySelector('#searchInput');

searchButton.addEventListener('click', function (event) {
  event.preventDefault();
  var value = searchInput.value;
  value = value.trim();

  if (value != '') {
    var queryObj = getQueryObj(window.location.search);
    queryObj.search = value;
    var queryStr = getQueryString(queryObj);
    window.location.href = window.location.pathname + queryStr;
  }
})