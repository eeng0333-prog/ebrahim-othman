// تشغيل الكود بعد تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", () => {
  // تهيئة العرض التقديمي (Carousel)
  initializeCarousel()

  // تهيئة الرسوم المتحركة للعناصر
  initializeAnimations()

  // تهيئة التمرير السلس
  initializeSmoothScroll()

  // تهيئة تأثيرات التمرير
  initializeScrollEffects()
})

// دالة تهيئة العرض التقديمي
function initializeCarousel() {
  // البحث عن عنصر العرض التقديمي
  const carousel = document.querySelector("#heroCarousel")

  // التحقق من وجود العنصر
  if (carousel) {
    // إنشاء مثيل Bootstrap Carousel
    const bootstrap = window.bootstrap // Declare the bootstrap variable
    const bsCarousel = new bootstrap.Carousel(carousel, {
      // الانتقال التلقائي كل 5 ثوان
      interval: 5000,
      // السماح بالتحكم باللمس
      touch: true,
      // إيقاف التشغيل عند التمرير
      pause: "hover",
    })

    // إضافة مستمع للأحداث
    carousel.addEventListener("slide.bs.carousel", (event) => {
      // طباعة رقم الشريحة الحالية في وحدة التحكم
      console.log("الانتقال إلى الشريحة رقم: " + event.to)
    })
  }
}

// دالة تهيئة الرسوم المتحركة
function initializeAnimations() {
  // البحث عن جميع بطاقات الخدمات
  const serviceCards = document.querySelectorAll(".service-card")

  // إضافة تأثير الظهور التدريجي لكل بطاقة
  serviceCards.forEach((card, index) => {
    // تأخير الظهور حسب ترتيب البطاقة
    setTimeout(() => {
      // إضافة فئة CSS للرسم المتحرك
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
      card.style.transition = "all 0.6s ease"

      // تشغيل الرسم المتحرك
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, 100)
    }, index * 200)
  })
}

// دالة تهيئة التمرير السلس
function initializeSmoothScroll() {
  // البحث عن جميع الروابط الداخلية
  const links = document.querySelectorAll('a[href^="#"]')

  // إضافة مستمع للنقر على كل رابط
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      // منع السلوك الافتراضي
      e.preventDefault()

      // الحصول على الهدف
      const target = document.querySelector(this.getAttribute("href"))

      // التحقق من وجود الهدف
      if (target) {
        // التمرير السلس إلى الهدف
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// دالة تهيئة تأثيرات التمرير
function initializeScrollEffects() {
  // إنشاء مراقب التقاطع (Intersection Observer)
  const observer = new IntersectionObserver(
    (entries) => {
      // معالجة كل عنصر مرئي
      entries.forEach((entry) => {
        // إذا كان العنصر مرئياً
        if (entry.isIntersecting) {
          // إضافة فئة CSS للرسم المتحرك
          entry.target.classList.add("animate-in")

          // إذا كان العنصر إحصائية
          if (entry.target.classList.contains("stat-item")) {
            // تشغيل عداد الأرقام
            animateCounter(entry.target)
          }
        }
      })
    },
    {
      // تشغيل التأثير عند ظهور 10% من العنصر
      threshold: 0.1,
    },
  )

  // مراقبة جميع العناصر القابلة للرسم المتحرك
  const animatedElements = document.querySelectorAll(".service-card, .value-card, .team-card, .stat-item")
  animatedElements.forEach((el) => observer.observe(el))
}

// دالة تحريك العدادات
function animateCounter(element) {
  // البحث عن العنصر الذي يحتوي على الرقم
  const counter = element.querySelector(".display-4")

  // التحقق من وجود العنصر
  if (!counter) return

  // الحصول على النص الأصلي
  const text = counter.textContent
  // استخراج الرقم من النص
  const number = Number.parseInt(text.replace(/\D/g, ""))

  // التحقق من صحة الرقم
  if (isNaN(number)) return

  // مدة الرسم المتحرك
  const duration = 2000
  // وقت البداية
  const startTime = Date.now()

  // دالة تحديث العداد
  function updateCounter() {
    // حساب الوقت المنقضي
    const elapsed = Date.now() - startTime
    // حساب التقدم (من 0 إلى 1)
    const progress = Math.min(elapsed / duration, 1)

    // حساب القيمة الحالية
    const currentValue = Math.floor(number * progress)

    // تحديث النص
    counter.textContent = text.replace(number.toString(), currentValue.toString())

    // الاستمرار إذا لم ينته الرسم المتحرك
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }

  // بدء الرسم المتحرك
  updateCounter()
}

// دالة عرض رسالة التحميل
function showLoadingMessage() {
  // إنشاء عنصر الرسالة
  const loadingDiv = document.createElement("div")
  loadingDiv.className = "loading-message"
  loadingDiv.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">جاري التحميل...</span>
            </div>
            <p class="mt-2">جاري تحميل المحتوى...</p>
        </div>
    `

  // إضافة الرسالة إلى الصفحة
  document.body.appendChild(loadingDiv)

  // إزالة الرسالة بعد 3 ثوان
  setTimeout(() => {
    if (loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv)
    }
  }, 3000)
}

// دالة التحقق من تحميل الصور
function checkImagesLoaded() {
  // البحث عن جميع الصور
  const images = document.querySelectorAll("img")
  let loadedImages = 0

  // دالة معالجة تحميل الصورة
  function imageLoaded() {
    loadedImages++

    // إذا تم تحميل جميع الصور
    if (loadedImages === images.length) {
      // إخفاء رسالة التحميل
      const loadingMessage = document.querySelector(".loading-message")
      if (loadingMessage) {
        loadingMessage.style.display = "none"
      }

      // إظهار المحتوى
      document.body.style.opacity = "1"
    }
  }

  // إضافة مستمع لكل صورة
  images.forEach((img) => {
    // إذا كانت الصورة محملة بالفعل
    if (img.complete) {
      imageLoaded()
    } else {
      // إضافة مستمع للتحميل
      img.addEventListener("load", imageLoaded)
      // إضافة مستمع للخطأ
      img.addEventListener("error", imageLoaded)
    }
  })

  // إذا لم توجد صور
  if (images.length === 0) {
    document.body.style.opacity = "1"
  }
}

// تشغيل فحص الصور عند تحميل الصفحة
window.addEventListener("load", checkImagesLoaded)

// دالة إضافة تأثيرات إضافية للأزرار
function enhanceButtons() {
  // البحث عن جميع الأزرار
  const buttons = document.querySelectorAll(".btn")

  // إضافة تأثيرات لكل زر
  buttons.forEach((button) => {
    // إضافة مستمع للنقر
    button.addEventListener("click", function (e) {
      // إنشاء تأثير الموجة
      const ripple = document.createElement("span")
      ripple.className = "ripple-effect"

      // حساب موقع النقر
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // تعيين موقع التأثير
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"

      // إضافة التأثير إلى الزر
      this.appendChild(ripple)

      // إزالة التأثير بعد انتهائه
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
      }, 600)
    })
  })
}

// تشغيل تحسين الأزرار
enhanceButtons()
