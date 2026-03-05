let productList = [];

function save() {
    const customerName = document.getElementById('name').value;
    const productId = document.getElementById('id').value;
    const productName = document.getElementById('prdname').value;
    const quantity = parseFloat(document.getElementById('qty').value);
    const price = parseFloat(document.getElementById('price').value);

    if (!customerName || !productId || !productName || isNaN(quantity) || isNaN(price)) {
        alert("Vui lòng nhập đầy đủ thông tin hợp lệ!");
        return;
    }

    if (quantity <= 0 || price < 0) {
        alert("Số lượng và đơn giá không hợp lệ!");
        return;
    }

    const amount = quantity * price;
    const discount = quantity > 10 ? amount * 0.1 : 0;
    const total = amount - discount;

    const product = { customerName, productId, productName, quantity, price, discount, amount, total };
    productList.push(product);
    
    alert("Lưu dữ liệu thành công!");
    show();
    reset();
}

function show() {
    const tbody = document.getElementById('tbl');
    tbody.innerHTML = "";

    productList.forEach((item, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${item.customerName}</td>
            <td>${item.productId}</td>
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString()}</td>
            <td>${item.discount.toLocaleString()}</td>
            <td>${item.amount.toLocaleString()}</td>
            <td>${item.total.toLocaleString()}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function reset() {
    document.querySelectorAll('.form-group input').forEach(input => input.value = "");
}