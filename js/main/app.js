class UIController {
  static domElements() {
    return {
      productHolder: document.querySelector(".product-container"),
      productImageTag: document.querySelector(".img-fluid"),
      productTitleTag: document.querySelector("#product-title"),
      productPriceTag: document.querySelector("#product-price"),
      productId: document.querySelector(".productDiv"),
      cartQuantity: document.querySelector("#cart-number"),
      cartIconTag: document.querySelector(".cart-icon"),
      goToCartBtn: document.querySelector("#go-to-cart"),
    };
  }

  static updateCartCount(data) {
    this.domElements().cartQuantity.textContent = data;
  }

  static displayToUI(data) {
    const productHolder = this.domElements().productHolder;
    const productHtml = `<div class="row wow fadeIn product-container productDiv" id=${Math.floor(
      Math.random() * 10000
    )}>
        <!--Grid column-->
        <div class="col-md-6 mb-4">
          <img
            src=${data.image}
            class="img-fluid"
            alt=""
            style="width 500px; height:600px"
          />
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-md-6 mb-4">
          <!--Content-->
          <div class="p-4">
          <h3 id="product-title">${data.title}</h3>
            </div>

            <p class="lead">
              <span id="product-price">$${data.price}</span>
            </p>

            <p class="lead font-weight-bold">Description</p>

            <p>
              ${data.description}
            </p>

            <form class="d-flex justify-content-left">
              <select
                class="browser-default custom-select"
                aria-label="Search"
                class="form-control"
                style="width: 100px"
                id="size"
              > 
                <option selected>Size</option>
                ${data.sizes
                  .map((item) => `<option value=${item}>${item}</option>`)
                  .join("")}
              </select>

              <select
                class="browser-default custom-select"
                aria-label="Search"
                class="form-control"
                id="color"
                style="width: 100px; margin: 0 5px"
              >
                <option selected>Color</option>
                ${data.colors
                  .map((item) => ` <option value=${item}>${item}</option>`)
                  .join("")}
              </select>
              <button class="btn btn-primary btn-md my-0 p" type="button"
              data-toggle="modal"
              data-target="#modalAbandonedCart">
                Add to cart
                <i class="fas fa-shopping-cart ml-1"></i>
              </button>
            </form>
          </div>
          <!--Content-->
        </div>
        <!--Grid column-->
      </div>`;

    productHolder.innerHTML = "";
    productHolder.innerHTML = productHtml;
  }

  static loadCartPage(data) {
    const main = document.querySelector("#main");

    const newContainer = `<div class="container z-depth-1 p-5 my-5">
    <!-- Section: Block Content -->
    <section>
      <!-- Shopping Cart table -->
      <div class="table-responsive">
        <table class="table product-table table-cart-v-1">
          <!-- Table head -->
          <thead>
            <tr>
              <th></th>
              <th class="font-weight-bold">
                <strong>Product</strong>
              </th>
              <th class="font-weight-bold">
                <strong>Color</strong>
              </th>
              <th></th>
              <th class="font-weight-bold">
                <strong>Price</strong>
              </th>
              <th class="font-weight-bold">
                <strong>QTY</strong>
              </th>
              <th class="font-weight-bold">
                <strong>Amount</strong>
              </th>
              <th></th>
            </tr>
          </thead>
          <!-- Table head -->
          <!-- Table body -->
          <tbody>
            <!-- First row -->

            ${data
              .map(
                (item) => ` <tr class="item-row" id=${item.id}>
            <th scope="row">
              <img
                src=${item.image}
                alt=""
                class="img-fluid z-depth-0"
              />
            </th>
            <td>
              <h5 class="mt-3">
                <strong>${item.title}</strong>
              </h5>
              <p class="text-muted" style="font-size:18px; font-weight:bold; margin-top: 15px">${
                item.size
              }</p>
            </td>
            <td style="color:${item.color}">${item.color}</td>
            <td></td>
            <td id="price">$${item.price}</td>
            <td class="text-center text-md-left">
              <span class="qty">${item.quantity} </span>
              <div
                class="btn-group radio-group ml-2 radio-toggle"
                data-toggle="buttons"
              >
                <label class="btn btn-sm btn-primary btn-rounded" data-key=${
                  item.id
                } id="dec">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                  />&mdash;
                </label>
                <label class="btn btn-sm btn-primary btn-rounded" data-key=${
                  item.id
                } id="inc">
                  <input type="radio" name="options" id="option2" />+
                </label>
              </div>
            </td>
            <td class="font-weight-bold">
              <strong id="amount">$${parseFloat(
                parseFloat(item.price) * item.quantity
              ).toFixed(2)}</strong>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-primary delete"
                data-toggle="tooltip"
                data-placement="top"
                title="Remove item"
                data-key=${item.id}
              >
                X
              </button>
            </td>
          </tr>`
              )
              .join("")}
              <tr>
                      <td colspan="3"></td>
                      <td>
                        <h4 class="mt-2">
                          <strong>Total</strong>
                        </h4>
                      </td>
                      <td class="text-right">
                        <h4 class="mt-2">
                          <strong id="total-amount">$${data
                            .map((item) => item.price * item.quantity)
                            .reduce(function (acc, obj) {
                              return acc + parseFloat(obj);
                            }, 0)
                            .toFixed(2)}</strong>
                        </h4>
                      </td>
                      <td colspan="3" class="text-right">
                        <button type="button" class="btn btn-primary btn-rounded px-4 checkout">Complete purchase
                          <i class="fas fa-angle-right right"></i>
                        </button>
                      </td>
                    </tr>
           
          </tbody>
          <!-- Table body -->
        </table>
        <!-- Promo code -->
        <form class="card p-2">
          <div class="input-group">
            <input
              type="text"
              class="form-control promo-code"
              placeholder="Promo code"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button
                class="btn btn-secondary btn-md waves-effect m-0 redeem-promo"
                type="button"
              >
                Redeem
              </button>
            </div>
          </div>
        </form>
      </div>
      <!-- Shopping Cart table -->
    </section>
    <!-- Section: Block Content -->
  </div>
          
          
          `;
    main.innerHTML = "";

    main.innerHTML = newContainer;
  }

  static goToCheckoutPage() {
    const main = document.querySelector("#main");

    const checkoutPage = `<div class="container wow fadeIn">
    <!-- Heading -->
    <h2 class="my-5 h2 text-center">Checkout form</h2>

    <!--Grid row-->
    <div class="row justify-content-center">
      <!--Grid column-->
      <div class="col-md-8 mb-4">
        <!--Card-->
        <div class="card">
          <!--Card content-->
          <form class="card-body">
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-md-6 mb-2">
                <!--firstName-->
                <div class="md-form">
                  <input type="text" id="firstName" class="form-control" />
                  <label for="firstName" class="">First name</label>
                </div>
              </div>
              <!--Grid column-->

              <!--Grid column-->
              <div class="col-md-6 mb-2">
                <!--lastName-->
                <div class="md-form">
                  <input type="text" id="lastName" class="form-control" />
                  <label for="lastName" class="">Last name</label>
                </div>
              </div>
              <!--Grid column-->
            </div>
            <!--Grid row-->

          

            <!--email-->
            <div class="md-form mb-5">
              <input
                type="text"
                id="email"
                class="form-control"
                placeholder=""
              />
              <label for="email" class="">Email (optional)</label>
            </div>

            <!--address-->
            <div class="md-form mb-5">
              <input
                type="text"
                id="address"
                class="form-control"
                placeholder=""
              />
              <label for="address" class="">Address</label>
            </div>

         
            
            <!--Grid row-->

            <hr />

      


       
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-name">Name on card</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-name"
                  placeholder=""
                  required
                />
                <small class="text-muted"
                  >Full name as displayed on card</small
                >
                <div class="invalid-feedback">Name on card is required</div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-number">Credit card number</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-number"
                  placeholder=""
                  required
                />
                <div class="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-expiration"
                  placeholder=""
                  required
                />
                <div class="invalid-feedback">Expiration date required</div>
              </div>
              <div class="col-md-3 mb-3">
                <label for="cc-expiration">CVV</label>
                <input
                  type="text"
                  class="form-control"
                  id="cc-cvv"
                  placeholder=""
                  required
                />
                <div class="invalid-feedback">Security code required</div>
              </div>
            </div>
            <hr class="mb-4" />
            <button class="btn btn-primary btn-lg btn-block complete-order" type="submit">
              Place Order
            </button>
          </form>
        </div>
        <!--/.Card-->
      </div>
      <!--Grid column-->

      <!--Grid column-->

      <!--Grid column-->
    </div>
    <!--Grid row-->
  </div>`;

    main.innerHTML = "";
    main.innerHTML = checkoutPage;
  }

  static confirmation(data, profile) {
    const main = document.querySelector("#main");

    const confirmation = ` <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#F44336">
                        <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                <tr>
                                    <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                        <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">${
                                          profile.firstName
                                        } ${profile.lastName}</h1>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                <tr>
                                    <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                        <table cellspacing="0" cellpadding="0" border="0" align="right">
                                            <tr>
                                                <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                    <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p>
                                                </td>
                                                <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;"> <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;" /></a> </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                            <tr>
                                <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br>
                                    <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Thank You For Your Order! </h2>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                    <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;"> You will receive an email at <span style="color: blue">${
                                      profile.email
                                    } </span> for your tracking details </p>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="padding-top: 20px;">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                        <tr>
                                            <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Order Confirmation # </td>
                                            <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> 2345678 </td>
                                        </tr>
                                        <tr>
                                            <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> Purchased Item (${data
                                              .map((item) => item.quantity)
                                              .reduce(function (acc, obj) {
                                                return acc + obj;
                                              }, 0)}) </td>
                                            <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;"> $${data
                                              .map(
                                                (item) =>
                                                  item.price * item.quantity
                                              )
                                              .reduce(function (acc, obj) {
                                                return acc + parseFloat(obj);
                                              }, 0)
                                              .toFixed(2)} </td>
                                        </tr>
                                        <tr>
                                            <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Shipping + Handling </td>
                                            <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> $10.00 </td>
                                        </tr>
                                        <tr>
                                            <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Sales Tax </td>
                                            <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> $5.00 </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="left" style="padding-top: 20px;">
                                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                        <tr>
                                            <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> TOTAL </td>
                                            <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> $${data
                                              .map(
                                                (item) =>
                                                  item.price * item.quantity
                                              )
                                              .reduce(function (acc, obj) {
                                                return acc + parseFloat(obj);
                                              }, 15)
                                              .toFixed(2)} </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                            <tr>
                                <td align="center" valign="top" style="font-size:0;">
                                    <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                            <tr>
                                                <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                    <p style="font-weight: 800;">Delivery Address</p>
                                                    <p>${profile.address}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                            <tr>
                                                <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                    <p style="font-weight: 800;">Estimated Delivery Date</p>
                                                    <p>December 2nd, 2020</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style=" padding: 35px; background-color: #ff7361;" bgcolor="#1b9ba3">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                            <tr>
                                <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                    <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;"> Get 30% off your next order. </h2>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 25px 0 15px 0;">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;

    main.innerHTML = "";
    main.innerHTML = confirmation;
  }

  static removeCartItemFromUi(target) {
    const parent = target.parentElement.parentElement;
    parent.remove();
  }

  //   static updatePrices(target) {
  //     const parent = target.parentElement.parentElement.parentElement;
  //     const quantity = parent.querySelector(".qty");
  //     const amount = parent.querySelector("#amount");
  //     const price = parent.querySelector("#price");
  //     const totalAmount = document.querySelector("#total-amount");
  //     const cleanAmount = amount.textContent.replace("$", "");
  //     const cleanPrice = price.textContent.replace("$", "");
  //     const cleanTotalAMount = totalAmount.textContent.replace("$", "");
  //     let updated;

  //     if (target.id == "inc") {
  //       let quantityNum = parseInt(quantity.textContent);
  //       const newQuantity = quantityNum + 1;
  //       quantity.textContent = newQuantity;
  //       updated = `$${parseFloat(parseFloat(cleanPrice) * newQuantity).toFixed(
  //         2
  //       )}`;
  //       amount.textContent = updated;
  //       totalAmount.textContent = updated;
  //     } else if (target.id == "dec" && parseInt(quantity.textContent) >= 2) {
  //       let quantityNum = parseInt(quantity.textContent);
  //       const newQuantity = quantityNum - 1;

  //       quantity.textContent = newQuantity;
  //       updated = `$${parseFloat(
  //         parseFloat(cleanAmount) - parseFloat(cleanPrice)
  //       ).toFixed(2)}`;
  //       amount.textContent = updated;
  //       totalAmount.textContent = updated;
  //     }
  //   }
}

class Storage {
  static setItemToStorage(data) {
    let storage = localStorage.getItem("cart");

    if (storage == null) {
      localStorage.setItem("cart", JSON.stringify(data));
    } else {
      let retrieved = localStorage.getItem("cart");
      JSON.parse(retrieved);
      retrieved = data;
      localStorage.setItem("cart", JSON.stringify(retrieved));
    }
  }

  static getItemFromStorage() {
    let retrieved = localStorage.getItem("cart");
    return JSON.parse(retrieved);
  }
}

// Product to be added to cart
class Product {
  constructor(id, image, title, price, color, size) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.price = price;
    this.color = color;
    this.size = size;
    this.quantity = 1;
    this.totalAmount = price;
  }

  static updateQuantity(product, type) {
    const floatedPrice = parseFloat(product.price);
    const floatedTotal = parseFloat(product.totalAmount);
    const quantity = product.quantity;
    if (type == "inc") {
      product.quantity = product.quantity + 1;
      product.totalAmount = parseFloat(floatedPrice * quantity).toFixed(2);
    } else if (type === "dec" && product.quantity >= 2) {
      product.quantity = product.quantity - 1;
      product.totalAmount = parseFloat(floatedTotal - floatedPrice).toFixed(2);
    }
  }

  static update(type, price, total, quantity) {
    const floatedPrice = parseFloat(price);
    const floatedTotal = parseFloat(total);
    let newTotal;
    let newQuantity;
    if (type === "inc") {
      newQuantity = quantity + 1;
      newTotal = parseFloat(floatedPrice * newQuantity).toFixed(2);
    } else if (type === "dec") {
      newQuantity = quantity - 1;
      newTotal = parseFloat(floatedPrice * newQuantity).toFixed(2);
    }
    return {
      newTotal,
      newQuantity,
    };
  }
}

// Create cart
class Cart {
  constructor() {
    this.cart = [];
  }

  addItemToCart(item) {
    this.cart.push(item);
  }

  getCartLength() {
    return this.cart.length;
  }
}

// App controller
(function () {
  const products = [
    {
      id: 1,
      title: "Reclaimed Vintage inspired faux shearling jacket in tan",
      price: 109.95,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Red", "Black", "Blue", "green", "yellow", "purple"],
      description:
        "Combining innovative design and vintage style, our Reclaimed Vintage at ASOS edit serves up a mix of fresh and throwback looks across its two distinct collections. For handpicked vintage gems and customised pieces, look to Reclaimed Vintage Revived, or shop Reclaimed Vintage Inspired to discover original designs with a vintage twist. Expect everything from oversized hoodies and patterned shirts to jewellery and accessories for completing your look.",
      category: "men clothing",
      image:
        "https://images.asos-media.com/products/reclaimed-vintage-inspired-faux-shearling-jacket-in-tan/20891369-1-tan?$XXL$&wid=513&fit=constrain",
    },
  ];

  const state = {
    currentProduct: null,
    cart: null,
  };

  //   Load product when page loads
  window.addEventListener("load", function () {
    state.currentProduct = products[0];
    if (Storage.getItemFromStorage() === null) {
      const cart = new Cart();
      state.cart = cart;
    } else {
      const loadedCart = Storage.getItemFromStorage();

      const cart = new Cart();
      state.cart = new Cart();
      state.cart.cart = loadedCart;
    }

    UIController.displayToUI(state.currentProduct);
    UIController.updateCartCount(state.cart.getCartLength());
  });

  //   Add item to cart

  const productHolder = UIController.domElements().productHolder;

  productHolder.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();
      //   validateSizeAndColor();
      if (validateSizeAndColor()) {
        displayAlert("cart-danger");
        return;
      }
      //   Create a new product for cart
      const productToCart = createNewProduct();
      // Push product to cart
      state.cart.addItemToCart(productToCart);

      //   add cart to storage
      Storage.setItemToStorage(state.cart.cart);

      //   Update Cart count on UI
      UIController.updateCartCount(state.cart.getCartLength());

      //   go to cart page
      UIController.loadCartPage(state.cart.cart);
    }
  });

  //  Icon image to go to cart page
  const btnIcon = document.querySelector("#cart-icon");
  btnIcon.addEventListener("click", function (e) {
    const number = document.querySelector("#cart-number").textContent;
    if (number !== "0") {
      UIController.loadCartPage(state.cart.cart);
    }
  });

  // Go to cart page
  //   const goToCartBtn = UIController.domElements().goToCartBtn;
  //   goToCartBtn.addEventListener("click", function (e) {

  //   });

  //   remove item from UI
  const main = document.querySelector("#main");
  main.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      const id = e.target.getAttribute("data-key");

      UIController.removeCartItemFromUi(e.target);
      //   UIController.displayToUI(state.currentProduct);
      removeItemStorage(id);
      main;
      UIController.loadCartPage(state.cart);
      //   goToCart();
    }
  });

  // applying promo functionality
  main.addEventListener("click", function (e) {
    if (e.target.classList.contains("redeem-promo")) {
      promoCode();
    }
  });

  //   Update prices
  main.addEventListener("click", function (e) {
    if (e.target.id == "inc" || e.target.id == "dec") {
      // update in UI
      //   UIController.updatePrices(e.target);

      //   update in storage
      let retrieved = Storage.getItemFromStorage();
      const id = e.target.getAttribute("data-key");
      const index = retrieved.findIndex((item) => item.id === id);
      const product = retrieved[index];
      const result = Product.update(
        e.target.id,
        product.price,
        product.totalAmount,
        product.quantity
      );
      product.quantity = result.newQuantity;
      product.totalAmount = result.newTotal;
      retrieved.splice(index, product);
      state.cart = retrieved;
      UIController.loadCartPage(state.cart);
      Storage.setItemToStorage(retrieved);
    }

    if (e.target.classList.contains("checkout")) {
      UIController.goToCheckoutPage();
      const newCartData = Storage.getItemFromStorage();
      state.newCartData = newCartData;
    }

    if (e.target.classList.contains("complete-order")) {
      e.preventDefault();
      const firstName = document.querySelector("#firstName").value;
      const lastName = document.querySelector("#lastName").value;
      const email = document.querySelector("#email").value;
      const address = document.querySelector("#address").value;
      const ccName = document.querySelector("#cc-name").value;
      const ccNumber = document.querySelector("#cc-name").value;
      const ccExpiration = document.querySelector("#cc-expiration").value;

      const orderDetails = {
        firstName,
        lastName,
        email,
        address,
        ccName,
        ccNumber,
        ccExpiration,
      };

      if (
        validateOrderForm([
          firstName,
          lastName,
          email,
          address,
          ccName,
          ccNumber,
          ccExpiration,
        ])
      ) {
        displayAlert("order-danger");
        return;
      }
      state.orderDetails = orderDetails;
      UIController.confirmation(state.newCartData, state.orderDetails);
      window.localStorage.clear();
      UIController.updateCartCount(0);
    }
  });

  function getValuesForCartProduct() {
    const productImage = UIController.domElements().productImageTag.getAttribute(
      "src"
    );
    const productTitle = UIController.domElements().productTitleTag.textContent;
    const productPrice = UIController.domElements().productPriceTag.textContent;
    const productId = UIController.domElements().productId.id;
    const productSize = document.querySelector("#size").value;
    const productColor = document.querySelector("#color").value;

    return {
      productImage,
      productTitle,
      productPrice,
      productSize,
      productColor,
      productId,
    };
  }

  function createNewProduct() {
    const id = getValuesForCartProduct().productId;
    const image = getValuesForCartProduct().productImage;
    const title = getValuesForCartProduct().productTitle;
    const price = getValuesForCartProduct().productPrice.replace("$", "");
    const size = getValuesForCartProduct().productSize;
    const color = getValuesForCartProduct().productColor;

    const newProduct = new Product(id, image, title, price, color, size);
    return newProduct;
  }

  function removeItemStorage(id) {
    const retrieved = Storage.getItemFromStorage();
    const index = retrieved.findIndex((item) => item.id === id);
    retrieved.splice(index, 1);
    state.cart = retrieved;
    UIController.updateCartCount(state.cart.length);
    Storage.setItemToStorage(retrieved);
  }

  function promoCode() {
    const regexPattern = /^([a-zA-Z0-9_-]){5}$/;
    const promoCode = document.querySelector(".promo-code");
    const isValid = regexPattern.test(promoCode.value);
    if (isValid) {
      applyPromo();
      displayAlert("alert-success");
    } else {
      const alert = document.querySelector(".alert");
      displayAlert("alert-danger");
    }
  }

  function applyPromo() {
    const promo = 50 / 100;
    const retrieved = Storage.getItemFromStorage();
    retrieved.forEach((item) =>
      parseFloat((item.price = parseFloat(item.price) * promo))
    );

    state.cart = retrieved;
    UIController.loadCartPage(state.cart);

    Storage.setItemToStorage(retrieved);
  }

  function displayAlert(classname) {
    const item = document.querySelector(`.${classname}`);
    item.style.visibility = "visible";
    setTimeout(function () {
      item.style.visibility = "hidden";
    }, 2000);
  }

  function validateSizeAndColor() {
    const size = document.querySelector("#size").value;
    const color = document.querySelector("#color").value;

    if (size == "Size" || color === "Color") {
      return true;
    }
  }

  function validateOrderForm(arr) {
    return arr.some((item) => item == "");
  }
})();
