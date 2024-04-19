var categouryButtons = document.querySelectorAll('.categoury');

categouryButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    var target = event.currentTarget;
    var categouryid = target.dataset.categouryid;
    
    var query = getQueryObj(window.location.search);
    query.categoury = categouryid;
    var queryStr = getQueryString(query);
  
    window.location.href = window.location.pathname + queryStr;
  })
})