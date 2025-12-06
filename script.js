const state = {
  products: [],
  orders: [],
  comments: [],
};

const LS_KEYS = {
  orders: "shop_orders",
  comments: "shop_comments",
  products: "shop_products",
};

function loadState() {
  const orders = JSON.parse(localStorage.getItem(LS_KEYS.orders) || "[]");
  const comments = JSON.parse(localStorage.getItem(LS_KEYS.comments) || "[]");
  const productsLS = JSON.parse(localStorage.getItem(LS_KEYS.products) || "null");
  state.orders = Array.isArray(orders) ? orders : [];
  state.comments = Array.isArray(comments) ? comments : [];
  state.products = Array.isArray(productsLS) ? productsLS : defaultProducts();
}

function saveOrders() {
  localStorage.setItem(LS_KEYS.orders, JSON.stringify(state.orders));
}

function saveComments() {
  localStorage.setItem(LS_KEYS.comments, JSON.stringify(state.comments));
}

function saveProducts() {
  localStorage.setItem(LS_KEYS.products, JSON.stringify(state.products));
}

function defaultProducts() {
  const today = ymd(new Date());
  return [
    {
      id: "p1",
      name: "el shark grand maja",
      price: 59000,
      stock: 20,
      saleStart: today,
      saleEnd: "2026-01-31",
      image: svgUri(productSVG("bottle", "#f7a8c4")),
    },
    {
      id: "p2",
      name: "mega frostbon",
      price: 99000,
      stock: 15,
      saleStart: today,
      saleEnd: "2026-02-10",
      image: svgUri(productSVG("bag", "#fbc6d7")),
    },
    {
      id: "p3",
      name: "mega zombi",
      price: 49000,
      stock: 30,
      saleStart: today,
      saleEnd: "2026-03-01",
      image: svgUri(productSVG("mug", "#fde1eb")),
    },
    {
      id: "p4",
      name: "megalodon",
      price: 75000,
      stock: 25,
      saleStart: today,
      saleEnd: "2026-02-01",
      image: svgUri(productSVG("book", "#f7a8c4")),
    },
  ];
}

function productSVG(kind, accent) {
  const bg = "#ffffff";
  const border = "#e9e9ee";
  const shadow = "rgba(0,0,0,0.08)";
  if (kind === "bottle") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
      <rect x='0' y='0' width='512' height='512' fill='${bg}'/>
      <g>
        <rect x='210' y='60' width='92' height='80' rx='18' fill='${accent}'/>
        <rect x='190' y='130' width='132' height='280' rx='40' fill='${accent}' opacity='0.3' stroke='${border}' stroke-width='6'/>
        <circle cx='256' cy='260' r='80' fill='${accent}' opacity='0.15'/>
      </g>
    </svg>`;
  }
  if (kind === "bag") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
      <rect x='0' y='0' width='512' height='512' fill='${bg}'/>
      <rect x='120' y='180' width='272' height='180' rx='28' fill='${accent}' stroke='${border}' stroke-width='6'/>
      <path d='M170 180 C170 140, 342 140, 342 180' fill='none' stroke='${accent}' stroke-width='14'/>
      <circle cx='256' cy='270' r='82' fill='${accent}' opacity='0.12'/>
    </svg>`;
  }
  if (kind === "mug") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
      <rect x='0' y='0' width='512' height='512' fill='${bg}'/>
      <rect x='120' y='170' width='220' height='180' rx='20' fill='${accent}' stroke='${border}' stroke-width='6'/>
      <rect x='340' y='200' width='60' height='120' rx='30' fill='${accent}' opacity='0.45'/>
      <circle cx='230' cy='260' r='70' fill='${accent}' opacity='0.14'/>
    </svg>`;
  }
  if (kind === "book") {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
      <rect x='0' y='0' width='512' height='512' fill='${bg}'/>
      <rect x='120' y='120' width='272' height='272' rx='18' fill='${accent}' stroke='${border}' stroke-width='6'/>
      <line x1='160' y1='160' x2='352' y2='160' stroke='${border}' stroke-width='8'/>
      <line x1='160' y1='200' x2='352' y2='200' stroke='${border}' stroke-width='8'/>
      <line x1='160' y1='240' x2='352' y2='240' stroke='${border}' stroke-width='8'/>
    </svg>`;
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='512' height='512' fill='${accent}'/></svg>`;
}

function svgUri(svg) {
  const encoded = encodeURIComponent(svg)
    .replace(/%20/g, " ")
    .replace(/%0A/g, "")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/");
  return `data:image/svg+xml;utf8,${encoded}`;
}

function formatPrice(n) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function dateStr(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function avgRating(productId) {
  const list = state.comments.filter(c => c.productId === productId);
  if (!list.length) return 0;
  const s = list.reduce((a, b) => a + (b.rating || 0), 0);
  return s / list.length;
}

function isSaleActive(product) {
  const now = Date.now();
  const start = product.saleStart ? new Date(product.saleStart).getTime() : 0;
  const end = new Date(product.saleEnd).getTime();
  return now >= start && now <= end && product.stock > 0;
}

function renderStars(value) {
  const v = Math.round(value);
  let s = "";
  for (let i = 1; i <= 5; i++) s += i <= v ? "★" : "☆";
  return s;
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";
  state.products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;
    img.loading = "lazy";
    img.className = "card-img";
    const body = document.createElement("div");
    body.className = "card-body";
    const title = document.createElement("div");
    title.textContent = p.name;
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = formatPrice(p.price);
    const meta = document.createElement("div");
    meta.className = "meta";
    const stock = document.createElement("span");
    stock.textContent = `Stok: ${p.stock}`;
    const date = document.createElement("span");
    const startTxt = p.saleStart ? dateStr(p.saleStart) : "—";
    date.textContent = `Tersedia: ${startTxt} s/d ${dateStr(p.saleEnd)}`;
    const stars = document.createElement("span");
    stars.className = "stars";
    stars.textContent = renderStars(avgRating(p.id));
    meta.append(stock, date, stars);
    const actions = document.createElement("div");
    actions.className = "actions";
    const buy = document.createElement("button");
    buy.className = "btn buy";
    buy.textContent = isSaleActive(p) ? "Beli" : "Tidak Tersedia";
    buy.disabled = !isSaleActive(p);
    buy.addEventListener("click", () => openBuyModal(p.id));
    const detail = document.createElement("button");
    detail.className = "btn detail";
    detail.textContent = "Detail";
    detail.addEventListener("click", () => openDetailModal(p.id));
    actions.append(buy, detail);
    body.append(title, price, meta, actions);
    card.append(img, body);
    grid.append(card);
  });
}

function ymd(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function renderAdminProducts() {
  const cont = document.getElementById("products-admin");
  if (!cont) return;
  cont.innerHTML = "";
  state.products.forEach(p => {
    const item = document.createElement("div");
    item.className = "product-item";
    const row1 = document.createElement("div");
    row1.className = "product-row";
    const name = document.createElement("div");
    name.textContent = p.name;
    const avail = document.createElement("div");
    avail.className = "meta";
    avail.textContent = `Tersedia ${p.saleStart ? dateStr(p.saleStart) : "—"} s/d ${dateStr(p.saleEnd)}`;
    row1.append(name, avail);

    const rowImg = document.createElement("div");
    rowImg.className = "product-row";
    const imgLabel = document.createElement("div");
    imgLabel.textContent = "Gambar";
    const imgPreview = document.createElement("img");
    imgPreview.className = "img-preview";
    imgPreview.alt = p.name;
    imgPreview.src = p.image;
    const imgUrl = document.createElement("input");
    imgUrl.className = "input";
    imgUrl.placeholder = "URL gambar atau data URI";
    imgUrl.value = p.image;
    const imgFile = document.createElement("input");
    imgFile.type = "file";
    imgFile.accept = "image/*";
    let selectedDataUrl = null;
    imgFile.addEventListener("change", () => {
      const f = imgFile.files && imgFile.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        selectedDataUrl = String(reader.result);
        imgPreview.src = selectedDataUrl;
      };
      reader.readAsDataURL(f);
    });
    const applyImg = document.createElement("button");
    applyImg.className = "btn ghost";
    applyImg.textContent = "Terapkan Gambar";
    applyImg.addEventListener("click", () => {
      const src = selectedDataUrl || imgUrl.value.trim();
      if (!src) return;
      p.image = src;
      imgPreview.src = src;
      saveProducts();
      renderProducts();
    });
    const imgTools = document.createElement("div");
    imgTools.className = "img-tools";
    imgTools.append(imgUrl, imgFile, applyImg);
    rowImg.append(imgLabel, imgPreview, imgTools);

    const row2 = document.createElement("div");
    row2.className = "product-row";
    const priceLabel = document.createElement("div");
    priceLabel.textContent = "Harga";
    const priceInput = document.createElement("input");
    priceInput.className = "input";
    priceInput.type = "number";
    priceInput.step = "1000";
    priceInput.value = String(p.price);

    const stockLabel = document.createElement("div");
    stockLabel.textContent = "Stok";
    const stockInput = document.createElement("input");
    stockInput.className = "input";
    stockInput.type = "number";
    stockInput.min = "0";
    stockInput.value = String(p.stock);

    const restokLabel = document.createElement("div");
    restokLabel.textContent = "Restok";
    const restokInput = document.createElement("input");
    restokInput.className = "input";
    restokInput.type = "number";
    restokInput.min = "0";
    restokInput.placeholder = "Jumlah";

    const startLabel = document.createElement("div");
    startLabel.textContent = "Tanggal tersedia";
    const startInput = document.createElement("input");
    startInput.className = "input";
    startInput.type = "date";
    startInput.value = p.saleStart ? p.saleStart : ymd(new Date());

    const endLabel = document.createElement("div");
    endLabel.textContent = "Batas tanggal";
    const endInput = document.createElement("input");
    endInput.className = "input";
    endInput.type = "date";
    endInput.value = p.saleEnd;

    row2.append(priceLabel, priceInput, stockLabel, stockInput, restokLabel, restokInput, startLabel, startInput, endLabel, endInput);

    const row3 = document.createElement("div");
    row3.className = "product-row";
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn primary";
    saveBtn.textContent = "Simpan";
    saveBtn.addEventListener("click", () => {
      const price = parseInt(priceInput.value, 10);
      const stock = parseInt(stockInput.value, 10);
      const start = startInput.value;
      const end = endInput.value;
      if (!(price >= 0) || !(stock >= 0) || !end) return;
      p.price = price;
      p.stock = stock;
      p.saleStart = start;
      p.saleEnd = end;
      saveProducts();
      renderProducts();
      renderAdminProducts();
    });
    const restokBtn = document.createElement("button");
    restokBtn.className = "btn ghost";
    restokBtn.textContent = "Tambah Restok";
    restokBtn.addEventListener("click", () => {
      const add = parseInt(restokInput.value, 10);
      if (!(add > 0)) return;
      p.stock += add;
      restokInput.value = "";
      stockInput.value = String(p.stock);
      saveProducts();
      renderProducts();
      renderAdminProducts();
    });
    row3.append(saveBtn, restokBtn);

    item.append(row1, rowImg, row2, row3);
    cont.append(item);
  });
}

function openModal(content) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modalBody");
  body.innerHTML = "";
  body.append(content);
  modal.hidden = false;
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.hidden = true;
}

function openDetailModal(productId) {
  const p = state.products.find(x => x.id === productId);
  const wrap = document.createElement("div");
  wrap.className = "detail-layout";
  const left = document.createElement("div");
  left.className = "detail-img";
  const img = document.createElement("img");
  img.src = p.image;
  img.alt = p.name;
  img.loading = "lazy";
  left.append(img);
  const right = document.createElement("div");
  right.className = "detail-info";
  const h = document.createElement("h3");
  h.textContent = p.name;
  const pr = document.createElement("div");
  pr.className = "price";
  pr.textContent = formatPrice(p.price);
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `Stok ${p.stock} • Berakhir ${dateStr(p.saleEnd)}`;
  const star = document.createElement("div");
  star.className = "stars";
  star.textContent = renderStars(avgRating(p.id));
  const actions = document.createElement("div");
  actions.className = "detail-actions";
  const buy = document.createElement("button");
  buy.className = "btn buy";
  buy.textContent = isSaleActive(p) ? "Beli" : "Tidak Tersedia";
  buy.disabled = !isSaleActive(p);
  buy.addEventListener("click", () => openBuyModal(p.id));
  actions.append(buy);
  right.append(h, pr, meta, star, actions);

  const commentsTitle = document.createElement("h4");
  commentsTitle.textContent = "Komentar & Rating";
  const commentForm = createCommentForm(p.id);
  const commentList = createCommentList(p.id);
  right.append(commentsTitle, commentForm, commentList);

  wrap.append(left, right);
  openModal(wrap);
}

function createCommentForm(productId) {
  const form = document.createElement("div");
  form.className = "form";
  const name = document.createElement("input");
  name.className = "input";
  name.placeholder = "Nama";
  const text = document.createElement("textarea");
  text.className = "textarea";
  text.placeholder = "Tulis komentar";
  const emoji = document.createElement("div");
  const emojiBtn = document.createElement("button");
  emojiBtn.className = "btn ghost";
  emojiBtn.textContent = "Emoji";
  const emojiPicker = createEmojiPicker(em => {
    insertAtCursor(text, em);
  });
  emoji.append(emojiBtn);
  emojiBtn.addEventListener("click", () => {
    if (emoji.contains(emojiPicker)) emoji.removeChild(emojiPicker); else emoji.append(emojiPicker);
  });
  const ratingWrap = document.createElement("div");
  const ratingText = document.createElement("div");
  ratingText.textContent = "Rating:";
  const stars = document.createElement("div");
  stars.className = "stars";
  let current = 0;
  const starEls = [];
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement("button");
    s.type = "button";
    s.className = "btn ghost";
    s.textContent = "☆";
    s.addEventListener("click", () => {
      current = i;
      starEls.forEach((el, idx) => el.textContent = idx < i ? "★" : "☆");
    });
    starEls.push(s);
    stars.append(s);
  }
  ratingWrap.append(ratingText, stars);
  const submit = document.createElement("button");
  submit.className = "btn primary";
  submit.textContent = "Kirim Komentar";
  submit.addEventListener("click", () => {
    const nm = name.value.trim();
    const tx = text.value.trim();
    if (!nm || !tx || current === 0) return;
    const c = { id: "c" + cryptoRandom(), productId, authorName: nm, text: tx, rating: current, createdAt: Date.now() };
    state.comments.push(c);
    saveComments();
    openDetailModal(productId);
  });
  form.append(name, text, emoji, ratingWrap, submit);
  return form;
}

function createEmojiPicker(onPick) {
  const wrap = document.createElement("div");
  wrap.className = "emoji-picker";
  const list = ["😀","😊","😍","🥰","😎","👍","👏","🎉","✨","💖","🛍️","📦","☕","📘","👜","🧴","🌸","💡","✅","💬"];
  list.forEach(e => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "emoji-btn";
    b.textContent = e;
    b.addEventListener("click", () => onPick(e));
    wrap.append(b);
  });
  return wrap;
}

function insertAtCursor(el, str) {
  const start = el.selectionStart || 0;
  const end = el.selectionEnd || 0;
  const val = el.value;
  el.value = val.slice(0, start) + str + val.slice(end);
  const pos = start + str.length;
  el.selectionStart = el.selectionEnd = pos;
  el.focus();
}

function createCommentList(productId) {
  const wrap = document.createElement("div");
  wrap.className = "comment-list";
  const list = state.comments.filter(c => c.productId === productId).sort((a, b) => b.createdAt - a.createdAt);
  list.forEach(c => {
    const item = document.createElement("div");
    item.className = "comment-item";
    const head = document.createElement("div");
    head.className = "comment-head";
    const left = document.createElement("div");
    left.textContent = `${c.authorName}`;
    const right = document.createElement("div");
    right.className = "stars";
    right.textContent = renderStars(c.rating);
    head.append(left, right);
    const body = document.createElement("div");
    body.textContent = c.text;
    const time = document.createElement("div");
    time.className = "meta";
    time.textContent = new Date(c.createdAt).toLocaleString("id-ID");
    item.append(head, body, time);
    wrap.append(item);
  });
  return wrap;
}

function openBuyModal(productId) {
  const p = state.products.find(x => x.id === productId);
  const wrap = document.createElement("div");
  wrap.className = "form";
  const title = document.createElement("h3");
  title.textContent = `Beli: ${p.name}`;
  const name = document.createElement("input");
  name.className = "input";
  name.placeholder = "Nama Pembeli";
  const qty = document.createElement("input");
  qty.className = "input";
  qty.type = "number";
  qty.min = "1";
  qty.max = String(p.stock);
  qty.placeholder = `Jumlah (maks ${p.stock})`;
  const note = document.createElement("textarea");
  note.className = "textarea";
  note.placeholder = "Catatan pesanan";
  const submit = document.createElement("button");
  submit.className = "btn primary";
  submit.textContent = "Pesan";
  const statusText = document.createElement("div");
  statusText.className = "meta";
  submit.addEventListener("click", () => {
    const nm = name.value.trim();
    const q = parseInt(qty.value, 10);
    if (!nm || !q || q < 1) return;
    if (!isSaleActive(p)) return;
    if (q > p.stock) return;
    const order = { id: "o" + cryptoRandom(), productId, buyerName: nm, quantity: q, note: note.value.trim(), status: "baru", adminReply: "", createdAt: Date.now() };
    state.orders.push(order);
    p.stock -= q;
    saveOrders();
    saveProducts();
    renderProducts();
    statusText.textContent = "Pesanan dibuat. Kami akan menghubungi Anda.";
  });
  wrap.append(title, name, qty, note, submit, statusText);
  openModal(wrap);
}

function renderOrders() {
  const cont = document.getElementById("orders-list");
  cont.innerHTML = "";
  const orders = state.orders.slice().sort((a, b) => b.createdAt - a.createdAt);
  if (!orders.length) {
    const empty = document.createElement("div");
    empty.className = "meta";
    empty.textContent = "Belum ada pesanan";
    cont.append(empty);
    return;
  }
  orders.forEach(o => {
    const item = document.createElement("div");
    item.className = "order-item";
    const row1 = document.createElement("div");
    row1.className = "order-row";
    const p = state.products.find(x => x.id === o.productId);
    const a = document.createElement("div");
    a.textContent = `${p ? p.name : o.productId} • ${formatPrice(p ? p.price : 0)} x ${o.quantity}`;
    const b = document.createElement("div");
    b.className = "status-badge";
    b.textContent = o.status;
    row1.append(a, b);
    const row2 = document.createElement("div");
    row2.className = "order-row";
    const buyer = document.createElement("div");
    buyer.textContent = `Pembeli: ${o.buyerName}`;
    const time = document.createElement("div");
    time.className = "meta";
    time.textContent = new Date(o.createdAt).toLocaleString("id-ID");
    row2.append(buyer, time);
    const row3 = document.createElement("div");
    row3.className = "order-row";
    const note = document.createElement("div");
    note.textContent = o.note ? `Catatan: ${o.note}` : "";
    row3.append(note);
    const row4 = document.createElement("div");
    row4.className = "order-row";
    const select = document.createElement("select");
    select.className = "select";
    ["baru","diproses","selesai","dibatalkan"].forEach(s => {
      const opt = document.createElement("option");
      opt.value = s; opt.textContent = s; if (o.status === s) opt.selected = true; select.append(opt);
    });
    const reply = document.createElement("input");
    reply.className = "input";
    reply.placeholder = "Balasan admin";
    reply.value = o.adminReply || "";
    const update = document.createElement("button");
    update.className = "btn primary";
    update.textContent = "Perbarui";
    update.addEventListener("click", () => {
      o.status = select.value;
      o.adminReply = reply.value.trim();
      saveOrders();
      renderOrders();
    });
    row4.append(select, reply, update);
    item.append(row1, row2, row3, row4);
    cont.append(item);
  });
}

function cryptoRandom() {
  const a = Math.random().toString(36).slice(2, 8);
  const b = Math.random().toString(36).slice(2, 8);
  return a + b;
}

function init() {
  loadState();
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("ctaBelanja").addEventListener("click", () => {
    document.getElementById("produk").scrollIntoView({ behavior: "smooth" });
  });
  const adminToggle = document.getElementById("adminToggle");
  adminToggle.addEventListener("click", () => {
    const panel = document.getElementById("admin");
    const hidden = panel.hasAttribute("hidden");
    if (hidden) panel.removeAttribute("hidden"); else panel.setAttribute("hidden", "");
    renderAdminProducts();
    renderOrders();
  });
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  renderProducts();
}

document.addEventListener("DOMContentLoaded", init);
