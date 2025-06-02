// 等待 DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 更新購物車數量
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  }

  // 初始化時更新購物車數量
  updateCartCount();

  // 監聽localStorage變化
  window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
      updateCartCount();
    }
  });

  // 搜尋功能
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');

  // 所有商品數據
  const products = [
    { name: 'Lucrece Earrings', price: 270, img: 'vivi 1.jpg' },
    { name: 'Man. Azul Necklace', price: 395, img: 'vivi 8.jpg' },
    { name: 'Jackie Sunglasses', price: 590, img: 'vivi 10.jpg' },
    { name: 'Costello Sunglasses', price: 275, img: 'vivi 12.jpg' },
    { name: 'Diamante Heart Pendant Necklace', price: 270, img: 'vivi 18.jpg' },
    { name: 'LAriella Pendant Necklace', price: 185, img: 'vivi 20.jpg' },
    { name: 'Kitty Pendant Necklace', price: 220, img: 'vivi 22.jpg' },
    { name: 'Ariella Pendant Necklace', price: 200, img: 'vivi 24.jpg' }
  ];

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchPanel.classList.add('open');
      document.body.classList.add('search-open');
      if (searchInput) {
        searchInput.focus();
      }
    });
  }

  if (searchClose && searchPanel) {
    searchClose.addEventListener('click', (e) => {
      e.stopPropagation();
      searchPanel.classList.remove('open');
      document.body.classList.remove('search-open');
    });
  }

  // 點擊空白處關閉搜尋面板
  document.addEventListener('click', (e) => {
    if (searchPanel && searchPanel.classList.contains('open')) {
      if (!searchPanel.contains(e.target) && e.target !== searchToggle) {
        searchPanel.classList.remove('open');
        document.body.classList.remove('search-open');
      }
    }
  });

  // 視窗調整大小時關閉搜尋面板
  window.addEventListener('resize', () => {
    if (searchPanel) {
      searchPanel.classList.remove('open');
      document.body.classList.remove('search-open');
    }
  });

  // 搜尋功能
  function performSearch(query) {
    query = query.toLowerCase().trim();
    const results = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.price.toString().includes(query)
    );
    
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">未找到相關商品</p>';
      return;
    }
    
    results.forEach(product => {
      const item = document.createElement('a');
      item.href = `product2.html?img1=${encodeURIComponent(product.img)}&img2=${encodeURIComponent(product.img)}&name=${encodeURIComponent(product.name)}&price=${product.price}`;
      item.className = 'search-result-item';
      item.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
      `;
      searchResults.appendChild(item);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (searchInput) {
        performSearch(searchInput.value);
      }
    });
  }

  // Swiper 初始化（僅首頁有用到）
  if (document.querySelector('.swiper')) {
    new Swiper('.swiper', {
      loop: true,
      touchRatio: 1,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  // 側邊選單
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navClose = document.getElementById('navClose');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.add('open');
      document.body.classList.add('menu-open');
    });
  }

  if (navClose && navLinks) {
    navClose.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  }

  // 點擊空白處關閉選單
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('open')) {
      if (!navLinks.contains(e.target) && e.target !== menuToggle) {
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }
  });

  // 視窗調整大小時關閉選單
  window.addEventListener('resize', () => {
    if (navLinks) {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });

  // 商品頁：切換主圖
  const mainImg = document.getElementById('main-img');
  const thumbImgs = document.querySelectorAll('.thumb-img');
  if (mainImg && thumbImgs.length) {
    thumbImgs.forEach(img => {
      img.addEventListener('click', function () {
        mainImg.src = this.src;
      });
    });
  }

  // 檢查登入狀態
  checkLoginStatus();
});

// 檢查登入狀態函數
function checkLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const loginLink = document.querySelector('a[href="login.html"]');
  
  if (currentUser && loginLink) {
    loginLink.innerHTML = `<img src="user.png" alt="User" class="icon-img"><span class="user-name">${currentUser.name}</span>`;
    loginLink.href = '#';
    loginLink.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // 使用自定義的確認對話框而不是瀏覽器內建的
      const confirmDialog = document.createElement('div');
      confirmDialog.className = 'confirm-dialog';
      confirmDialog.innerHTML = `
        <div class="confirm-content">
          <h3>登出確認</h3>
          <p>確定要登出嗎？</p>
          <div class="confirm-buttons">
            <button class="confirm-btn confirm-cancel">取消</button>
            <button class="confirm-btn confirm-ok">確定</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(confirmDialog);
      
      // 添加動畫效果
      setTimeout(() => confirmDialog.classList.add('show'), 10);
      
      // 綁定按鈕事件
      const cancelBtn = confirmDialog.querySelector('.confirm-cancel');
      const okBtn = confirmDialog.querySelector('.confirm-ok');
      
      cancelBtn.onclick = function() {
        confirmDialog.classList.remove('show');
        setTimeout(() => confirmDialog.remove(), 300);
      };
      
      okBtn.onclick = function() {
        localStorage.removeItem('currentUser');
        window.location.reload();
      };
      
      // 點擊背景關閉
      confirmDialog.onclick = function(e) {
        if (e.target === confirmDialog) {
          confirmDialog.classList.remove('show');
          setTimeout(() => confirmDialog.remove(), 300);
        }
      };
    };
  }
}

// 結帳頁
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
  checkoutForm.addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById("order-msg").style.display = "block";
    localStorage.removeItem("cart");
  });
}
