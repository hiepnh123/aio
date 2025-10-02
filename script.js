document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const contentArea = document.getElementById('contentArea');
    let knowledgeDB = []; // Biến để lưu trữ database
    let fuse; // Biến cho công cụ tìm kiếm Fuse.js


// 1. Tải file database.json
fetch('database.json')
    .then(response => response.json())
    .then(data => {
        knowledgeDB = data;
        // 2. Cấu hình Fuse.js để tìm kiếm thông minh
        const options = {
            includeScore: true,
            keys: ['keyword', 'content'] // Tìm trong cả từ khóa và nội dung
        };
        fuse = new Fuse(knowledgeDB, options);
        console.log("Database đã sẵn sàng!");
    })
    .catch(error => {
        console.error("Lỗi khi tải database:", error);
        contentArea.innerHTML = "<h2>Lỗi!</h2><p>Không thể tải được file database.json. Vui lòng kiểm tra lại.</p>";
    });

// 3. Lắng nghe sự kiện người dùng gõ vào ô tìm kiếm
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.trim() === '') {
        // Nếu ô tìm kiếm trống, hiển thị lại màn hình chào mừng
        contentArea.innerHTML = `<h2>Chào mừng bạn!</h2><p>Sử dụng thanh tìm kiếm bên trái để tra cứu kiến thức của bạn.</p>`;
        return;
    }

    // 4. Thực hiện tìm kiếm bằng Fuse.js
    const results = fuse.search(query);

    // 5. Hiển thị kết quả
    contentArea.innerHTML = ''; // Xóa nội dung cũ
    if (results.length > 0) {
        results.forEach(result => {
            const item = result.item;
            const entryDiv = document.createElement('div');
            entryDiv.innerHTML = `
                <h2>${item.keyword}</h2>
                <p>${item.content.replace(/\n/g, '<br>')}</p>
                <hr>
            `;
            contentArea.appendChild(entryDiv);
        });
    } else {
        contentArea.innerHTML = `<p>Không tìm thấy kết quả nào cho "<strong>${query}</strong>".</p>`;
    }
});



});