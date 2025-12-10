/* === PRODUCT DATA === */
let products = [
  { id:1, name:"kawul", price:450000, img:"images/harga-jerami.webp", seller:"bos endriensa", location:"JOMBANG" },
  { id:2, name:"benih jagung ayam jago", price:130000, img:"images/ayamjago.jpg", seller:"tuan muda Saiful", location:"J-team" },
  { id:3, name:"benih jagung bisi 18", price:118000, img:"images/benih2.jpg", seller:"Tuan muda Saiful", location:"J-Team" },
  { id:4, name:"benih jagung sygenta", price:272000, img:"images/benih.jpg", seller:"tuan muda saiful", location:"J-Team" },
  { id:6, name:"beras super premium", price:1200000, img:"images/beras.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:7, name:"pupuk phonska", price:370000, img:"images/ponska.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:8, name:"traktor Mesin Bajak Sawah G 1000 Boxer Diesel Kubota ", price:33990000, img:"images/traktor.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"benih beras", price:192000, img:"images/winih.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"virtako", price:112000, img:"images/obat.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"biopatex", price:79900, img:"images/biop.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"biowasil", price:62000, img:"images/biowa.png", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"Pupuk urea", price:399000, img:"images/urea.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"semprot", price:532000, img:"images/semprot.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"DJI Agras T16 Drone Disinfektan Drone Pertanian Drone Siram Pupuk", price:100000000, img:"images/drone.jpeg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"pesawat terbang pertanian", price:22000000000, img:"images/pesawat.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"Combine Harvester Temco 4CH-6.0", price:532000000000, img:"images/combi.jpg", seller:"bos endriensa", location:"J-Team" },
  { id:9, name:"cangkul logam adamantium", price:2400000000, img:"images/pacul.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"Mesin Transplanter (Tanam Padi) 4 Baris GALAXY", price:32000000, img:"images/motor.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"sepatu super", price:820000, img:"images/spatu.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"Brand New Kubota 100HP Rice and Wheat Combine Harvester/ La Maquina De Cosechadora", price:900000000, img:"images/kombi.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"ProQuip QDP100 Mesin Pompa Air Diesel Solar Pompa Air Irigasi Pompa Alkon Water Pump 4", price:5487000, img:"images/air.jpg", seller:"Tuan muda saiful", location:"J-Team" },
  { id:9, name:"PS 5", price:8000000, img:"images/ps.jpg", seller:"Tuan muda saiful", location:"J-Team" },
];

/* === STATE === */
let cart = [];
let filteredProducts = [...products];
let productRatings = {};
let generalComments = [];

/* === RENDER PRODUCT CARDS === */
function renderProducts(){
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";

  filteredProducts.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    const imgWrap = document.createElement("div");
    imgWrap.className = "card-img";
    imgWrap.innerHTML = `<img src="${p.img}" alt="${p.name}"/>`;

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = p.name;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `Rp ${p.price.toLocaleString()}`;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${p.seller} • ${p.location}`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const detailBtn = document.createElement("button");
    detailBtn.className = "btn ghost";
    detailBtn.textContent = "Detail";
    detailBtn.onclick = ()=> openModal(p);

    const cartBtn = document.createElement("button");
    cartBtn.className = "btn primary";
    cartBtn.textContent = "Tambah";
    cartBtn.onclick = ()=> addToCart(p);

    const buyBtn = document.createElement("button");
    buyBtn.className = "btn admin-btn";
    buyBtn.textContent = "Beli";
    buyBtn.onclick = ()=> {
      addToCart(p);
      openCartModal();
    };

    actions.append(detailBtn, cartBtn, buyBtn);
    body.append(title, price, meta, actions);
    card.append(imgWrap, body);

    grid.appendChild(card);
  });
}
renderProducts();

/* === SEARCH === */
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  applyFilters();
});

/* === FILTER LOKASI === */
const locationFilter = document.getElementById("filterLocation");
locationFilter.addEventListener("change", () => {
  applyFilters();
});

function applyFilters(){
  const keyword = searchInput.value.toLowerCase();
  const loc = locationFilter.value;

  filteredProducts = products.filter(p => {
    const matchKeyword = p.name.toLowerCase().includes(keyword);
    const matchLoc = loc === "all" || p.location === loc;
    return matchKeyword && matchLoc;
  });

  renderProducts();
}

/* === CART SYSTEM === */
function addToCart(product){
  const exists = cart.find(item => item.id === product.id);
  if(exists) exists.qty++;
  else cart.push({ ...product, qty:1 });

  updateCartCount();
}

function updateCartCount(){
  document.getElementById("cartCount").textContent = cart.reduce((a,b)=>a+b.qty,0);
}

/* === CART MODAL === */
document.getElementById("cartBtn").onclick = () => {
  openCartModal();
};

function openCartModal(){
  modalBody.innerHTML = `<h2>Keranjang Belanja</h2>`;
  if(cart.length === 0){
    modalBody.innerHTML += `<p>Keranjang kosong.</p>`;
  } else {
    cart.forEach(item => {
      modalBody.innerHTML += `
      <div style="padding:10px 0;border-bottom:1px solid #333;">
        <b>${item.name}</b><br>
        Harga: Rp ${item.price.toLocaleString()}<br>
        Qty: ${item.qty}<br>
        Total: Rp ${(item.qty * item.price).toLocaleString()}<br>
        <div id="cartStars-${item.id}" class="stars" style="margin:8px 0;"></div>
        <input id="cartName-${item.id}" class="input" type="text" placeholder="Nama" />
        <input id="cartPhone-${item.id}" class="input" type="tel" placeholder="No. Telepon" />
        <textarea id="cartComment-${item.id}" class="input" rows="2" placeholder="Komentar"></textarea>
        <button id="saveCartReview-${item.id}" class="btn primary">Simpan Ulasan</button>
      </div>`;
    });
    const total = cart.reduce((a,b)=>a + b.price * b.qty, 0);
    modalBody.innerHTML += `<h3 style="margin-top:20px;">Total: Rp ${total.toLocaleString()}</h3>`;
    modalBody.innerHTML += `<button id="checkoutBtn" class="btn primary">Checkout</button>`;
  }
  modal.hidden = false;
  cart.forEach(item => {
    initStars(`cartStars-${item.id}`);
    const saveBtn = document.getElementById(`saveCartReview-${item.id}`);
    saveBtn.onclick = () => {
      const starVal = getStarValue(`cartStars-${item.id}`);
      const name = document.getElementById(`cartName-${item.id}`).value.trim();
      const phone = document.getElementById(`cartPhone-${item.id}`).value.trim();
      const comment = document.getElementById(`cartComment-${item.id}`).value.trim();
      if(!productRatings[item.id]) productRatings[item.id] = [];
      productRatings[item.id].push({name, phone, comment, stars: starVal, date: new Date().toISOString()});
      alert("Ulasan tersimpan untuk " + item.name);
    };
  });
  const co = document.getElementById("checkoutBtn");
  if(co){
    co.onclick = () => {
      const total = cart.reduce((a,b)=>a + b.price * b.qty, 0);
      alert("Checkout berhasil. Total: Rp " + total.toLocaleString());
      cart = [];
      updateCartCount();
      modal.hidden = true;
    };
  }
}

/* === SIDEBAR (MOBILE MENU) === */
const sidebar = document.getElementById("sidebar");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const closeSidebar = document.getElementById("closeSidebar");

hamburgerBtn.onclick = () => sidebar.hidden = false;
closeSidebar.onclick = () => sidebar.hidden = true;
sidebar.addEventListener("click", e => {
  if(e.target.tagName === "A") sidebar.hidden = true;
});

/* === MODAL === */
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function openModal(product){
  modalBody.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.img}" style="width:100%;border-radius:12px;margin:12px 0;"/>
    <p><b>Harga:</b> Rp ${product.price.toLocaleString()}</p>
    <p><b>Penjual:</b> ${product.seller}</p>
    <p><b>Lokasi:</b> ${product.location}</p>
    <div class="stars" id="productStars" style="margin-top:10px;"></div>
    <div style="display:grid;gap:8px;margin-top:10px;">
      <input id="ratingName" class="input" type="text" placeholder="Nama" />
      <input id="ratingPhone" class="input" type="tel" placeholder="No. Telepon" />
      <textarea id="ratingComment" class="input" rows="3" placeholder="Komentar"></textarea>
      <button id="submitRating" class="btn primary">Kirim Ulasan</button>
    </div>
    <div style="margin-top:16px;">
      <button id="buyNowBtn" class="btn primary">Beli Sekarang</button>
      <button id="addCartBtn" class="btn admin-btn">Tambah ke Keranjang</button>
    </div>
    <div id="ratingsList" style="margin-top:16px;"></div>
  `;
  modal.hidden = false;
  initStars("productStars");
  const submit = document.getElementById("submitRating");
  submit.onclick = () => {
    const stars = getStarValue("productStars");
    const name = document.getElementById("ratingName").value.trim();
    const phone = document.getElementById("ratingPhone").value.trim();
    const comment = document.getElementById("ratingComment").value.trim();
    if(!productRatings[product.id]) productRatings[product.id] = [];
    productRatings[product.id].push({name, phone, comment, stars, date: new Date().toISOString()});
    renderRatingsList(product.id);
    document.getElementById("ratingName").value = "";
    document.getElementById("ratingPhone").value = "";
    document.getElementById("ratingComment").value = "";
  };
  const buyBtn = document.getElementById("buyNowBtn");
  buyBtn.onclick = () => { addToCart(product); openCartModal(); };
  const addBtn = document.getElementById("addCartBtn");
  addBtn.onclick = () => { addToCart(product); alert("Ditambahkan ke keranjang"); };
  renderRatingsList(product.id);
}
modalClose.onclick = ()=> modal.hidden = true;
modal.addEventListener("click", (e)=>{ if(e.target.classList.contains("modal-backdrop")) modal.hidden = true; });

/* === YEAR UPDATE === */
document.getElementById("year").textContent = new Date().getFullYear();

const submitComment = document.getElementById("submitComment");
if(submitComment){
  submitComment.onclick = () => {
    const name = document.getElementById("commentName").value.trim();
    const text = document.getElementById("commentText").value.trim();
    if(!text){
      alert("Komentar tidak boleh kosong");
      return;
    }
    generalComments.push({name, text, date: new Date().toISOString()});
    document.getElementById("commentName").value = "";
    document.getElementById("commentText").value = "";
    renderGeneralComments();
  };
}

function renderRatingsList(productId){
  const list = document.getElementById("ratingsList");
  if(!list) return;
  const arr = productRatings[productId] || [];
  if(arr.length === 0){
    list.innerHTML = "";
    return;
  }
  list.innerHTML = arr.map(r=>{
    const stars = "★".repeat(r.stars || 0) + "☆".repeat(5 - (r.stars || 0));
    const nm = r.name ? r.name + " • " : "";
    const ph = r.phone ? r.phone + " • " : "";
    return `<div style="border-top:1px solid #333;padding:8px 0;">${stars}<br>${nm}${ph}${r.comment || ""}</div>`;
  }).join("");
}

function renderGeneralComments(){
  const list = document.getElementById("commentsList");
  if(!list) return;
  if(generalComments.length === 0){
    list.innerHTML = `<p>Belum ada komentar.</p>`;
    return;
  }
  list.innerHTML = generalComments.map(c=>{
    const nm = c.name ? `<b>${c.name}</b>: ` : "";
    return `<div style="border-top:1px solid #333;padding:8px 0;">${nm}${c.text}</div>`;
  }).join("");
}

function initStars(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = "";
  for(let i=1;i<=5;i++){
    const s = document.createElement("span");
    s.textContent = "☆";
    s.dataset.val = String(i);
    s.className = "star";
    s.style.cursor = "pointer";
    s.style.fontSize = "20px";
    s.style.marginRight = "4px";
    s.onclick = () => {
      setStarValue(id, i);
    };
    el.appendChild(s);
  }
  setStarValue(id, 0);
}

function setStarValue(id, v){
  const el = document.getElementById(id);
  if(!el) return;
  el.dataset.value = String(v);
  [...el.querySelectorAll(".star")].forEach(star=>{
    const val = parseInt(star.dataset.val,10);
    star.textContent = val <= v ? "★" : "☆";
    star.style.color = val <= v ? "#f8c400" : "#888";
  });
}

function getStarValue(id){
  const el = document.getElementById(id);
  if(!el) return 0;
  return parseInt(el.dataset.value || "0",10) || 0;
}

/* === SCROLL ANIMATION (FADE) === */
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        if(el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "ms";
        const type = el.dataset.animate;
        if(type === "fade-left") el.classList.add("fade-left","in");
        else if(type === "fade-right") el.classList.add("fade-right","in");
        else el.classList.add("fade-anim","in");
        io.unobserve(el);
      }
    });
  }, {threshold:0.12});

  document.querySelectorAll("[data-animate]").forEach(el=>{
    const t = el.dataset.animate;
    if(t === "fade-left") el.classList.add("fade-left");
    else if(t === "fade-right") el.classList.add("fade-right");
    else el.classList.add("fade-anim");

    io.observe(el);
  });
})();

/* === BUTTON PRESS ANIMATION === */
document.addEventListener("pointerdown", (ev)=>{
  const b = ev.target.closest && ev.target.closest(".btn");
  if(!b) return;
  b.style.transform = "translateY(1px) scale(.98)";
});

document.addEventListener("pointerup", (ev)=>{
  const b = ev.target.closest && ev.target.closest(".btn");
  if(!b) return;
  b.style.transform = "";
});
