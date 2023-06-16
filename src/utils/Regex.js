const idRegex =  /^[a-z-0-9]*$/;
const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=`-])(?=.*[0-9]).{8,25}$/;
const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const timeRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]) (0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[12345][0-9]):(0[0-9]|[12345][0-9])$/;

//아이디 확인 정규식 성립시: true
export const checkID = (id) => {
    if(!idRegex.test(id)) return false;
    return true;
};
//이메일 확인 정규식 성립시: true
export const checkEmail = (email) => {
    if(!emailRegex.test(email)) return false;
    return true;
};
//비밀번호 확인 정규식 성립시: true
export const checkPassword = (passwd) => {
    if(!passwordRegex.test(passwd)) return false;
    return true;
};
//전화번호 확인 정규식 성립시: true
export const checkPhone = (phoneNum) => {
    if(!phoneRegex.test(phoneNum)) return false;
    return true;
};
//날짜 및 시간 확인 정규식 성립시: true
export const checkTime = (time) => {
    if(!timeRegex.test(time)) return false;
    return true;
};