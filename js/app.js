(() => {
  const STORAGE_KEY = "marmitafacil-orders-v1";
  const rules = window.MarmitaRules;
  const $ = (selector) => document.querySelector(selector);
  const dialog = $("#order-dialog");
  const form = $("#order-form");
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
  function updateSummary() {
    $("#total-orders").textContent = orders.length;
    $("#preparing-orders").textContent = orders.filter(o => o.status === "Em preparo").length;
    $("#ready-orders").textContent = orders.filter(o => o.status === "Pronto").length;
    $("#received-total").textContent = money(rules.sumReceived(orders));
  }
  function renderOrders() {
    const filter = $("#status-filter").value;
    const visible = orders.filter(o => filter === "all" || o.status === filter);
    const list = $("#orders-list");
    if (!visible.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">＋</div><h3>Nenhum pedido encontrado</h3><p>Cadastre um pedido ou altere o filtro.</p></div>`;
      updateSummary();
      return;
    }
    list.innerHTML = visible.slice().reverse().map(order => {
      const custom = [
        order.noBeans ? "Sem feijão" : "",
        order.noSalad ? "Sem salada" : "",
        order.extraFarofa ? "Farofa extra" : ""
      ].filter(Boolean).join(" · ");
      const statusClass = order.status === "Pronto" || order.status === "Entregue" ? "ready" : order.status === "Em preparo" ? "preparing" : "";
      const next = rules.nextStatus(order.status);
      const canAdvance = order.status !== "Entregue";
      return `<article class="order-card">
        <div class="order-main">
          <div class="order-topline"><strong>${escapeHTML(order.customer)}</strong><span class="status-pill ${statusClass}">${order.status}</span></div>
          <div class="order-meta">#${order.id} · ${order.quantity}x Marmita ${order.meal} · ${order.service}${order.address ? " · " + escapeHTML(order.address) : ""}</div>
          ${custom || order.notes ? `<div class="order-notes">${[custom, escapeHTML(order.notes)].filter(Boolean).join(" · ")}</div>` : ""}
          <div class="order-meta">${order.paymentMethod} · <span class="payment-pill ${order.paid ? "paid" : ""}">${order.paid ? "Pago" : "Pendente"}</span></div>
        </div>
        <div class="order-side">
          <strong class="order-total">${money(order.total)}</strong>
          <div class="card-actions">
            ${canAdvance ? `<button class="small-button" data-action="advance" data-id="${order.id}">Avançar: ${next}</button>` : ""}
            <button class="small-button" data-action="payment" data-id="${order.id}">${order.paid ? "Marcar pendente" : "Marcar pago"}</button>
          </div>
        </div>
      </article>`;
    }).join("");
    updateSummary();
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }
  function formData() {
    const data = new FormData(form);
    return {
      customer: data.get("customer"), phone: data.get("phone"), service: data.get("service"),
      address: data.get("address"), meal: data.get("meal"), quantity: data.get("quantity"),
      noBeans: data.has("noBeans"), noSalad: data.has("noSalad"), extraFarofa: data.has("extraFarofa"),
      notes: data.get("notes"), paymentMethod: data.get("paymentMethod"), paid: data.get("paid") === "true"
    };
  }
  function updatePricePreview() {
    try { $("#price-preview").textContent = money(rules.calculateTotal(formData())); }
    catch { $("#price-preview").textContent = "—"; }
  }

  $("#new-order-button").addEventListener("click", () => dialog.showModal());
  $("#close-dialog").addEventListener("click", () => dialog.close());
  $("#cancel-dialog").addEventListener("click", () => dialog.close());
  $("#status-filter").addEventListener("change", renderOrders);
  form.addEventListener("input", updatePricePreview);
  form.addEventListener("change", updatePricePreview);
  form.addEventListener("submit", event => {
    event.preventDefault();
    try {
      orders.push(rules.createOrder(formData()));
      saveOrders();
      form.reset();
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
    if (button.dataset.action === "advance") order.status = rules.nextStatus(order.status);
    if (button.dataset.action === "payment") order.paid = !order.paid;
    saveOrders();
    renderOrders();
  });

  updatePricePreview();
  renderOrders();
})();
