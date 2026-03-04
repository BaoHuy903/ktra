const API_URL = 'https://69a7887c2cd1d0552690df12.mockapi.io/api/v1/rooms';

const dom = {
    name: () => document.getElementById('roomName'),
    desc: () => document.getElementById('roomDesc'),
    price: () => document.getElementById('roomPrice'),
    image: () => document.getElementById('imageInput'),
    list: () => document.getElementById('roomList'),
    container: () => document.getElementById('roomListContainer')
};

// phòng
async function showRooms() {
    dom.container().style.display = 'block';
    dom.list().innerHTML = '<p>Đang tải dữ liệu...</p>';

    try {
        const response = await fetch(API_URL);
        const rooms = await response.json();

        if (!rooms.length) {
            dom.list().innerHTML = '<p>Chưa có phòng nào trong danh sách.</p>';
            return;
        }

        dom.list().innerHTML = `
            <table class="form-table">
                <thead>
                    <tr><th>ID</th><th>Tên phòng</th><th>Mô tả</th><th>Giá</th></tr>
                </thead>
                <tbody>
                    ${rooms.map(room => `
                        <tr>
                            <td>${room.id}</td>
                            <td>${room.name}</td>
                            <td>${room.description}</td>
                            <td>${Number(room.price).toLocaleString()} VNĐ</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>`;
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        dom.list().innerHTML = '<p style="color: red;">Không thể tải dữ liệu từ API!</p>';
    }
}

//Thêm phòng mới
async function addNewRoom() {
    const data = {
        name: dom.name().value.trim(),
        description: dom.desc().value.trim(),
        price: dom.price().value,
        image: dom.image().files[0]?.name || 'Chưa chọn ảnh'
    };

    if (!data.name || !data.description || !data.price) {
        alert('Vui lòng điền đầy đủ thông tin phòng!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert(`Đã thêm phòng "${data.name}" thành công!`);
            [dom.name(), dom.desc(), dom.price(), dom.image()].forEach(el => el.value = '');
            showRooms();
        }
    } catch (error) {
        console.error('Lỗi khi thêm phòng:', error);
        alert('Có lỗi xảy ra khi gửi dữ liệu lên MockAPI!');
    }
}
