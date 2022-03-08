"use strict";

//const { default: createStrapi } = require("strapi");

const stripe = require("stripe")(
  "sk_test_51KaoRGLnTLo4odbbhQYpDUOPVjhPBWKC36QRQgTFg7YkYb8s2B4FPTGkrWiYTBfvX78GreW6aBG2LCfefEWdCLF000TCcEy98N"
);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const calcPrice = (price, discount) => {
  if (!discount) return price;
  const discountAmount = (price * discount) / 100;
  return (price - discountAmount).toFixed(2);
};

module.exports = {
  async create(ctx) {
    const { tokenStripe, products, idUser, addressShipping } = ctx.request.body;
    let totalPayment = 0;
    products.forEach((product) => {
      const totalPrice = calcPrice(product.price, product.discount);
      totalPayment += totalPrice * product.quantity;
    });
    const charge = await stripe.charges.create({
      amount: totalPayment * 100,
      currency: "eur",
      source: tokenStripe,
      description: `ID Usuario: ${idUser}`,
    });
    console.log(charge);
    const createOrder = [];
    for await (const product of products) {
      const data = {
        product: product.id,
        user: idUser,
        totalPayment: totalPayment,
        productsPayment: product.price * product.quantity,
        quantity: product.quantity,
        idPayment: charge.id,
        addressShipping,
      };
      const validData =
        await await strapi.entityValidator.validateEntityCreation(
          strapi.models.order,
          data
        );
      const entry = await strapi.query("order").create(validData);
      createOrder.push(entry);
    }

    return createOrder;
  },
};
