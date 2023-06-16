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

//학생 메인화면
export const student_main = () => {
    return axios.get(`${BASE_URL}/main`, {withCredentials:true});
};

//학생 학기 변경
export const student_change_main = (currSemester) => {
    return axios.post(`${BASE_URL}/main`, currSemester, {withCredentials:true});
};

//학생 과제 목록 조회
export const assignment_list = (sub_id, sem_id) => {
    return axios.get(`${BASE_URL}/assignment/${sub_id}/${sem_id}`, {withCredentials:true});
};

//학생 과제 제출
export const assignment_submit = (sub_id, sem_id, assign_id, assignData) => {
    return axios.post(`${BASE_URL}/assignment/${sub_id}/${sem_id}/${assign_id}/submit`, assignData, { 
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true }
    );
};

//강의계획서 조회
export const search_syllabus = (data) => {
    return axios.post(`${BASE_URL}/syllabus`, data, {withCredentials:true});
};

//나의 수강 목록 조회
export const enrollment_list = () => {
    return axios.get(`${BASE_URL}/enrollment`, {withCredentials:true});
};

//수강 목록 검색
export const search_enrollment = (data) => {
    return axios.post(`${BASE_URL}/enrollment`, data, {withCredentials:true});
};

//수강 삭제
export const delete_enrollment = () => {
    return axios.delete(`${BASE_URL}/enrollment/delete`, {withCredentials:true});
};

//수강 신청
export const add_enrollment = () => {
    return axios.post(`${BASE_URL}/enrollment/insert`, {withCredentials:true});
};

//석차 조회
export const ranking = () => {
    return axios.get(`${BASE_URL}/rank`, {withCredentials:true});
};

//성적 조회
export const grade = () => {
    return axios.get(`${BASE_URL}/grade`, {withCredentials:true});
};