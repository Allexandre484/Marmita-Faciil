// Regras de negócio puras: mantidas separadas da interface para facilitar os testes.
(function (root) {
  const PRICES = { P: 18, M: 22, G: 27 };
  const EXTRA_FAROFA = 2;

  function calculateTotal(order) {
    const basePrice = PRICES[order.meal];
    if (!basePrice) throw new Error("Tamanho de marmita inválido.");
    const quantity = Number(order.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) throw new Error("Quantidade inválida.");
    const extras = order.extraFarofa ? EXTRA_FAROFA : 0;
    return (basePrice + extras) * quantity;
  }

  function createOrder(data, id = Date.now()) {
    const customer = String(data.customer || "").trim();
    if (!customer) throw new Error("Informe o nome do cliente.");
    return {
      id,
      customer,
      phone: data.phone || "",
      service: data.service || "Entrega",
      address: data.address || "",
      meal: data.meal || "M",
      quantity: Number(data.quantity || 1),
      noBeans: Boolean(data.noBeans),
      noSalad: Boolean(data.noSalad),
      extraFarofa: Boolean(data.extraFarofa),
      notes: data.notes || "",
      paymentMethod: data.paymentMethod || "Pix",
      paid: Boolean(data.paid),
      status: "Recebido",
      total: calculateTotal(data),
      createdAt: new Date().toISOString()
    };
  }

  function nextStatus(status, service = "Entrega") {
    const flow = service === "Retirada"
      ? ["Recebido", "Em preparo", "Pronto", "Entregue"]
      : ["Recebido", "Em preparo", "Pronto", "Saiu para entrega", "Entregue"];
    const index = flow.indexOf(status);
    if (index === -1) throw new Error("Status inválido.");
    return flow[Math.min(index + 1, flow.length - 1)];
  }

  function sumReceived(orders) {
    return orders.filter(order => order.paid).reduce((sum, order) => sum + Number(order.total), 0);
  }

  const api = { PRICES, calculateTotal, createOrder, nextStatus, sumReceived };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.MarmitaRules = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
