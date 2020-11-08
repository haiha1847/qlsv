//lớp đối tượng chứa các phương thức giao tiếp với backend (api)
var SinhVienService = function () {

    this.layDanhSachSinhVien = function () {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //BE cung cấp
            method: 'GET' //backend cung cấp
        })
        return promise; 
    }
    this.themSinhVien = function(sv) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien', //Api backend cung cấp
            method: 'POST', //giao thức backend cung cấp
            data: sv //Dữ liệu gửi đi (lưu ý: dữ liệu gửi đi phải đúng format dữ liệu của Backend yêu cầu)
        });
        return promise;
    }

    this.xoaSinhVien = function (maSinhVien) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=` + maSinhVien,
            method: 'DELETE',
        })
        return promise;
    }

    this.suaSinhVien = function (maSinhVien) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSinhVien,
            method: 'GET'
        });
        return promise;
    }
    this.capNhatSinhVien = function (maSinhVien,svCapNhat) {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+maSinhVien,
            method:'PUT',
            data:svCapNhat 
        })
        return promise;
    }

}