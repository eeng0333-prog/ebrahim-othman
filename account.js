// متغيرات عامة لإدارة النماذج
let currentTab = "login" // التبويب الحالي
let passwordStrength = 0 // قوة كلمة المرور

// تشغيل الكود بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  // تهيئة صفحة الحساب
  initializeAccountPage()
})

// دالة تهيئة صفحة الحساب
function initializeAccountPage() {
  // تهيئة النماذج والتحقق من صحة البيانات
  initializeForms()

  // تهيئة مؤشر قوة كلمة المرور
  initializePasswordStrength()

  // تهيئة الرسوم المتحركة
  initializeAnimations()

  // تحميل البيانات المحفوظة
  loadSavedData()
}

// دالة تهيئة النماذج
function initializeForms() {
  // الحصول على نماذج تسجيل الدخول والتسجيل
  const loginForm = document.getElementById("loginFormElement")
  const signupForm = document.getElementById("signupFormElement")

  // إضافة مستمع لنموذج تسجيل الدخول
  loginForm.addEventListener("submit", (e) => {
    // منع الإرسال الافتراضي
    e.preventDefault()

    // التحقق من صحة البيانات
    if (validateLoginForm()) {
      // معالجة تسجيل الدخول
      handleLogin()
    }
  })

  // إضافة مستمع لنموذج التسجيل
  signupForm.addEventListener("submit", (e) => {
    // منع الإرسال الافتراضي
    e.preventDefault()

    // التحقق من صحة البيانات
    if (validateSignupForm()) {
      // معالجة إنشاء الحساب
      handleSignup()
    }
  })

  // إضافة مستمعات للتحقق الفوري
  addRealTimeValidation()
}

// دالة التبديل بين التبويبات
function switchTab(tab) {
  // تحديث التبويب الحالي
  currentTab = tab

  // الحصول على عناصر التبويبات والنماذج
  const loginTab = document.getElementById("loginTab")
  const signupTab = document.getElementById("signupTab")
  const loginForm = document.getElementById("loginForm")
  const signupForm = document.getElementById("signupForm")

  // إزالة الفئة النشطة من جميع العناصر
  loginTab.classList.remove("active")
  signupTab.classList.remove("active")
  loginForm.classList.remove("active")
  signupForm.classList.remove("active")

  // إضافة الفئة النشطة للتبويب والنموذج المحدد
  if (tab === "login") {
    loginTab.classList.add("active")
    loginForm.classList.add("active")
  } else {
    signupTab.classList.add("active")
    signupForm.classList.add("active")
  }

  // مسح رسائل الخطأ
  clearFormErrors()
}

// دالة إظهار/إخفاء كلمة المرور
function togglePassword(inputId) {
  // الحصول على حقل كلمة المرور والزر
  const passwordInput = document.getElementById(inputId)
  const toggleButton = passwordInput.nextElementSibling
  const icon = toggleButton.querySelector("i")

  // التبديل بين إظهار وإخفاء كلمة المرور
  if (passwordInput.type === "password") {
    // إظهار كلمة المرور
    passwordInput.type = "text"
    icon.classList.remove("fa-eye")
    icon.classList.add("fa-eye-slash")
  } else {
    // إخفاء كلمة المرور
    passwordInput.type = "password"
    icon.classList.remove("fa-eye-slash")
    icon.classList.add("fa-eye")
  }
}

// دالة التحقق من صحة نموذج تسجيل الدخول
function validateLoginForm() {
  // الحصول على حقول النموذج
  const email = document.getElementById("loginEmail")
  const password = document.getElementById("loginPassword")

  // متغير لتتبع صحة النموذج
  let isValid = true

  // التحقق من البريد الإلكتروني
  if (!validateEmail(email.value)) {
    showFieldError(email, "يرجى إدخال بريد إلكتروني صحيح")
    isValid = false
  } else {
    clearFieldError(email)
  }

  // التحقق من كلمة المرور
  if (password.value.length < 6) {
    showFieldError(password, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    isValid = false
  } else {
    clearFieldError(password)
  }

  return isValid
}

// دالة التحقق من صحة نموذج التسجيل
function validateSignupForm() {
  // الحصول على حقول النموذج
  const firstName = document.getElementById("firstName")
  const lastName = document.getElementById("lastName")
  const email = document.getElementById("signupEmail")
  const phone = document.getElementById("phone")
  const address = document.getElementById("address")
  const password = document.getElementById("signupPassword")
  const confirmPassword = document.getElementById("confirmPassword")
  const agreeTerms = document.getElementById("agreeTerms")

  // متغير لتتبع صحة النموذج
  let isValid = true

  // التحقق من الاسم الأول
  if (firstName.value.trim().length < 2) {
    showFieldError(firstName, "الاسم الأول يجب أن يكون حرفين على الأقل")
    isValid = false
  } else {
    clearFieldError(firstName)
  }

  // التحقق من الاسم الأخير
  if (lastName.value.trim().length < 2) {
    showFieldError(lastName, "الاسم الأخير يجب أن يكون حرفين على الأقل")
    isValid = false
  } else {
    clearFieldError(lastName)
  }

  // التحقق من البريد الإلكتروني
  if (!validateEmail(email.value)) {
    showFieldError(email, "يرجى إدخال بريد إلكتروني صحيح")
    isValid = false
  } else {
    clearFieldError(email)
  }

  // التحقق من رقم الهاتف
  if (!validatePhone(phone.value)) {
    showFieldError(phone, "يرجى إدخال رقم هاتف صحيح (05xxxxxxxx)")
    isValid = false
  } else {
    clearFieldError(phone)
  }

  // التحقق من العنوان
  if (address.value.trim().length < 10) {
    showFieldError(address, "يرجى إدخال عنوان مفصل (10 أحرف على الأقل)")
    isValid = false
  } else {
    clearFieldError(address)
  }

  // التحقق من كلمة المرور
  if (!validatePassword(password.value)) {
    showFieldError(password, "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل مع أرقام وحروف")
    isValid = false
  } else {
    clearFieldError(password)
  }

  // التحقق من تطابق كلمة المرور
  if (password.value !== confirmPassword.value) {
    showFieldError(confirmPassword, "كلمة المرور غير متطابقة")
    isValid = false
  } else {
    clearFieldError(confirmPassword)
  }

  // التحقق من الموافقة على الشروط
  if (!agreeTerms.checked) {
    showFieldError(agreeTerms, "يجب الموافقة على شروط الاستخدام")
    isValid = false
  } else {
    clearFieldError(agreeTerms)
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

// دالة التحقق من قوة كلمة المرور
function validatePassword(password) {
  // التحقق من الطول الأدنى
  if (password.length < 8) return false

  // التحقق من وجود أرقام
  if (!/\d/.test(password)) return false

  // التحقق من وجود حروف
  if (!/[a-zA-Z]/.test(password)) return false

  return true
}

// دالة إظهار خطأ في الحقل
function showFieldError(field, message) {
  // إضافة فئة الخطأ للحقل
  field.classList.add("is-invalid")

  // البحث عن عنصر رسالة الخطأ
  const errorElement = field.parentNode.querySelector(".invalid-feedback")

  // إظهار رسالة الخطأ
  if (errorElement) {
    errorElement.textContent = message
  }
}

// دالة مسح خطأ الحقل
function clearFieldError(field) {
  // إزالة فئة الخطأ
  field.classList.remove("is-invalid")

  // إضافة فئة النجاح
  field.classList.add("is-valid")
}

// دالة مسح جميع أخطاء النموذج
function clearFormErrors() {
  // البحث عن جميع الحقول التي تحتوي على أخطاء
  const invalidFields = document.querySelectorAll(".is-invalid")
  const validFields = document.querySelectorAll(".is-valid")

  // مسح فئات الخطأ والنجاح
  invalidFields.forEach((field) => field.classList.remove("is-invalid"))
  validFields.forEach((field) => field.classList.remove("is-valid"))
}

// دالة إضافة التحقق الفوري
function addRealTimeValidation() {
  // التحقق الفوري من البريد الإلكتروني
  const emailFields = document.querySelectorAll('input[type="email"]')
  emailFields.forEach((field) => {
    field.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        showFieldError(this, "يرجى إدخال بريد إلكتروني صحيح")
      } else if (this.value) {
        clearFieldError(this)
      }
    })
  })

  // التحقق الفوري من رقم الهاتف
  const phoneField = document.getElementById("phone")
  if (phoneField) {
    phoneField.addEventListener("blur", function () {
      if (this.value && !validatePhone(this.value)) {
        showFieldError(this, "يرجى إدخال رقم هاتف صحيح (05xxxxxxxx)")
      } else if (this.value) {
        clearFieldError(this)
      }
    })
  }

  // التحقق الفوري من تطابق كلمة المرور
  const confirmPasswordField = document.getElementById("confirmPassword")
  if (confirmPasswordField) {
    confirmPasswordField.addEventListener("blur", function () {
      const password = document.getElementById("signupPassword").value
      if (this.value && this.value !== password) {
        showFieldError(this, "كلمة المرور غير متطابقة")
      } else if (this.value) {
        clearFieldError(this)
      }
    })
  }
}

// دالة تهيئة مؤشر قوة كلمة المرور
function initializePasswordStrength() {
  // الحصول على حقل كلمة المرور
  const passwordField = document.getElementById("signupPassword")

  if (passwordField) {
    // إضافة مستمع للكتابة
    passwordField.addEventListener("input", function () {
      // حساب قوة كلمة المرور
      updatePasswordStrength(this.value)
    })
  }
}

// دالة تحديث مؤشر قوة كلمة المرور
function updatePasswordStrength(password) {
  // الحصول على عناصر المؤشر
  const strengthBar = document.querySelector(".strength-fill")
  const strengthText = document.querySelector(".strength-text")

  if (!strengthBar || !strengthText) return

  // حساب قوة كلمة المرور
  let strength = 0
  let strengthLabel = ""
  let strengthColor = ""

  // التحقق من الطول
  if (password.length >= 8) strength += 25

  // التحقق من وجود أرقام
  if (/\d/.test(password)) strength += 25

  // التحقق من وجود حروف صغيرة
  if (/[a-z]/.test(password)) strength += 25

  // التحقق من وجود حروف كبيرة أو رموز
  if (/[A-Z]/.test(password) || /[!@#$%^&*]/.test(password)) strength += 25

  // تحديد التسمية واللون
  if (strength === 0) {
    strengthLabel = "ضعيفة جداً"
    strengthColor = "#dc3545"
  } else if (strength <= 25) {
    strengthLabel = "ضعيفة"
    strengthColor = "#fd7e14"
  } else if (strength <= 50) {
    strengthLabel = "متوسطة"
    strengthColor = "#ffc107"
  } else if (strength <= 75) {
    strengthLabel = "جيدة"
    strengthColor = "#20c997"
  } else {
    strengthLabel = "قوية"
    strengthColor = "#198754"
  }

  // تحديث المؤشر
  strengthBar.style.width = strength + "%"
  strengthBar.style.backgroundColor = strengthColor
  strengthText.textContent = strengthLabel
  strengthText.style.color = strengthColor

  // حفظ قوة كلمة المرور
  passwordStrength = strength
}

// دالة معالجة تسجيل الدخول
function handleLogin() {
  // الحصول على بيانات النموذج
  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value
  const rememberMe = document.getElementById("rememberMe").checked

  // إظهار رسالة التحميل
  showLoadingMessage("جاري تسجيل الدخول...")

  // محاكاة عملية تسجيل الدخول
  setTimeout(() => {
    // إخفاء رسالة التحميل
    hideLoadingMessage()

    // التحقق من البيانات (محاكاة)
    if (email === "test@example.com" && password === "123456") {
      // نجح تسجيل الدخول
      showSuccessMessage("تم تسجيل الدخول بنجاح!")

      // حفظ بيانات المستخدم
      if (rememberMe) {
        localStorage.setItem("userEmail", email)
      }

      // إعادة توجيه للصفحة الرئيسية
      setTimeout(() => {
        window.location.href = "index.html"
      }, 2000)
    } else {
      // فشل تسجيل الدخول
      showErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة")
    }
  }, 2000)
}

// دالة معالجة إنشاء الحساب
function handleSignup() {
  // الحصول على بيانات النموذج
  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("signupEmail").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    password: document.getElementById("signupPassword").value,
  }

  // إظهار رسالة التحميل
  showLoadingMessage("جاري إنشاء الحساب...")

  // محاكاة عملية إنشاء الحساب
  setTimeout(() => {
    // إخفاء رسالة التحميل
    hideLoadingMessage()

    // نجح إنشاء الحساب
    showSuccessMessage("تم إنشاء الحساب بنجاح! مرحباً بك في إبراهيم المخلافي")

    // حفظ بيانات المستخدم
    localStorage.setItem("userData", JSON.stringify(formData))

    // إعادة توجيه للصفحة الرئيسية
    setTimeout(() => {
      window.location.href = "index.html"
    }, 3000)
  }, 2000)
}

// دالة إظهار رسالة التحميل
function showLoadingMessage(message) {
  // إنشاء عنصر رسالة التحميل
  const loadingDiv = document.createElement("div")
  loadingDiv.id = "loadingMessage"
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

// دالة إخفاء رسالة التحميل
function hideLoadingMessage() {
  // البحث عن رسالة التحميل وإزالتها
  const loadingMessage = document.getElementById("loadingMessage")
  if (loadingMessage) {
    loadingMessage.remove()
  }
}

// دالة إظهار رسالة النجاح
function showSuccessMessage(message) {
  // إنشاء رسالة Toast للنجاح
  showToast(message, "success")
}

// دالة إظهار رسالة الخطأ
function showErrorMessage(message) {
  // إنشاء رسالة Toast للخطأ
  showToast(message, "error")
}

// دالة إظهار رسالة Toast
function showToast(message, type = "success") {
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

// دالة تهيئة الرسوم المتحركة
function initializeAnimations() {
  // إنشاء مراقب التقاطع
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // إضافة رسم متحرك للظهور
          entry.target.classList.add("animate-in")
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  // مراقبة العناصر القابلة للرسم المتحرك
  const animatedElements = document.querySelectorAll(".account-card, .benefit-card")
  animatedElements.forEach((el) => observer.observe(el))
}

// دالة تحميل البيانات المحفوظة
function loadSavedData() {
  // تحميل البريد الإلكتروني المحفوظ
  const savedEmail = localStorage.getItem("userEmail")
  if (savedEmail) {
    document.getElementById("loginEmail").value = savedEmail
    document.getElementById("rememberMe").checked = true
  }
}

// دالة حفظ بيانات النموذج مؤقتاً
function saveDraftData() {
  // حفظ بيانات نموذج التسجيل
  const signupForm = document.getElementById("signupFormElement")
  const formData = new FormData(signupForm)
  const draftData = {}

  // تحويل البيانات إلى كائن
  for (const [key, value] of formData.entries()) {
    if (key !== "password" && key !== "confirmPassword") {
      draftData[key] = value
    }
  }

  // حفظ البيانات في التخزين المحلي
  localStorage.setItem("signupDraft", JSON.stringify(draftData))
}

// دالة تحميل البيانات المسودة
function loadDraftData() {
  // تحميل البيانات المسودة
  const draftData = localStorage.getItem("signupDraft")

  if (draftData) {
    const data = JSON.parse(draftData)

    // ملء الحقول بالبيانات المحفوظة
    Object.keys(data).forEach((key) => {
      const field = document.getElementById(key)
      if (field) {
        field.value = data[key]
      }
    })
  }
}

// حفظ البيانات عند الكتابة
document.addEventListener("input", (e) => {
  // حفظ البيانات إذا كان المستخدم في نموذج التسجيل
  if (currentTab === "signup" && e.target.form && e.target.form.id === "signupFormElement") {
    // تأخير الحفظ لتجنب الحفظ المتكرر
    clearTimeout(window.draftSaveTimeout)
    window.draftSaveTimeout = setTimeout(saveDraftData, 1000)
  }
})

// تحميل البيانات المسودة عند تحميل الصفحة
window.addEventListener("load", () => {
  loadDraftData()
})
