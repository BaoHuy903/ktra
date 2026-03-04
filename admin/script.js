const API_URL = 'https://69a7887c2cd1d0552690df12.mockapi.io/api/v1/rooms';

//Trả về object chứa các input và khu vực hiển thị
const getDom = () => ({
    name: document.getElementById('roomName'),
    desc: document.getElementById('roomDesc'),
    price: document.getElementById('roomPrice'),
    image: document.getElementById('imageInput'),
    list: document.getElementById('roomList'),
    container: document.getElementById('roomListContainer')
});
//lấy dữ liệu 
async function showRooms() {
    const dom = getDom();
    dom.container.style.display = 'block';
    dom.list.innerHTML = 'Đang tải dữ liệu...';//hiển thị đang loadign
    try {
    const response = await fetch(API_URL);
    const rooms = await response.json();// chuyển DL sang json
    let rows = "";

    //Tạo từng dòng cho mỗi phòng
    for (let room of rooms) {
        rows += `
            <tr>
                <td>${room.id}</td>
                <td>${room.name}</td>
                <td>${room.description}</td>
                <td><b>${Number(room.price).toLocaleString()} VNĐ</b></td>
            </tr>
        `;
    }

    //Hiển thị bảng
    dom.list.innerHTML = `
        <table class="form-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;

} catch (error) {
    dom.list.innerHTML = '<p style="color:red;">Lỗi kết nối API!</p>';
}
}

async function addNewRoom() {
    const dom = getDom();
    const data = {
        name: dom.name.value.trim(),
        description: dom.desc.value.trim(),
        price: dom.price.value,
        image: dom.image.files[0]?.name || 'default.png'
    };

    if (!data.name || !data.description || !data.price) return alert('Vui lòng nhập đủ thông tin!');

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            [dom.name, dom.desc, dom.price, dom.image].forEach(el => el.value = '');
            showRooms();
        }
    } catch (error) { alert('Lỗi khi thêm dữ liệu!'); }
}
