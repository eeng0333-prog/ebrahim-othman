// متغيرات عامة لإدارة المنتجات والسلة
let cart = [] // مصفوفة لحفظ منتجات السلة
const cartTotal = 0 // إجمالي سعر السلة

// تشغيل الكود بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  // تهيئة وظائف صفحة المنتجات
  initializeMenuPage()
})

// دالة تهيئة صفحة المنتجات
function initializeMenuPage() {
  // تهيئة البحث والفلترة
  initializeSearch()
  initializeFilters()

  // تهيئة أزرار إضافة المنتجات للسلة
  initializeAddToCartButtons()

  // تهيئة السلة
  initializeCart()

  // تهيئة الرسوم المتحركة
  initializeProductAnimations()
}

// دالة تهيئة البحث
function initializeSearch() {
  // الحصول على حقل البحث
  const searchInput = document.getElementById("searchInput")

  // إضافة مستمع للكتابة في حقل البحث
  searchInput.addEventListener("input", function () {
    // الحصول على نص البحث
    const searchTerm = this.value.toLowerCase().trim()

    // البحث عن المنتجات
    searchProducts(searchTerm)
  })
}

// دالة البحث عن المنتجات
function searchProducts(searchTerm) {
  // الحصول على جميع بطاقات المنتجات
  const productCards = document.querySelectorAll(".product-card")

  // فحص كل منتج
  productCards.forEach((card) => {
    // الحصول على اسم المنتج ووصفه
    const title = card.querySelector(".product-title").textContent.toLowerCase()
    const description = card.querySelector(".product-description").textContent.toLowerCase()

    // التحقق من وجود نص البحث
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      // إظهار المنتج
      card.classList.remove("hidden")
      card.classList.add("fade-in")
    } else {
      // إخفاء المنتج
      card.classList.add("hidden")
      card.classList.remove("fade-in")
    }
  })

  // التحقق من وجود نتائج
  checkSearchResults()
}

// دالة التحقق من نتائج البحث
function checkSearchResults() {
  // الحصول على المنتجات المرئية
  const visibleProducts = document.querySelectorAll(".product-card:not(.hidden)")

  // إزالة رسالة عدم وجود نتائج السابقة
  const existingMessage = document.querySelector(".no-products-message")
  if (existingMessage) {
    existingMessage.remove()
  }

  // إذا لم توجد منتجات مرئية
  if (visibleProducts.length === 0) {
    // إنشاء رسالة عدم وجود نتائج
    const message = document.createElement("div")
    message.className = "no-products-message"
    message.innerHTML = `
            <i class="fas fa-search"></i>
            <p>لم يتم العثور على منتجات مطابقة لبحثك</p>
            <small>جرب كلمات بحث أخرى</small>
        `

    // إضافة الرسالة بعد شريط البحث
    const filterSection = document.querySelector(".filter-section")
    filterSection.insertAdjacentElement("afterend", message)
  }
}

// دالة تهيئة الفلاتر
function initializeFilters() {
  // الحصول على أزرار الفلترة
  const filterButtons = document.querySelectorAll("[data-filter]")

  // إضافة مستمع لكل زر فلترة
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // إزالة الفئة النشطة من جميع الأزرار
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // إضافة الفئة النشطة للزر المضغوط
      this.classList.add("active")

      // الحصول على نوع الفلتر
      const filter = this.getAttribute("data-filter")

      // تطبيق الفلتر
      filterProducts(filter)
    })
  })
}

// دالة فلترة المنتجات
function filterProducts(filter) {
  // الحصول على جميع بطاقات المنتجات
  const productCards = document.querySelectorAll(".product-card")

  // فحص كل منتج
  productCards.forEach((card) => {
    // الحصول على فئة المنتج
    const category = card.getAttribute("data-category")

    // التحقق من الفلتر
    if (filter === "all" || category === filter) {
      // إظهار المنتج
      card.classList.remove("hidden")
      card.classList.add("fade-in")
    } else {
      // إخفاء المنتج
      card.classList.add("hidden")
      card.classList.remove("fade-in")
    }
  })

  // مسح حقل البحث
  document.getElementById("searchInput").value = ""

  // إزالة رسالة عدم وجود نتائج
  const existingMessage = document.querySelector(".no-products-message")
  if (existingMessage) {
    existingMessage.remove()
  }
}

// دالة تهيئة أزرار إضافة المنتجات للسلة
function initializeAddToCartButtons() {
  // الحصول على جميع أزرار الإضافة للسلة
  const addToCartButtons = document.querySelectorAll(".add-to-cart")

  // إضافة مستمع لكل زر
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // الحصول على بيانات المنتج
      const productName = this.getAttribute("data-product")
      const productPrice = Number.parseInt(this.getAttribute("data-price"))

      // إضافة المنتج للسلة
      addToCart(productName, productPrice)

      // إظهار رسالة تأكيد
      showToast(`تم إضافة ${productName} إلى السلة`)
    })
  })
}

// دالة إضافة منتج للسلة
function addToCart(name, price) {
  // البحث عن المنتج في السلة
  const existingItem = cart.find((item) => item.name === name)

  if (existingItem) {
    // زيادة الكمية إذا كان المنتج موجود
    existingItem.quantity += 1
  } else {
    // إضافة منتج جديد للسلة
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    })
  }

  // تحديث عرض السلة
  updateCartDisplay()
}

// دالة حذف منتج من السلة
function removeFromCart(name) {
  // البحث عن فهرس المنتج
  const itemIndex = cart.findIndex((item) => item.name === name)

  if (itemIndex > -1) {
    // حذف المنتج من السلة
    cart.splice(itemIndex, 1)

    // تحديث عرض السلة
    updateCartDisplay()

    // إظهار رسالة تأكيد
    showToast(`تم حذف ${name} من السلة`)
  }
}

// دالة تحديث عرض السلة
function updateCartDisplay() {
  // الحصول على عنصر عرض منتجات السلة
  const cartItems = document.getElementById("cartItems")
  const cartTotal = document.getElementById("cartTotal")
  const checkoutBtn = document.getElementById("checkoutBtn")

  // مسح المحتوى الحالي
  cartItems.innerHTML = ""

  // حساب الإجمالي
  let total = 0

  if (cart.length === 0) {
    // عرض رسالة السلة فارغة
    cartItems.innerHTML = '<p class="text-muted">لا توجد منتجات في السلة</p>'
    checkoutBtn.disabled = true
  } else {
    // عرض منتجات السلة
    cart.forEach((item) => {
      // حساب سعر المنتج الإجمالي
      const itemTotal = item.price * item.quantity
      total += itemTotal

      // إنشاء عنصر المنتج
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-quantity">×${item.quantity}</span>
                <span class="cart-item-price">${itemTotal} ريال</span>
                <button class="cart-item-remove" onclick="removeFromCart('${item.name}')">
                    <i class="fas fa-trash"></i>
                </button>
            `

      // إضافة المنتج لعرض السلة
      cartItems.appendChild(cartItem)
    })

    // تفعيل زر إتمام الطلب
    checkoutBtn.disabled = false
  }

  // تحديث الإجمالي
  cartTotal.textContent = `${total} ريال`
}

// دالة تهيئة السلة
function initializeCart() {
  // الحصول على زر إتمام الطلب
  const checkoutBtn = document.getElementById("checkoutBtn")

  // إضافة مستمع لزر إتمام الطلب
  checkoutBtn.addEventListener("click", () => {
    // التحقق من وجود منتجات في السلة
    if (cart.length > 0) {
      // إظهار رسالة تأكيد
      showCheckoutModal()
    }
  })
}

// دالة إظهار نافذة تأكيد الطلب
function showCheckoutModal() {
  // حساب الإجمالي
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // إنشاء محتوى النافذة
  let itemsList = ""
  cart.forEach((item) => {
    itemsList += `<li>${item.name} × ${item.quantity} = ${item.price * item.quantity} ريال</li>`
  })

  // إظهار نافذة التأكيد
  const confirmed = confirm(`
        تأكيد الطلب:
        
        المنتجات:
        ${cart.map((item) => `${item.name} × ${item.quantity}`).join("\n")}
        
        الإجمالي: ${total} ريال
        
        هل تريد إتمام الطلب؟
    `)

  if (confirmed) {
    // مسح السلة
    cart = []
    updateCartDisplay()

    // إظهار رسالة نجاح
    showToast("تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً")
  }
}

// دالة إظهار رسالة Toast
function showToast(message) {
  // إنشاء عنصر الرسالة
  const toast = document.createElement("div")
  toast.className = "toast-notification"
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle me-2"></i>
            <span>${message}</span>
        </div>
    `

  // إضافة الرسالة للصفحة
  document.body.appendChild(toast)

  // إظهار الرسالة
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // إخفاء الرسالة بعد 3 ثوان
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 3000)
}

// دالة تهيئة الرسوم المتحركة للمنتجات
function initializeProductAnimations() {
  // إنشاء مراقب التقاطع
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // إضافة رسم متحرك للظهور
          entry.target.classList.add("fade-in")
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  // مراقبة جميع بطاقات المنتجات
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => observer.observe(card))
}

// دالة تحديث عداد السلة في شريط التنقل
function updateCartCounter() {
  // حساب عدد المنتجات في السلة
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)

  // البحث عن عداد السلة
  let cartCounter = document.querySelector(".cart-counter")

  if (itemCount > 0) {
    if (!cartCounter) {
      // إنشاء عداد السلة
      cartCounter = document.createElement("span")
      cartCounter.className = "cart-counter"

      // إضافة العداد لشريط التنقل
      const cartLink = document.querySelector('a[href="menu.html"]')
      if (cartLink) {
        cartLink.appendChild(cartCounter)
      }
    }

    // تحديث العداد
    cartCounter.textContent = itemCount
  } else {
    // إزالة العداد إذا كانت السلة فارغة
    if (cartCounter) {
      cartCounter.remove()
    }
  }
}

// دالة حفظ السلة في التخزين المحلي
function saveCartToStorage() {
  // حفظ السلة في localStorage
  localStorage.setItem("deliveryCart", JSON.stringify(cart))
}

// دالة تحميل السلة من التخزين المحلي
function loadCartFromStorage() {
  // تحميل السلة من localStorage
  const savedCart = localStorage.getItem("deliveryCart")

  if (savedCart) {
    // تحويل النص إلى مصفوفة
    cart = JSON.parse(savedCart)

    // تحديث عرض السلة
    updateCartDisplay()
  }
}

// تحميل السلة عند تحميل الصفحة
window.addEventListener("load", () => {
  loadCartFromStorage()
})

// حفظ السلة عند إغلاق الصفحة
window.addEventListener("beforeunload", () => {
  saveCartToStorage()
})

// دالة تصدير السلة (للاستخدام في صفحات أخرى)
function getCart() {
  return cart
}

// دالة استيراد السلة (للاستخدام في صفحات أخرى)
function setCart(newCart) {
  cart = newCart
  updateCartDisplay()
}
