document.addEventListener('DOMContentLoaded', function () {
  var stripe = Stripe(
    "pk_test_51P4sixCv7KnbzqKPzRuUY9xxu8Ho7DBVh92RbtiX05gLAM6GoAkYGihVc2ZN5xWAoYy4XWYT0q0xiaqcrtF25iDI001kGVPaWQ"
  );

  var increaseButtons = document.querySelectorAll('.increase');
  var decreaseButtons = document.querySelectorAll('.decrease');

  function factory(increase) {
    return function fun(event) {
      var target = event.currentTarget;
      var id = target.dataset.productid;

      var url = '/products/' + id + '/cart/';
      if (increase) url += 'increase';
      else url += 'decrease';
      var method = 'POST';

      fetch(url, {
        method: method
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        window.location.reload();
      }).catch(function (err) {
        alert(err.message);
      })
    }
  }

  increaseButtons.forEach(function (button) {
    button.addEventListener('click', factory(true));
  })

  decreaseButtons.forEach(function (button) {
    button.addEventListener('click', factory(false));
  })

  function checkout() {
    var url = '/checkout';
    var method = 'POST';

    fetch(url, {
      method: method
    }).then(function (res) {
      window.location = '/me';
    }).catch(function (err) {
      alert(err.message);
    })
  }

  var checkoutButton = document.querySelector('#checkout');
  checkoutButton.addEventListener('click', function (event) {
    // checkout();
    var url = '/checkout-session';
    var method = 'POST';
    fetch(url, {
      method: method
    }).then(function (res) {
      if (res.ok) return res.json();
      alert('something went wrong');
    }).then(function (session) {
      stripe.redirectToCheckout({
        sessionId: session.id
      }).then(function (result) {
      })
    }).catch(function (err) {
      alert('something went wrong');
    })
  })

  var applyCoupon = document.querySelector('#apply-coupon');
  var code = document.querySelector('#code');
  applyCoupon.addEventListener('click', function (event) {
    var codeValue = code.value.trim();
    if (codeValue.length == 0) return;
    var url = '/coupons/apply';
    var method = 'POST';

    fetch(url, {
      method: method,
      body: JSON.stringify({
        code: codeValue
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.statusCode >= 400) {
        alert(data.errors.code[0]);
      } else {
        window.location.reload();
      }
    }).catch(function (err) {
      alert('something went wrong')
    })
  })
})