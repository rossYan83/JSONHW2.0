import Handlebars from 'handlebars';
import templateSource from './template.hbs?raw';

// Компіляція шаблону Handlebars
const template = Handlebars.compile(templateSource);

// ========== МАСИВ ДАНИХ ПРОДУКТІВ ==========
const products = [
  {
    name: 'Ноутбук Lenovo',
    price: 25000,
    description: 'Потужний ноутбук для роботи та навчання'
  },
  {
    name: 'Смартфон Samsung Galaxy',
    price: 15000,
    description: 'Сучасний смартфон з відмінною камерою'
  },
  {
    name: 'Навушники Sony',
    price: 3500,
    description: 'Бездротові навушники з шумозаглушенням'
  },
  {
    name: 'Клавіатура Logitech',
    price: 1200,
    description: 'Механічна клавіатура для геймерів'
  },
  {
    name: 'Миша Razer',
    price: 800,
    description: 'Ігрова миша з RGB підсвіткою'
  },
  {
    name: 'Монітор Dell',
    price: 8000,
    description: '27" монітор з роздільною здатністю 4K'
  }
];

// ========== ЗАВДАННЯ 1: ЗАКЛАДКИ ==========
const bookmarkInput = document.getElementById('bookmarkInput');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');
const bookmarkList = document.getElementById('bookmarkList');

function loadBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarkList.innerHTML = '';
  
  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${bookmark}" target="_blank">${bookmark}</a>
      <button class="delete" data-index="${index}">X</button>
    `;
    bookmarkList.appendChild(li);
  });
}

addBookmarkBtn.addEventListener('click', () => {
  const url = bookmarkInput.value.trim();
  
  if (url === '') {
    alert('Будь ласка, введіть URL');
    return;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    alert('URL повинен починатися з http:// або https://');
    return;
  }

  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push(url);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  
  bookmarkInput.value = '';
  loadBookmarks();
});

bookmarkList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = parseInt(e.target.getAttribute('data-index'));
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    loadBookmarks();
  }
});

bookmarkInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBookmarkBtn.click();
  }
});

loadBookmarks();

// ========== ЗАВДАННЯ 2: ФОРМА ==========
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const saveBtn = document.getElementById('saveBtn');
const savedMessage = document.getElementById('savedMessage');

function loadFormData() {
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');
  
  if (savedUsername) {
    usernameInput.value = savedUsername;
  }
  if (savedPassword) {
    passwordInput.value = savedPassword;
  }
}

saveBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (username === '' || password === '') {
    alert('Будь ласка, заповніть всі поля');
    return;
  }

  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  
  savedMessage.textContent = 'Дані успішно збережено!';
  savedMessage.style.color = 'green';
  setTimeout(() => {
    savedMessage.textContent = '';
  }, 3000);
});

loadFormData();

// ========== ЗАВДАННЯ 8-10: ПРОДУКТИ З ПОШУКОМ ==========
const searchInput = document.getElementById('searchInput');
const productList = document.getElementById('productList');

let filteredProducts = [...products];

function renderProducts(productsToRender) {
  const html = template({ products: productsToRender });
  productList.innerHTML = html;
}

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchTerm) ||
           product.description.toLowerCase().includes(searchTerm);
  });
  
  renderProducts(filteredProducts);
});

// Початковий рендер
renderProducts(products);