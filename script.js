function addNewRoom() {
    // Lấy các phần tử input
    const inputs = document.querySelectorAll('.form-input');
    const roomName = inputs[0].value;
    const roomDesc = inputs[1].value;
    const roomPrice = inputs[2].value;
    const imageInput = document.getElementById('imageInput');
    const imageFile = imageInput.files[0];

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!roomName || !roomDesc || !roomPrice) {
        alert('Vui lòng điền đầy đủ thông tin phòng!');
        return;
    }

    // Tạo đối tượng dữ liệu (giả lập để log ra console)
    const roomData = {
        name: roomName,
        description: roomDesc,
        price: roomPrice,
        image: imageFile ? imageFile.name : 'Chưa chọn ảnh'
    };

    console.log('Dữ liệu phòng đã thu thập:', roomData);
    alert(`Đã thêm phòng "${roomName}" thành công! (Kiểm tra Console để xem chi tiết)`);

    // Reset form sau khi thêm thành công
    inputs.forEach(input => input.value = '');
    imageInput.value = '';
}

function showRooms() {
    alert('Chức năng hiển thị danh sách phòng đang được xây dựng!');
}