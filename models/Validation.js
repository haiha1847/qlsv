//Tạo lớp đối tượng kiểm tra hợp lệ
//Tên lớp đối tượng viết hoa chữ cái đầu tiên
var Validation = function () {
    //(sv.maSinhVien, 'Mã sinh viên', '.kiemTraRong-maSinhVien')
    this.kiemTraRong = function (value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraEmail = function (value,name,selectorError) {
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regexEmail.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng!';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;

    }
    this.kiemTraTatCaKyTu = function (value,name,selectorError) { 
        var regexKyTu = /^[A-Za-z ]+$/;
        if(!regexKyTu.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự !';
            return false;
        } 
        document.querySelector(selectorError).innerHTML =  '';
        return true;
    }
    this.kiemTraTatCaLaSo = function (value,name,selectorError){
        var regexSo =  /^[0-9]+$/; 
        if(!regexSo.test(value)){
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là số !';
            return false;
        } 
        document.querySelector(selectorError).innerHTML =  '';
        return true;
    }

    this.kiemTraGiaTri = function (value,name,selectorError,minValue,maxValue) { 
        if(Number(value)<minValue || Number(value) > maxValue) {
            document.querySelector(selectorError).innerHTML = name + ` từ ${minValue} đến ${maxValue} !`;
            return false;
        }
        document.querySelector(selectorError).innerHTML =  '';
        return true;
    }

    this.kiemTraDoDaiChuoi = function (value,name,selectorError,minLength,maxLength){
        if(value.trim().length < minLength || value.trim().length > maxLength) {
            document.querySelector(selectorError).innerHTML = name + ` độ dài ${minLength} - ${maxLength} ký tự`;
            return false;
        }
        document.querySelector(selectorError).innerHTML =  '';
        return true;
    }
}