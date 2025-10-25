document.addEventListener('DOMContentLoaded', () => {
    // ===============================
    // Chuyển tab bằng data-target
    // ===============================
    const menuItems = document.querySelectorAll('.account_sidebar li[data-target]');
    const tabs = document.querySelectorAll('.tab_content');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
        // Bỏ active cũ
        menuItems.forEach(i => i.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));

        // Kích hoạt mới
        item.classList.add('active');
        const target = item.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
        });
    });

    // ===============================
    // Chuyển giữa xem/chỉnh sửa thông tin
    // ===============================
    const editBtn = document.getElementById('editBtn');
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
        viewMode.style.display = 'none';
        editMode.style.display = 'flex';
        });
    }
});