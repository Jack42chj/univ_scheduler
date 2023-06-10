import axios from "axios";

const BASE_URL = "http://localhost:3001";

//학생 회원가입
export const student_signup = (signupData) => {
    return axios.post(`${BASE_URL}/signup_student`, signupData);
};

//학생 회원가입 아이디 중복확인
export const student_checkid = (id) => {
    return axios.post(`${BASE_URL}/signup_student/id_check`, id);
};