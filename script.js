// Data Produk HP Rofik Cell
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 24999000,
    specs: "256GB / Titanium / A17 Pro",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 21999000,
    specs: "12GB RAM / 512GB / Snapdragon 8 Gen 3",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    price: 12999000,
    specs: "12GB RAM / 256GB / Leica Lens",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "OPPO Find N3 Flip",
    brand: "OPPO",
    price: 15999000,
    specs: "12GB RAM / 256GB / Hasselblad Camera",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "vivo X100 Pro",
    brand: "vivo",
    price: 16999000,
    specs: "16GB RAM / 512GB / ZEISS Optics",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Infinix Zero 30 5G",
    brand: "Infinix",
    price: 3999000,
    specs: "12GB RAM / 256GB / 4K 60fps Front Cam",
    image: "https://images.unsplash.com/photo-1546054454-aa25e27770e9?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 7,
    name: "Realme GT 5 Pro",
    brand: "Realme",
    price: 8999000,
    specs: "16GB RAM / 512GB / Snapdragon 8 Gen 3",
    image: "https://images.unsplash.com/photo-1574944985070-8f30c4397e3c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 8,
    name: "iPhone 13",
    brand: "Apple",
    price: 10299000,
    specs: "128GB / A15 Bionic / Super Retina XDR",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=500&q=80"
  }
];

// Format Angka ke Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

// Navigasi Halaman SPA
function showPage(pageId) {
  const homePage = document.getElementById('page-home');
  const katalogPage = document.getElementById('page-katalog');
  const navHome = document.getElementById('nav-home');
  const navKatalog = document.getElementById('nav-katalog');

  if (pageId === 'home') {
    homePage.classList.remove('hidden');
    katalogPage.classList.add('hidden');
    navHome.classList.add('text-yellow-300', 'font-bold', 'border-b-2', 'border-yellow-300');
    navKatalog.classList.remove('text-yellow-300', 'font-bold', 'border-b-2', 'border-yellow-300');
  } else {
    homePage.classList.add('hidden');
    katalogPage.classList.remove('hidden');
    navKatalog.classList.add('text-yellow-300', 'font-bold', 'border-b-2', 'border-yellow-300');
    navHome.classList.remove('text-yellow-300', 'font-bold', 'border-b-2', 'border-yellow-300');
    renderProducts(products);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Produk ke Grid
function renderProducts(items) {
  const container = document.getElementById('product-grid');
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500">Produk tidak ditemukan.</div>`;
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow border overflow-hidden relative product-card flex flex-col justify-between';
    card.innerHTML = `
      <div>
        <span class="badge-brand">${product.brand}</span>
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="font-bold text-gray-800 text-lg mb-1">${product.name}</h3>
          <p class="text-xs text-gray-500 mb-3">${product.specs}</p>
          <p class="text-blue-600 font-extrabold text-xl mb-4">${formatRupiah(product.price)}</p>
        </div>
      </div>
      <div class="px-4 pb-4">
        <button onclick="buyProduct('${product.name}')" class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
          <i class="fa-brands fa-whatsapp text-lg"></i> Beli Sekarang
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Filter Produk berdasarkan Brand & Search Keyword
function filterProducts() {
  const searchVal = document.getElementById('search-input').value.toLowerCase();
  const brandVal = document.getElementById('brand-filter').value;

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.specs.toLowerCase().includes(searchVal);
    const matchesBrand = brandVal === 'all' || p.brand === brandVal;
    return matchesSearch && matchesBrand;
  });

  renderProducts(filtered);
}

// Simulasi Beli lewat WhatsApp
function buyProduct(name) {
  const message = encodeURIComponent(`Halo Rofiq Cell, saya berminat untuk membeli HP ${name}. Apakah stok masih ada?`);
  window.open(`https://wa.me/62755716716?text=${message}`, '_blank');
}

// Inisialisasi awal
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});