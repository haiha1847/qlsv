
var mangSinhVien = [];
var validate = new Validation();
//Định nghĩa sự kiện click khi người dùng bấm nút xác nhận
document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo ra đối tượng sinh viên chứa thông tin người dùng nhập vào từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    // console.log('Sinh viên', sv);
    //Kiểm tra hợp lệ 
    var valid = true;
    //Kiểm tra rổng
    valid &= validate.kiemTraRong(sv.maSinhVien, 'Mã sinh viên', '.kiemTraRong-maSinhVien') & validate.kiemTraRong(sv.tenSinhVien, 'Tên sinh viên', '.kiemTraRong-tenSinhVien') & validate.kiemTraRong(sv.email, 'Email', '.kiemTraRong-email') & validate.kiemTraRong(sv.soDienThoai, 'Số điện thoại', '.kiemTraRong-soDienThoai') & validate.kiemTraRong(sv.diemToan, 'Điểm toán', '.kiemTraRong-diemToan') & validate.kiemTraRong(sv.diemLy, 'Điểm lý', '.kiemTraRong-diemLy') & validate.kiemTraRong(sv.diemHoa, 'Điểm hóa', '.kiemTraRong-diemHoa') & validate.kiemTraRong(sv.diemRenLuyen, 'Điểm rèn luyện', '.kiemTraRong-diemRenLuyen');

    //Kiểm tra định dạng dữ liệu
    //kiểm tra định dạng email

    valid &= validate.kiemTraEmail(sv.email, 'Email', '.kiemTraDinhDang-email');

    //Kiểm tra định dạng tenSinhVien
    valid &= validate.kiemTraTatCaKyTu(sv.tenSinhVien, 'Tên sinh viên', '.kiemTraDinhDang-tenSinhVien')
    //Kiểm tra định dạng số điện thoại & và điểm tất cả phải nhập số
    valid &= validate.kiemTraTatCaLaSo(sv.soDienThoai, 'Số điện thoại', '.kiemTraDinhDang-soDienThoai') & validate.kiemTraTatCaLaSo(sv.diemToan, 'Điểm toán', '.kiemTraDinhDang-diemToan') & validate.kiemTraTatCaLaSo(sv.diemLy, 'Điểm lý', '.kiemTraDinhDang-diemLy') & validate.kiemTraTatCaLaSo(sv.diemHoa, 'Điểm hóa', '.kiemTraDinhDang-diemHoa') & validate.kiemTraTatCaLaSo(sv.diemRenLuyen, 'Điểm rèn luyện', '.kiemTraDinhDang-diemRenLuyen');




    //Kiểm tra giá trị
    valid &= validate.kiemTraGiaTri(sv.diemToan, 'Điểm toán', '.kiemTraGiaTri-diemToan', 0, 10) & validate.kiemTraGiaTri(sv.diemLy, 'Điểm lý', '.kiemTraGiaTri-diemLy', 0, 10) & validate.kiemTraGiaTri(sv.diemHoa, 'Điểm hóa', '.kiemTraGiaTri-diemHoa', 0, 10) & validate.kiemTraGiaTri(sv.diemRenLuyen, 'Điểm rèn luyện', '.kiemTraGiaTri-diemRenLuyen', 0, 10);

    //Kiểm tra độ dài 
    valid &= validate.kiemTraDoDaiChuoi(sv.email, 'Email', '.kiemTraDoDaiChuoi-email', 6, 32);
    valid &= validate.kiemTraDoDaiChuoi(sv.tenSinhVien, 'Tên sinh viên', '.kiemTraDoDaiChuoi-tenSinhVien', 6, 50);

    if (!valid) {
        return;
    }

    //Thêm 1 sinh viên vào mảng
    mangSinhVien.push(sv);
    // console.log('mảng sinh viên', mangSinhVien);
    //Tạo bảng
    renderTable(mangSinhVien);
    //Lưu vào localstorage
    luuLocalStorage();
}


var renderTable = function (arrSV) {
    //Từ mảng sinh viên tạo ra 1 chuỗi html nhiều thẻ tr dựa vào vòng lặp
    var noiDungTable = '';
    for (var index = 0; index < arrSV.length; index++) {

        //Mỗi lần lặp lấy ra 1 đối tượng sinhVien
        var sinhVien = arrSV[index];
        var sv = new SinhVien(sinhVien.maSinhVien, sinhVien.tenSinhVien, sinhVien.loaiSinhVien, sinhVien.email, sinhVien.soDienThoai, sinhVien.diemToan, sinhVien.diemLy, sinhVien.diemHoa, sinhVien.diemRenLuyen);
        // sv.maSinhVien = sinhVien.maSinhVien;
        // sv.tenSinhVien = sinhVien.tenSinhVien;
        // sv.email = sinhVien.email;
        // sv.soDienThoai = sinhVien.soDienThoai;
        // sv.diemToan = sinhVien.diemToan;
        // sv.diemLy = sinhVien.diemLy;
        // sv.diemHoa = sinhVien.diemHoa;
        // sv.diemRenLuyen = sinhVien.diemRenLuyen;
        // sv.loaiSinhVien = sinhVien.loaiSinhVien;
        //Tạo ra 1 chuỗi + dồn vào nội dung <tr></tr>
        noiDungTable += `
                <tr>
                    <td>${sv.maSinhVien}</td>
                    <td>${sv.tenSinhVien}</td>
                    <td>${sv.email}</td>
                    <td>${sv.soDienThoai}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>${sv.xepLoai()}</td>
                    <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xóa</button></td>
                    <td><button class="btn btn-primary" onclick="chinhSua('${sv.maSinhVien}')">Chỉnh sửa</button></td>
                </tr>            
        `;
    }
    // console.log(noiDungTable);
    document.querySelector('#tableSinhVien').innerHTML = noiDungTable;
}
//Cài đặt sự kiện cho nút button xóa
var xoaSinhVien = function (maSV) {
    //mangSinhVien= [{ma:1,ten:'a'},{ma:2,ten:'b'},{ma:3,ten:'c'}];
    for (var index = mangSinhVien.length -1; index >=0 ; index--) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var sv = mangSinhVien[index];

        //Lấy mã sinh viên của từng đối tượng so sánh với maSV được click
        if (sv.maSinhVien === maSV) {
            //splice là hàm xóa phần tử của mảng dự vào index
            mangSinhVien.splice(index, 1);
        }
    }
    //Sau khi xóa dữ liệu trong mảng gọi hàm tạo lại table truyền vào mảng sinh viên đã xóa
    renderTable(mangSinhVien);
}

var chinhSua = function (maSV) {
    document.querySelector('#maSinhVien').disabled = true;
    //Từ mã sinh viên => tìm sinh viên trong mangSinhVien
    for (var index = 0; index < mangSinhVien.length; index++) {
        //Mỗi lần duyệt mảng lấy ra 1 đối tượng sinh viên
        var sv = mangSinhVien[index];

        //So sánh nếu maSV truyền vào === với đối tượng đang duyệt => gán ngược lại lên các control phía trên
        if (maSV === sv.maSinhVien) {
            document.querySelector('#maSinhVien').value = sv.maSinhVien;
            document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
            document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
            document.querySelector('#diemToan').value = sv.diemToan;
            document.querySelector('#diemLy').value = sv.diemLy;
            document.querySelector('#diemHoa').value = sv.diemHoa;
            document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
            document.querySelector('#email').value = sv.email;
            document.querySelector('#soDienThoai').value = sv.soDienThoai;

        }

    }
}


//Viết hàm lưu trữ dữ liệu xuống máy tính client
var luuLocalStorage = function () {

    //Biến mảng sinh viên thành chuỗi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    //Đem chuỗi mangSinhVien lưu vào localstorage
    localStorage.setItem('mangSinhVien', sMangSinhVien);

}


//Viết phương thức lấy dữ liệu từ localstorage => khi người dùng vừa vào trang web
var layMangSinhVienStorage = function () {
    //Kiểm tra dữ liệu có trong localstorage không
    if (localStorage.getItem('mangSinhVien')) {
        //Lấy dữ liệu được lưu trong localstorage ra ngoài
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        //Biến dữ liệu từ chuỗi chuyển về object javascript gán vào mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien);
        //Sau khi lấy dữ liệu ra gọi hàm tạo bảng
        renderTable(mangSinhVien);
    }
}
layMangSinhVienStorage();


//Cập nhật thông tin người dùng

document.querySelector('#btnLuuThongTin').onclick = function () {

    //Lấy thông tin người dùng sau khi thay đổi gán vào đối tượng sinhVien
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;

    //Tìm trong mangSinhVien đối tượng cùng mã => cập lại giá trị
    for (var index = 0; index < mangSinhVien.length; index++) {
        var sinhVienCapNhat = mangSinhVien[index];
        //Tìm ra sinhVien trong mảng có mã = với mã sv trên giao diện => cập nhật giá trị
        if(sinhVienCapNhat.maSinhVien === sv.maSinhVien){
            sinhVienCapNhat.maSinhVien = sv.maSinhVien;
            sinhVienCapNhat.tenSinhVien = sv.tenSinhVien;
            sinhVienCapNhat.email = sv.email;
            sinhVienCapNhat.soDienThoai = sv.soDienThoai;
            sinhVienCapNhat.diemToan = sv.diemToan;
            sinhVienCapNhat.diemLy = sv.diemLy;
            sinhVienCapNhat.diemHoa = sv.diemHoa;
            sinhVienCapNhat.diemRenLuyen = sv.diemRenLuyen;
        }
    }
    //Gọi hàm tạo lại bảng
    renderTable(mangSinhVien);
    //Gọi hàm lưu vào localstorage
    luuLocalStorage();
    document.querySelector('#maSinhVien').disabled = false;
}
