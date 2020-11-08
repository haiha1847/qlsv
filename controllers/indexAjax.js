// console.log(axios);

//Kết nối dữ liệu backend dựa vào thư viện axios
var svService = new SinhVienService();
var layDanhSachSinhVienApi = function() {

    var promise = svService.layDanhSachSinhVien(); //Gọi đến backend lấy data

    //Xử lý cho trường hợp gọi thành công
    promise.then(function(result) {
        console.log('Kết quả', result.data);
        //Lấy dữ liệu server trả về gọi hàm tạo table
        renderTable(result.data)
    });

    //Xử lý cho trường hợp thất bại
    promise.catch(function(error) {
        console.log(error);
    })


}

var monHoc = function() {
    console.log("vua update xong");
}

var renderTable = function(mangSinhVien) {
    var noiDungTable = '';
    for (var i = 0; i < mangSinhVien.length; i++) {
        //Từ dữ liệu api tạo đối tượng lưu trữ
        var sv = new SinhVien();
        sv.maSinhVien = mangSinhVien[i].maSinhVien;
        sv.tenSinhVien = mangSinhVien[i].tenSinhVien;
        sv.diemToan = mangSinhVien[i].diemToan;
        sv.diemLy = mangSinhVien[i].diemLy;
        sv.diemHoa = mangSinhVien[i].diemHoa;
        sv.diemRenLuyen = mangSinhVien[i].diemRenLuyen;
        sv.loaiSinhVien = mangSinhVien[i].loaiSinhVien;
        sv.email = mangSinhVien[i].email;
        //Tạo các tr chứa thông tin sinh viên tương ứng
        noiDungTable += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.email}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.xepLoai()}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button>
                    <button class="btn btn-primary" onclick="suaSinhVien('${sv.maSinhVien}')">Chỉnh sửa</button>
                </td>
            </tr>
        `;
    }
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}

layDanhSachSinhVienApi();


//---Chức năng thêm sinh viên lưu trữ vào server thông qua api backend---
document.querySelector('#btnXacNhan').onclick = function() {
    //Lấy dữ liệu từ người dùng nhập vào
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;
    console.log('sinh viên', sv);
    //Dùng axios đưa dữ liệu về server thông qua api backend cung cấp
    var promise = svService.themSinhVien(sv);

    //Hàm thực thi khi gọi ajax thành công
    promise.then(function(result) {
        console.log(result.data);

        // location.reload();
        //Gọi phương thức lấy thông tin sinh viên tạo lại table mới
        layDanhSachSinhVienApi();
    });

    //Hàm thực thi khi lỗi xảy ra
    promise.catch(function(error) {
        console.log(error.response.data);
    })
}


//---------Chức năng xóa sinh viên server dựa vào api backend------------

var xoaSinhVien = function(maSinhVien) {
    var promise = SinhVienService.xoaSinhVien(maSinhVien);
    //Hàm xử lý thành công
    promise.then(function(result) {
            console.log(result.data);
            layDanhSachSinhVienApi();
        })
        //Hàm xử lý thất bại
    promise.catch(function(error) {
        console.log(error.response.data);
    })
}

var suaSinhVien = function(maSinhVien) {
    // alert(maSinhVien);
    var promise = svService.suaSinhVien(maSinhVien);


    promise.then(function(result) {
        var sv = result.data;
        //Gán dữ liệu server trả về lên giao diện người dùng nhập thông tin
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemHoa').value = sv.diemHoa;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
        document.querySelector('#email').value = sv.email;
    });
    promise.catch(function(error) {
        console.log(error.response.data);
    });

}

//Chức năng lưu thông tin sinh viên server dựa vào api backend cung cấp

document.querySelector('#btnLuuThongTin').onclick = function() {
    //Lấy dữ liệu từ người dùng nhập đưa vào đối tượng theo format dữ liệu của Backend yêu cầu
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;

    //Gọi ajax đưa dữ liệu về server cập nhật
    var promise = svService.capNhatSinhVien(sv.maSinhVien, sv);


    promise.then(function(result) {
        console.log(result.data);
        layDanhSachSinhVienApi();
    });


    promise.catch(function(error) {
        console.log(error.response.data);
    })

    // var sinhVienCapNhat = {
    //     "maSinhVien": document.querySelector('#maSinhVien').value,
    //     "tenSinhVien": ,
    //     "loaiSinhVien":,
    //     "diemToan": ,
    //     "diemLy": ,
    //     "diemHoa": ,
    //     "diemRenLuyen": ,
    //     "email": 
    // }
}