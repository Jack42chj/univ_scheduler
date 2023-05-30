import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const signin = (loginData) => {
    return axios.post(`${BASE_URL}/login`, loginData);
};

export const find_id = (accountData) => {
    return axios.post(`${BASE_URL}/login/find_id`, accountData);
};

export const find_pw = (accountData) => {
    return axios.post(`${BASE_URL}/login/find_pw`, accountData);
};

export const change_pw = (accountData) => {
    return axios.post(`${BASE_URL}/login/change_pw`, accountData);
};

export const professor_signup = (signupData) => {
    return axios.post(`${BASE_URL}/signup_professor`, signupData);
};

export const professor_checkid = (id) => {
    return axios.post(`${BASE_URL}/signup_professor/id_check`, id);
};

export const student_signup = (signupData) => {
    return axios.post(`${BASE_URL}/signup_student`, signupData);
};

export const student_checkid = (id) => {
    return axios.post(`${BASE_URL}/signup_student/id_check`, id);
};

export const notice_list = (sub_id, sem_id) => {
    return axios.get(`${BASE_URL}/notice/${sub_id}/${sem_id}`, sub_id, sem_id);
};

export const notice_write = (sub_id, sem_id, noticeData) => {
    return axios.post(`${BASE_URL}/notice/${sub_id}/${sem_id}/create`, sub_id, sem_id, noticeData);
};

export const notice_update = (sub_id, sem_id, noti_id, noticeData) => {
    return axios.put(`${BASE_URL}/notice/${sub_id}/${sem_id}/${noti_id}/update`, sub_id, sem_id, noti_id, noticeData);
};

export const professor_main = () => {
    return axios.get(`${BASE_URL}/main`);
}