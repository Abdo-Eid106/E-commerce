var submit = document.querySelector('#submitButton');
submit.addEventListener('click', function (event) {
  var lowPrice = parseInt(document.querySelector('.low-price').value.trim());
  var highPrice = parseInt(document.querySelector('.high-price').value.trim());

  var query = getQueryObj(window.location.search);
  var change = false;
  if (!isNaN(lowPrice)) {
    query.lowPrice = lowPrice;
    change = true;
  }

  if (!isNaN(highPrice)) {
    query.highPrice = highPrice;
    change = true;
  }

  if (change) {
    var queryString = getQueryString(query);
    window.location = window.location.pathname + queryString;
  }
})