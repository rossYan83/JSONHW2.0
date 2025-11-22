
import templateSource from "./template.hbs";
import Handlebars from "handlebars";



document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("bookmarkInput");
    const addBtn = document.getElementById("addBookmarkBtn");
    const list = document.getElementById("bookmarkList");

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    render();

    addBtn.addEventListener("click", () => {
        const url = input.value.trim();
        if (!url) return;

        bookmarks.push(url);
        save();
        render();
        input.value = "";
    });

    function save() {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  });

  function render() {
        list.innerHTML = "";
        bookmarks.forEach((url, index) => {
            const li = document.createElement("li");

            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.textContent = url;

            // Кнопка редагування
            const editBtn = document.createElement("button");
            editBtn.textContent = "✏️";
            editBtn.style.backgroundColor = "#ffc107";
            editBtn.style.marginRight = "10px";
            editBtn.onclick = () => editBookmark(index);

            // Кнопка видалення
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "🗑";
            deleteBtn.classList.add("delete");
            deleteBtn.onclick = () => removeBookmark(index);

            const btnWrapper = document.createElement("div");
            btnWrapper.appendChild(editBtn);
            btnWrapper.appendChild(deleteBtn);

            li.appendChild(link);
            li.appendChild(btnWrapper);
            list.appendChild(li);
        });
    }


    function removeBookmark(index) {
        bookmarks.splice(index, 1);
        save();
        render();
    }

    function editBookmark(index) {
        const newUrl = prompt("Змінити URL:", bookmarks[index]);
        if (newUrl) {
            bookmarks[index] = newUrl.trim();
            save();
            render();
        }
    }



document.addEventListener("DOMContentLoaded", function () {

    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    const saveButton = document.getElementById("saveBtn");

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername) usernameField.value = savedUsername;
    if (savedPassword) passwordField.value = savedPassword;


    saveButton.addEventListener("click", () => {
        localStorage.setItem("username", usernameField.value);
        localStorage.setItem("password", passwordField.value);

        alert("Дані збережено!");
    });
});

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

const template = Handlebars.compile(templateSource);

// 🔹 Функція рендера
function renderProducts(list) {
  const html = template(list);
  document.getElementById("app").innerHTML = html;
}

// 🔹 Перший рендер
renderProducts(products);

// 🔹 Пошук
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );

  renderProducts(filtered);
});