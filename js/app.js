(() => {
  const STORAGE_KEY = "marmitafacil-orders-v1";
  const rules = window.MarmitaRules;
  const $ = (selector) => document.querySelector(selector);
  const dialog = $("#order-dialog");
  const form = $("#order-form");
  const stages = ["Recebido", "Em preparo", "Pronto", "Saiu para entrega", "Entregue"];
  let orders = loadOrders();

  function loadOrders() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function saveOrders() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }
  function money(value) {
    return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  function updateHistory() {
    const dateKey = $("#history-date").value;
    const matches = rules.filterOrdersByDate(orders, dateKey);
    const list = $("#history-list");
    if (!matches.length) {
      list.innerHTML = '<div class="empty-state"><h3>Nenhum pedido nesta data</h3><p>Escolha outra data ou confira se existem pedidos salvos.</p></div>';
      return;
    }
    list.innerHTML = matches.map(order => {
      const custom = [
        order.noBeans ? "Sem feijão" : "",
        order.noSalad ? "Sem salada" : "",
        order.extraFarofa ? "Farofa extra" : ""
      ].filter(Boolean);
      const created = new Date(order.createdAt);
      const time = Number.isNaN(created.getTime())
        ? "Horário não disponível"
        : created.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      return `<article class="history-card">
        <div class="history-card-heading">
          <strong>${escapeHTML(order.customer)}</strong>
          <span class="status-pill ${order.status === "Entregue" ? "ready" : ""}">${escapeHTML(order.status || "Sem status")}</span>
        </div>
        <p class="history-details">Pedido #${escapeHTML(order.id)} · ${time} · ${escapeHTML(order.service || "Entrega")}</p>
        <p class="history-details">${Number(order.quantity) || 0}x Marmita ${escapeHTML(order.meal || "—")} · ${escapeHTML(order.paymentMethod || "Sem forma de pagamento")} · <span class="payment-pill ${order.paid ? "paid" : ""}">${order.paid ? "Pago" : "Pendente"}</span></p>
        ${custom.length ? `<div class="customization-list">${custom.map(item => `<span class="customization-pill">${item}</span>`).join("")}</div>` : ""}
        ${order.courierName ? `<p class="history-details"><strong>Entregador:</strong> ${escapeHTML(order.courierName)}</p>` : ""}
        ${order.notes ? `<p class="history-notes"><strong>Observação:</strong> ${escapeHTML(order.notes)}</p>` : ""}
        <strong class="history-total">${money(order.total)}</strong>
      </article>`;
    }).join("");
  }
  function updateCashSummary() {
    const dateKey = $("#cash-date").value;
    const summary = rules.summarizeCash(orders, dateKey);
    $("#cash-sales").textContent = money(summary.sales);
    $("#cash-received").textContent = money(summary.received);
    $("#cash-pending").textContent = money(summary.pending);
    $("#cash-pending-count").textContent = `${summary.pendingCount} pedido(s) pendente(s)`;
    $("#cash-pix").textContent = money(summary.byMethod.Pix);
    $("#cash-cash").textContent = money(summary.byMethod.Dinheiro);
    $("#cash-card").textContent = money(summary.byMethod["Cartão"]);
  }
  function updateSummary() {
    $("#total-orders").textContent = orders.length;
    $("#preparing-orders").textContent = orders.filter(o => o.status === "Em preparo").length;
    $("#ready-orders").textContent = orders.filter(o => o.status === "Pronto").length;
    $("#received-total").textContent = money(rules.sumReceived(orders));
    updateCashSummary();
    updateHistory();
  }
  function renderOrderCard(order) {
    const custom = [
      order.noBeans ? "Sem feijão" : "",
      order.noSalad ? "Sem salada" : "",
      order.extraFarofa ? "Farofa extra" : ""
    ].filter(Boolean);
    const statusClass = order.status === "Pronto" || order.status === "Entregue" ? "ready" : order.status === "Em preparo" ? "preparing" : "";
    const next = rules.nextStatus(order.status, order.service);
    const canAdvance = order.status !== "Entregue";
    return `<article class="order-card">
      <div class="order-main">
        <div class="order-topline"><strong>${escapeHTML(order.customer)}</strong><span class="status-pill ${statusClass}">${escapeHTML(order.status)}</span></div>
        <div class="order-meta">#${escapeHTML(order.id)} · ${order.quantity}x Marmita ${escapeHTML(order.meal)} · ${escapeHTML(order.service)}${order.address ? " · " + escapeHTML(order.address) : ""}</div>
        ${custom.length ? `<div class="customization-list" aria-label="Personalizações">${custom.map(item => `<span class="customization-pill">${item}</span>`).join("")}</div>` : ""}
        ${order.notes ? `<div class="order-notes"><strong>Observação:</strong> ${escapeHTML(order.notes)}</div>` : ""}
        ${order.service !== "Retirada" ? `<div class="order-meta"><strong>Entregador:</strong> ${order.courierName ? escapeHTML(order.courierName) : "Ainda não definido"}</div>` : ""}
        <div class="order-meta">${escapeHTML(order.paymentMethod)} · <span class="payment-pill ${order.paid ? "paid" : ""}">${order.paid ? "Pago" : "Pendente"}</span></div>
      </div>
      <div class="order-side">
        <strong class="order-total">${money(order.total)}</strong>
        <div class="card-actions">
          ${canAdvance ? `<button class="small-button" data-action="advance" data-id="${escapeHTML(order.id)}">Avançar para: ${escapeHTML(next)}</button>` : ""}
          ${order.service !== "Retirada" ? `<button class="small-button" data-action="courier" data-id="${escapeHTML(order.id)}">${order.courierName ? "Alterar entregador" : "Definir entregador"}</button>` : ""}
          <button class="small-button" data-action="payment" data-id="${escapeHTML(order.id)}">${order.paid ? "Marcar pendente" : "Marcar pago"}</button>
          <button class="small-button whatsapp-button" data-action="whatsapp" data-id="${escapeHTML(order.id)}">WhatsApp</button>
        </div>
      </div>
    </article>`;
  }
  function renderOrders() {
    const filter = $("#status-filter").value;
    const list = $("#orders-list");
    const visible = orders.filter(order => filter === "all" || order.status === filter);
    if (!visible.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">＋</div><h3>Nenhum pedido encontrado</h3><p>Cadastre um pedido ou altere o filtro.</p></div>`;
      updateSummary();
      return;
    }
    const known = stages.map(status => {
      const items = visible.filter(order => order.status === status);
      return { status, items };
    });
    const unknown = visible.filter(order => !stages.includes(order.status));
    list.innerHTML = known.map(({ status, items }) => `
      <section class="stage-column" aria-label="Pedidos: ${status}">
        <div class="stage-heading">
          <h3>${status === "Saiu para entrega" ? "Em entrega" : status}</h3>
          <span class="stage-count">${items.length}</span>
        </div>
        <div class="stage-orders">
          ${items.length ? items.slice().reverse().map(renderOrderCard).join("") : '<p class="stage-empty">Nenhum pedido nesta etapa</p>'}
        </div>
      </section>
    `).join("") + (unknown.length ? `<section class="stage-column"><div class="stage-heading"><h3>Outros</h3><span class="stage-count">${unknown.length}</span></div><div class="stage-orders">${unknown.map(renderOrderCard).join("")}</div></section>` : "");
    updateSummary();
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }
  function formData() {
    const data = new FormData(form);
    return {
      customer: data.get("customer"), phone: data.get("phone"), service: data.get("service"),
      address: data.get("address"), courierName: data.get("courierName"), meal: data.get("meal"), quantity: data.get("quantity"),
      noBeans: data.has("noBeans"), noSalad: data.has("noSalad"), extraFarofa: data.has("extraFarofa"),
      notes: data.get("notes"), paymentMethod: data.get("paymentMethod"), paid: data.get("paid") === "true"
    };
  }
  function updateServiceFields() {
    const isDelivery = form.elements.service.value === "Entrega";
    $("#address-field").hidden = !isDelivery;
    $("#courier-field").hidden = !isDelivery;
    if (!isDelivery) {
      form.elements.address.value = "";
      form.elements.courierName.value = "";
    }
  }
  function updatePricePreview() {
    try { $("#price-preview").textContent = money(rules.calculateTotal(formData())); }
    catch { $("#price-preview").textContent = "—"; }
  }

  function openOrderDialog() {
    if (!dialog) {
      alert("Não foi possível localizar a janela de cadastro. Atualize a página e tente novamente.");
      return;
    }
    try {
      if (typeof dialog.showModal === "function") {
        if (!dialog.open) dialog.showModal();
      } else {
        // Compatibilidade com navegadores sem suporte ao método showModal().
        dialog.setAttribute("open", "");
        document.body.classList.add("dialog-open");
      }
    } catch (error) {
      console.error("Erro ao abrir o cadastro de pedidos:", error);
      dialog.setAttribute("open", "");
      document.body.classList.add("dialog-open");
    }
  }
  function closeOrderDialog() {
    if (!dialog) return;
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
  }

  $("#new-order-button").addEventListener("click", openOrderDialog);
  $("#close-dialog").addEventListener("click", closeOrderDialog);
  $("#cancel-dialog").addEventListener("click", closeOrderDialog);
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
  $("#status-filter").addEventListener("change", renderOrders);
  form.elements.service.addEventListener("change", updateServiceFields);
  $("#cash-date").addEventListener("change", updateCashSummary);
  $("#history-date").addEventListener("change", updateHistory);
  form.addEventListener("input", updatePricePreview);
  form.addEventListener("change", updatePricePreview);
  form.addEventListener("submit", event => {
    event.preventDefault();
    try {
      orders.push(rules.createOrder(formData()));
      saveOrders();
      form.reset();
      updateServiceFields();
      $("#meal-select").value = "M";
      updatePricePreview();
      dialog.close();
      renderOrders();
    } catch (error) {
      alert(error.message);
    }
  });
  $("#orders-list").addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const order = orders.find(item => String(item.id) === button.dataset.id);
    if (!order) return;
    if (button.dataset.action === "whatsapp") {
      try {
        const whatsappUrl = rules.buildWhatsAppLink(order);
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch (error) { alert(error.message); }
      return;
    }
    if (button.dataset.action === "advance") order.status = rules.nextStatus(order.status, order.service);
    if (button.dataset.action === "payment") order.paid = !order.paid;
    if (button.dataset.action === "courier") {
      const name = prompt("Informe o nome do entregador:", order.courierName || "");
      if (name === null) return;
      try { rules.assignCourier(order, name); }
      catch (error) { alert(error.message); return; }
    }
    saveOrders();
    renderOrders();
  });

  const today = rules.localDateKey(new Date());
  $("#cash-date").value = today;
  $("#history-date").value = today;
  updatePricePreview();
  renderOrders();
})();