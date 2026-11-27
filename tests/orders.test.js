const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateTotal, createOrder, nextStatus, sumReceived } = require("../js/orders.js");

test("calcula o valor da marmita com adicional e quantidade", () => {
  assert.equal(calculateTotal({ meal: "M", quantity: 2, extraFarofa: true }), 48);
});

test("salva personalizações do pedido", () => {
  const order = createOrder({ customer: "Ana", meal: "P", quantity: 1, noBeans: true, extraFarofa: true });
  assert.equal(order.noBeans, true);
  assert.equal(order.extraFarofa, true);
  assert.equal(order.total, 20);
});

test("avança o status do pedido", () => {
  assert.equal(nextStatus("Em preparo"), "Pronto");
});

test("soma somente os pedidos pagos", () => {
  const orders = [{ total: 20, paid: true }, { total: 25, paid: false }, { total: 30, paid: true }];
  assert.equal(sumReceived(orders), 50);
});

test("não permite quantidade inválida", () => {
  assert.throws(() => calculateTotal({ meal: "M", quantity: 0 }), /Quantidade inválida/);
});
