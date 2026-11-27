const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateTotal, createOrder, nextStatus, sumReceived, filterOrdersByDate } = require("../js/orders.js");

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


test("resume as vendas, recebimentos e pendências somente na data escolhida", () => {
  const { summarizeCash } = require("../js/orders.js");
  const summary = summarizeCash([
    { createdAt: "2026-11-27T10:00:00-03:00", total: 30, paid: true, paymentMethod: "Pix" },
    { createdAt: "2026-11-27T11:00:00-03:00", total: 25, paid: false, paymentMethod: "Dinheiro" },
    { createdAt: "2026-11-27T12:00:00-03:00", total: 40, paid: true, paymentMethod: "Cartão" },
    { createdAt: "2026-11-26T12:00:00-03:00", total: 99, paid: true, paymentMethod: "Pix" }
  ], "2026-11-27");
  assert.equal(summary.orderCount, 3);
  assert.equal(summary.sales, 95);
  assert.equal(summary.received, 70);
  assert.equal(summary.pending, 25);
  assert.equal(summary.pendingCount, 1);
  assert.deepEqual(summary.byMethod, { Pix: 30, Dinheiro: 0, "Cartão": 40 });
});


test("filtra o histórico pela data e ordena do mais recente para o mais antigo", () => {
  const orders = [
    { id: 1, createdAt: "2026-11-27T09:00:00-03:00" },
    { id: 2, createdAt: "2026-11-26T10:00:00-03:00" },
    { id: 3, createdAt: "2026-11-27T14:30:00-03:00" }
  ];
  assert.deepEqual(
    filterOrdersByDate(orders, "2026-11-27").map(order => order.id),
    [3, 1]
  );
});

test("histórico sem data selecionada não retorna pedidos", () => {
  assert.deepEqual(filterOrdersByDate([{ createdAt: "2026-11-27T09:00:00-03:00" }], ""), []);
});
