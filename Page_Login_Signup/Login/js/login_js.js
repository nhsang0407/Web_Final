// Hàm hiển thị form đăng nhập
function showLogin() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const promoImg = document.getElementById("promo-img");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    loginForm.classList.add("show");
    registerForm.classList.remove("show");

    promoImg.src = "../images/fruits.jpg"; //add hinh vo cho dung hinh

    loginBtn.classList.add("active");
    registerBtn.classList.remove("active");
}

// Hàm hiển thị form đăng ký
function showRegister() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const promoImg = document.getElementById("promo-img");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    loginForm.classList.remove("show");
    registerForm.classList.add("show");

    promoImg.src = "../images/sale.jpg"; //add hinh vo cho dung hinh

    registerBtn.classList.add("active");
    loginBtn.classList.remove("active");
}

// Khởi tạo mặc định khi load trang
window.onload = function() {
    showLogin();
};
