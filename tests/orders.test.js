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

test("avança o status de um pedido de entrega", () => {
  assert.equal(nextStatus("Em preparo", "Entrega"), "Pronto");
  assert.equal(nextStatus("Pronto", "Entrega"), "Saiu para entrega");
});

test("pedido para retirada vai de Pronto diretamente para Entregue", () => {
  assert.equal(nextStatus("Pronto", "Retirada"), "Entregue");
});

test("pedido para retirada não passa pela etapa Saiu para entrega", () => {
  assert.equal(nextStatus("Em preparo", "Retirada"), "Pronto");
});

test("soma somente os pedidos pagos", () => {
  const orders = [{ total: 20, paid: true }, { total: 25, paid: false }, { total: 30, paid: true }];
  assert.equal(sumReceived(orders), 50);
});

test("não permite quantidade inválida", () => {
  assert.throws(() => calculateTotal({ meal: "M", quantity: 0 }), /Quantidade inválida/);
});

test("rejeita status inválido", () => {
  assert.throws(() => nextStatus("Cancelado", "Entrega"), /Status inválido/);
});
