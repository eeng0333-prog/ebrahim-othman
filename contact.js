// متغيرات عامة لإدارة صفحة التواصل
let messageCounter = 0 // عداد أحرف الرسالة
const maxMessageLength = 500 // الحد الأقصى لأحرف الرسالة

// تشغيل الكود بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  // تهيئة صفحة التواصل
  initializeContactPage()
})

// دالة تهيئة صفحة التواصل
function initializeContactPage() {
  // تهيئة نموذج التواصل
  initializeContactForm()

  // تهيئة عداد الأحرف
  initializeMessageCounter()

  // تهيئة الرسوم المتحركة
  initializeContactAnimations()

  // تهيئة روابط التواصل الاجتماعي
  initializeSocialLinks()
}

// دالة تهيئة نموذج التواصل
function initializeContactForm() {
  // الحصول على نموذج التواصل
  const contactForm = document.getElementById("contactForm")

  // إضافة مستمع لإرسال النموذج
  contactForm.addEventListener("submit", (e) => {
    // منع الإرسال الافتراضي
    e.preventDefault()

    // التحقق من صحة البيانات
    if (validateContactForm()) {
      // معالجة إرسال الرسالة
      handleContactSubmission()
    }
  })

  // إضافة التحقق الفوري للحقول
  addContactRealTimeValidation()
}

// دالة التحقق من صحة نموذج التواصل
function validateContactForm() {
  // الحصول على حقول النموذج
  const name = document.getElementById("contactName")
  const email = document.getElementById("contactEmail")
  const phone = document.getElementById("contactPhone")
  const inquiryType = document.getElementById("inquiryType")
  const subject = document.getElementById("contactSubject")
  const message = document.getElementById("contactMessage")

  // متغير لتتبع صحة النموذج
  let isValid = true

  // التحقق من الاسم
  if (name.value.trim().length < 2) {
    showContactFieldError(name, "يرجى إدخال اسم صحيح (حرفين على الأقل)")
    isValid = false
  } else {
    clearContactFieldError(name)
  }

  // التحقق من البريد الإلكتروني
  if (!validateEmail(email.value)) {
    showContactFieldError(email, "يرجى إدخال بريد إلكتروني صحيح")
    isValid = false
  } else {
    clearContactFieldError(email)
  }

  // التحقق من رقم الهاتف
  if (!validatePhone(phone.value)) {
    showContactFieldError(phone, "يرجى إدخال رقم هاتف صحيح (05xxxxxxxx)")
    isValid = false
  } else {
    clearContactFieldError(phone)
  }

  // التحقق من نوع الاستفسار
  if (!inquiryType.value) {
    showContactFieldError(inquiryType, "يرجى اختيار نوع الاستفسار")
    isValid = false
  } else {
    clearContactFieldError(inquiryType)
  }

  // التحقق من الموضوع
  if (subject.value.trim().length < 5) {
    showContactFieldError(subject, "يرجى إدخال موضوع واضح (5 أحرف على الأقل)")
    isValid = false
  } else {
    clearContactFieldError(subject)
  }

  // التحقق من الرسالة
  if (message.value.trim().length < 10) {
    showContactFieldError(message, "يرجى كتابة رسالة مفصلة (10 أحرف على الأقل)")
    isValid = false
  } else if (message.value.length > maxMessageLength) {
    showContactFieldError(message, `الرسالة طويلة جداً (الحد الأقصى ${maxMessageLength} حرف)`)
    isValid = false
  } else {
    clearContactFieldError(message)
  }

  return isValid
}

// دالة التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
  // نمط التحقق من البريد الإلكتروني
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

// دالة التحقق من صحة رقم الهاتف
function validatePhone(phone) {
  // نمط التحقق من رقم الهاتف السعودي
  const phonePattern = /^05[0-9]{8}$/
  return phonePattern.test(phone)
}

// دالة إظهار خطأ في حقل التواصل
function showContactFieldError(field, message) {
  // إضافة فئة الخطأ للحقل
  field.classList.add("is-invalid")
  field.classList.remove("is-valid")

  // البحث عن عنصر رسالة الخطأ
  const errorElement = field.parentNode.querySelector(".invalid-feedback")

  // إظهار رسالة الخطأ
  if (errorElement) {
    errorElement.textContent = message
  }
}

// دالة مسح خطأ حقل التواصل
function clearContactFieldError(field) {
  // إزالة فئة الخطأ
  field.classList.remove("is-invalid")

  // إضافة فئة النجاح
  field.classList.add("is-valid")
}

// دالة إضافة التحقق الفوري لحقول التواصل
function addContactRealTimeValidation() {
  // التحقق الفوري من البريد الإلكتروني
  const emailField = document.getElementById("contactEmail")
  emailField.addEventListener("blur", function () {
    if (this.value && !validateEmail(this.value)) {
      showContactFieldError(this, "يرجى إدخال بريد إلكتروني صحيح")
    } else if (this.value) {
      clearContactFieldError(this)
    }
  })

  // التحقق الفوري من رقم الهاتف
  const phoneField = document.getElementById("contactPhone")
  phoneField.addEventListener("blur", function () {
    if (this.value && !validatePhone(this.value)) {
      showContactFieldError(this, "يرجى إدخال رقم هاتف صحيح (05xxxxxxxx)")
    } else if (this.value) {
      clearContactFieldError(this)
    }
  })

  // التحقق الفوري من الاسم
  const nameField = document.getElementById("contactName")
  nameField.addEventListener("blur", function () {
    if (this.value && this.value.trim().length < 2) {
      showContactFieldError(this, "يرجى إدخال اسم صحيح (حرفين على الأقل)")
    } else if (this.value) {
      clearContactFieldError(this)
    }
  })
}

// دالة تهيئة عداد أحرف الرسالة
function initializeMessageCounter() {
  // الحصول على حقل الرسالة وعداد الأحرف
  const messageField = document.getElementById("contactMessage")
  const counterElement = document.getElementById("messageCounter")

  // إضافة مستمع للكتابة
  messageField.addEventListener("input", function () {
    // تحديث العداد
    messageCounter = this.value.length
    counterElement.textContent = messageCounter

    // تغيير لون العداد حسب الطول
    if (messageCounter > maxMessageLength * 0.9) {
      counterElement.style.color = "#dc3545" // أحمر
    } else if (messageCounter > maxMessageLength * 0.7) {
      counterElement.style.color = "#ffc107" // أصفر
    } else {
      counterElement.style.color = "#6c757d" // رمادي
    }

    // التحقق من تجاوز الحد الأقصى
    if (messageCounter > maxMessageLength) {
      showContactFieldError(this, `الرسالة طويلة جداً (الحد الأقصى ${maxMessageLength} حرف)`)
    } else if (messageCounter >= 10) {
      clearContactFieldError(this)
    }
  })
}

// دالة معالجة إرسال رسالة التواصل
function handleContactSubmission() {
  // الحصول على بيانات النموذج
  const formData = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    phone: document.getElementById("contactPhone").value,
    inquiryType: document.getElementById("inquiryType").value,
    subject: document.getElementById("contactSubject").value,
    message: document.getElementById("contactMessage").value,
    timestamp: new Date().toISOString(),
  }

  // إظهار رسالة التحميل
  showContactLoadingMessage("جاري إرسال رسالتك...")

  // محاكاة عملية الإرسال
  setTimeout(() => {
    // إخفاء رسالة التحميل
    hideContactLoadingMessage()

    // إظهار رسالة النجاح
    showContactSuccessMessage("تم إرسال رسالتك بنجاح! سنتواصل معك خلال 24 ساعة")

    // حفظ الرسالة في التخزين المحلي
    saveContactMessage(formData)

    // مسح النموذج
    clearContactForm()

    // إرسال إشعار بالبريد الإلكتروني (محاكاة)
    sendEmailNotification(formData)
  }, 2000)
}

// دالة حفظ رسالة التواصل
function saveContactMessage(messageData) {
  // الحصول على الرسائل المحفوظة
  const savedMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]")

  // إضافة الرسالة الجديدة
  savedMessages.push(messageData)

  // حفظ الرسائل المحدثة
  localStorage.setItem("contactMessages", JSON.stringify(savedMessages))
}

// دالة مسح نموذج التواصل
function clearContactForm() {
  // الحصول على النموذج
  const form = document.getElementById("contactForm")

  // مسح جميع الحقول
  form.reset()

  // مسح فئات التحقق
  const fields = form.querySelectorAll(".form-control")
  fields.forEach((field) => {
    field.classList.remove("is-valid", "is-invalid")
  })

  // إعادة تعيين عداد الأحرف
  messageCounter = 0
  document.getElementById("messageCounter").textContent = "0"
  document.getElementById("messageCounter").style.color = "#6c757d"
}

// دالة إرسال إشعار بالبريد الإلكتروني (محاكاة)
function sendEmailNotification(messageData) {
  // محاكاة إرسال إشعار للإدارة
  console.log("تم إرسال إشعار بالرسالة الجديدة:", messageData)

  // يمكن هنا إضافة كود حقيقي لإرسال البريد الإلكتروني
  // مثل استخدام EmailJS أو API خاص بالخادم
}

// دالة تحميل النوافذ المنبثقة
function loadModal(modalFile) {
  // إظهار رسالة التحميل
  showContactLoadingMessage("جاري تحميل النافذة...")

  // محاكاة تحميل ملف النافذة
  fetch(`${modalFile}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("فشل في تحميل النافذة")
      }
      return response.text()
    })
    .then((html) => {
      // إخفاء رسالة التحميل
      hideContactLoadingMessage()

      // إدراج محتوى النافذة
      const modalContainer = document.getElementById("modalContainer")
      modalContainer.innerHTML = html

      // إظهار النافذة
      const modalElement = modalContainer.querySelector(".modal")
      const modal = new bootstrap.Modal(modalElement)
      modal.show()

      // إضافة مستمع لإزالة النافذة عند الإغلاق
      modalElement.addEventListener("hidden.bs.modal", () => {
        modalContainer.innerHTML = ""
      })
    })
    .catch((error) => {
      // إخفاء رسالة التحميل
      hideContactLoadingMessage()

      // إظهار رسالة خطأ
      showContactErrorMessage("فشل في تحميل النافذة. يرجى المحاولة مرة أخرى.")

      console.error("خطأ في تحميل النافذة:", error)
    })
}

// دالة إرسال طلب الاتصال
function submitCallRequest() {
  // التحقق من صحة نموذج طلب الاتصال
  const name = document.getElementById("callName")
  const phone = document.getElementById("callPhone")
  const preferredTime = document.getElementById("preferredTime")

  let isValid = true

  // التحقق من الاسم
  if (!name.value.trim()) {
    showContactFieldError(name, "يرجى إدخال اسمك")
    isValid = false
  } else {
    clearContactFieldError(name)
  }

  // التحقق من رقم الهاتف
  if (!validatePhone(phone.value)) {
    showContactFieldError(phone, "يرجى إدخال رقم هاتف صحيح")
    isValid = false
  } else {
    clearContactFieldError(phone)
  }

  // التحقق من الوقت المفضل
  if (!preferredTime.value) {
    showContactFieldError(preferredTime, "يرجى اختيار الوقت المفضل")
    isValid = false
  } else {
    clearContactFieldError(preferredTime)
  }

  if (isValid) {
    // إظهار رسالة التحميل
    showContactLoadingMessage("جاري تسجيل طلب الاتصال...")

    // محاكاة تسجيل الطلب
    setTimeout(() => {
      // إخفاء رسالة التحميل
      hideContactLoadingMessage()

      // إغلاق النافذة
      const modal = bootstrap.Modal.getInstance(document.getElementById("callRequestModal"))
      modal.hide()

      // إظهار رسالة النجاح
      showContactSuccessMessage("تم تسجيل طلب الاتصال بنجاح! سنتصل بك خلال 15 دقيقة")

      // حفظ طلب الاتصال
      const callData = {
        name: name.value,
        phone: phone.value,
        preferredTime: preferredTime.value,
        reason: document.getElementById("callReason").value,
        timestamp: new Date().toISOString(),
      }

      saveCallRequest(callData)
    }, 1500)
  }
}

// دالة حفظ طلب الاتصال
function saveCallRequest(callData) {
  // الحصول على طلبات الاتصال المحفوظة
  const savedCalls = JSON.parse(localStorage.getItem("callRequests") || "[]")

  // إضافة الطلب الجديد
  savedCalls.push(callData)

  // حفظ الطلبات المحدثة
  localStorage.setItem("callRequests", JSON.stringify(savedCalls))
}

// دالة الحصول على الاتجاهات
function getDirections() {
  // التحقق من دعم الموقع الجغرافي
  if (navigator.geolocation) {
    // إظهار رسالة التحميل
    showContactLoadingMessage("جاري تحديد موقعك...")

    // الحصول على الموقع الحالي
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // إخفاء رسالة التحميل
        hideContactLoadingMessage()

        // إحداثيات الموقع الحالي
        const currentLat = position.coords.latitude
        const currentLng = position.coords.longitude

        // إحداثيات مقر الشركة (تقريبية)
        const destinationLat = 24.7136
        const destinationLng = 46.6753

        // فتح خرائط جوجل مع الاتجاهات
        const directionsUrl = `https://www.google.com/maps/dir/${currentLat},${currentLng}/${destinationLat},${destinationLng}`
        window.open(directionsUrl, "_blank")
      },
      (error) => {
        // إخفاء رسالة التحميل
        hideContactLoadingMessage()

        // إظهار رسالة خطأ
        showContactErrorMessage("لم نتمكن من تحديد موقعك. يرجى السماح بالوصول للموقع أو استخدام خرائط جوجل مباشرة.")

        console.error("خطأ في تحديد الموقع:", error)
      },
    )
  } else {
    // المتصفح لا يدعم الموقع الجغرافي
    showContactErrorMessage("متصفحك لا يدعم تحديد الموقع. يرجى استخدام خرائط جوجل مباشرة.")
  }
}

// دالة تهيئة روابط التواصل الاجتماعي
function initializeSocialLinks() {
  // الحصول على جميع روابط التواصل الاجتماعي
  const socialLinks = document.querySelectorAll(".social-link")

  // إضافة تأثيرات تفاعلية
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)"
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
    })

    // إضافة مستمع للنقر
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // الحصول على نوع المنصة
      const platform = this.classList[1] // facebook, twitter, etc.

      // إظهار رسالة
      showContactSuccessMessage(`سيتم توجيهك إلى صفحتنا على ${platform}`)

      // يمكن هنا إضافة الروابط الحقيقية
      setTimeout(() => {
        // window.open('رابط المنصة الحقيقي', '_blank');
      }, 1000)
    })
  })
}

// دالة تهيئة الرسوم المتحركة للتواصل
function initializeContactAnimations() {
  // إنشاء مراقب التقاطع
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // إضافة رسم متحرك للظهور
          entry.target.classList.add("animate-in")

          // تأثيرات خاصة لبطاقات التواصل
          if (entry.target.classList.contains("contact-info-card")) {
            // تأخير الظهور حسب الترتيب
            const cards = document.querySelectorAll(".contact-info-card")
            const index = Array.from(cards).indexOf(entry.target)
            entry.target.style.animationDelay = `${index * 0.2}s`
          }
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  // مراقبة العناصر القابلة للرسم المتحرك
  const animatedElements = document.querySelectorAll(".contact-info-card, .contact-form-card, .info-card")
  animatedElements.forEach((el) => observer.observe(el))
}

// دالة إظهار رسالة تحميل التواصل
function showContactLoadingMessage(message) {
  // إنشاء عنصر رسالة التحميل
  const loadingDiv = document.createElement("div")
  loadingDiv.id = "contactLoadingMessage"
  loadingDiv.className = "loading-overlay"
  loadingDiv.innerHTML = `
        <div class="loading-content">
            <div class="spinner-border text-primary mb-3" role="status">
                <span class="visually-hidden">جاري التحميل...</span>
            </div>
            <p class="mb-0">${message}</p>
        </div>
    `

  // إضافة الرسالة للصفحة
  document.body.appendChild(loadingDiv)
}

// دالة إخفاء رسالة تحميل التواصل
function hideContactLoadingMessage() {
  // البحث عن رسالة التحميل وإزالتها
  const loadingMessage = document.getElementById("contactLoadingMessage")
  if (loadingMessage) {
    loadingMessage.remove()
  }
}

// دالة إظهار رسالة نجاح التواصل
function showContactSuccessMessage(message) {
  // إنشاء رسالة Toast للنجاح
  showContactToast(message, "success")
}

// دالة إظهار رسالة خطأ التواصل
function showContactErrorMessage(message) {
  // إنشاء رسالة Toast للخطأ
  showContactToast(message, "error")
}

// دالة إظهار رسالة Toast للتواصل
function showContactToast(message, type = "success") {
  // تحديد اللون والأيقونة حسب النوع
  let bgColor, icon
  if (type === "success") {
    bgColor = "#198754"
    icon = "fa-check-circle"
  } else {
    bgColor = "#dc3545"
    icon = "fa-exclamation-circle"
  }

  // إنشاء عنصر الرسالة
  const toast = document.createElement("div")
  toast.className = "toast-notification"
  toast.style.background = bgColor
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${icon} me-2"></i>
            <span>${message}</span>
        </div>
    `

  // إضافة الرسالة للصفحة
  document.body.appendChild(toast)

  // إظهار الرسالة
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // إخفاء الرسالة بعد 4 ثوان
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 4000)
}

// دالة تصدير بيانات التواصل (للاستخدام في لوحة الإدارة)
function exportContactData() {
  // الحصول على جميع البيانات المحفوظة
  const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]")
  const calls = JSON.parse(localStorage.getItem("callRequests") || "[]")

  // تجميع البيانات
  const exportData = {
    messages: messages,
    callRequests: calls,
    exportDate: new Date().toISOString(),
  }

  // تحويل البيانات إلى JSON
  const dataStr = JSON.stringify(exportData, null, 2)

  // إنشاء ملف للتحميل
  const dataBlob = new Blob([dataStr], { type: "application/json" })
  const url = URL.createObjectURL(dataBlob)

  // إنشاء رابط التحميل
  const downloadLink = document.createElement("a")
  downloadLink.href = url
  downloadLink.download = `contact-data-${new Date().toISOString().split("T")[0]}.json`

  // تشغيل التحميل
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)

  // تنظيف الذاكرة
  URL.revokeObjectURL(url)
}

// دالة إحصائيات التواصل
function getContactStats() {
  // الحصول على البيانات المحفوظة
  const messages = JSON.parse(localStorage.getItem("contactMessages") || "[]")
  const calls = JSON.parse(localStorage.getItem("callRequests") || "[]")

  // حساب الإحصائيات
  const stats = {
    totalMessages: messages.length,
    totalCallRequests: calls.length,
    todayMessages: messages.filter((msg) => {
      const msgDate = new Date(msg.timestamp).toDateString()
      const today = new Date().toDateString()
      return msgDate === today
    }).length,
    inquiryTypes: {},
  }

  // تجميع أنواع الاستفسارات
  messages.forEach((msg) => {
    const type = msg.inquiryType || "other"
    stats.inquiryTypes[type] = (stats.inquiryTypes[type] || 0) + 1
  })

  return stats
}
