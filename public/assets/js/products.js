document.addEventListener('DOMContentLoaded', function () {

  var addToCartButtons = document.querySelectorAll('.addToCart');
  var addToWishlistButtons = document.querySelectorAll('.addToWishlist');

  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      var target = event.currentTarget;
      var productId = target.dataset.productid;

      var url = '/products/' + productId + '/cart';
      var method = 'POST';

      fetch(url, {
        method: method
      }).then(function (res) {
        if (res.ok) return res.json();
        return false;
      }).then(function (added) {
        if (added) {
          var cartProductsCount = document.getElementById('cartProductsCount');
          if (cartProductsCount) cartProductsCount.textContent = parseInt(cartProductsCount.textContent) + 1;
          else {
            var cart = document.querySelector('#cart');
            cart.innerHTML += '<span id="cartProductsCount"\
          class="position-absolute bg-danger\
          text-light rounded-circle px-1"style="left: 40px; top: 17px; font-size: 15px;"> 1</span>'
          }
          target.remove();
        }
      }).catch(function (err) {
        return false;
      })
    })
  })

  addToWishlistButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      var target = event.currentTarget;
      var productId = target.dataset.productid;

      var url = '/products/' + productId + '/wishlist';
      var method = 'POST';

      fetch(url, {
        method: method
      }, function (res) {
        if (res.ok) return res.json();
        return false;
      }).then(function (added) {
        if (added) {
          var wishlistProductsCount = document.getElementById('wishlistProductsCount');
          if (wishlistProductsCount) {
            wishlistProductsCount.textContent = parseInt(wishlistProductsCount.textContent) + 1;
          } else {
            var wishlist = document.getElementById('wishlist');
            wishlist.innerHTML += '<span id="wishlistProductsCount"\
          class="position-absolute bg-danger text-light rounded-circle px-1"\
          style="right: 2px; top: 17px; font-size: 15px;"> 1</span>'
          }
          target.remove();
        }
      }).catch(function (err) {
        return false;
      })
    })
  })

})