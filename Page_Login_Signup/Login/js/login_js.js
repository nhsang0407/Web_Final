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
    const savedUsername = localStorage.getItem("savedUsername");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedUsername && savedPassword) {
        document.querySelector("#loginForm input[name='login_uid']").value = savedUsername;
        document.querySelector("#loginForm input[name='login_pwd']").value = savedPassword;
        document.querySelector("#loginForm input[type='checkbox']").checked = true;
    }
};


// Xử lý đăng nhập
function process_login(login_uid,login_pwd) //lấy trực tiếp từ bên html
{
    const rememberBox = document.querySelector("#loginForm input[type='checkbox']");

    if (!login_uid || !login_pwd) {
        alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
        return;
    }
    // if (login_uid === "" || login_pwd === "") 
    // {
    //     alert("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
    //     return;
    // }

    // Lấy danh sách người dùng đã đăng ký từ localStorage (nếu có)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm người dùng có username và password trùng khớp
    const user = users.find(u => u.username === login_uid && u.password === login_pwd);

    if (user) {
        alert("Đăng nhập thành công!");

        // Nếu có tick “Lưu mật khẩu”, thì lưu lại vào localStorage
        if (rememberBox.checked) {
            localStorage.setItem("savedUsername", login_uid);
            localStorage.setItem("savedPassword", login_pwd);
            alert("Đã lưu")
        } else {
            localStorage.removeItem("savedUsername");
            localStorage.removeItem("savedPassword");
        }

        // Chuyển sang trang chính
        window.location.href = "../html/home.html";
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }

    // const correctUsername = "admin";
    // const correctPassword = "123";
    // if (login_uid===correctUsername && login_pwd===correctPassword)
    // {
    //     alert("Đăng nhập thành công!")
    //     window.location.href="../html/home.html"
    // }
    // else
    // {
    //     alert("Sai tên đăng nhập hoặc mật khẩu!")
    // }
}

//Quên mật khẩu
function forgotPassword() {
    const username = prompt("Nhập tên đăng nhập của bạn:");
    if (!username) {
        alert("Bạn chưa nhập tên đăng nhập!");
        return;
    }

    // Lấy danh sách người dùng
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm người dùng
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) {
        alert("Không tìm thấy tên đăng nhập này!");
        return;
    }

    const newPwd = prompt("Nhập mật khẩu mới:");
    if (!newPwd) {
        alert("Bạn chưa nhập mật khẩu mới!");
        return;
    }

    // Cập nhật mật khẩu
    users[userIndex].password = newPwd;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đặt lại mật khẩu thành công! Hãy đăng nhập lại với mật khẩu mới.");
}


//Xử lý đăng ký
function process_register() {
    const username = document.getElementById("reg_uid").value; //lấy thông qua ID
    const password = document.getElementById("reg_pwd").value;
    const confirm = document.getElementById("reg_pwd2").value;

    if (!username || !password || !confirm) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if (password !== confirm) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }
    // Lấy danh sách user từ localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra trùng tên đăng nhập
    if (users.find(u => u.username === username)) {
        alert("Tên đăng nhập đã tồn tại!");
        return;
    }

    // Lưu tài khoản mới
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
    showLogin(); // Chuyển về form đăng nhập
}