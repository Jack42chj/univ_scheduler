import axios from "axios";

const BASE_URL = "http://localhost:3001";

// 로그인
export const signin = (loginData) => {
    return axios.post(`${BASE_URL}/login`, loginData, {withCredentials:true});
};

//로그아웃
export const logout = () => {
    return axios.get(`${BASE_URL}/logout`, {withCredentials:true});
};

//아이디 찾기
export const find_id = (accountData) => {
    return axios.post(`${BASE_URL}/login/find_id`, accountData);
};

// 비밀번호 찾기
export const find_pw = (accountData) => {
    return axios.post(`${BASE_URL}/login/find_pw`, accountData);
};

//비밀번호 재설정
export const change_pw = (accountData) => {
    return axios.post(`${BASE_URL}/login/change_pw`, accountData);
};

//공지사항 목록
export const notice_list = (sub_id, sem_id) => {
    return axios.get(`${BASE_URL}/notice/${sub_id}/${sem_id}`, {withCredentials:true});
};

//공지사항 읽기
export const notice_read = (sub_id, sem_id, noti_id) => {
    return axios.get(`${BASE_URL}/notice/${sub_id}/${sem_id}/${noti_id}`, {withCredentials:true});
};

//공지사항 파일 다운로드
export const notice_download = (sub_id, sem_id, noti_id, file_id) => {
    return axios.get(`${BASE_URL}/notice/${sub_id}/${sem_id}/${noti_id}/${file_id}/download`, { responseType: 'blob', withCredentials:true });
};

//강의자료실 목록
export const reference_list = (sub_id, sem_id) => {
    return axios.get(`${BASE_URL}/lecture_material/${sub_id}/${sem_id}`, {withCredentials:true});
};

//강의자료 읽기
export const reference_read = (sub_id, sem_id, ref_id) => {
    return axios.get(`${BASE_URL}/lecture_material/${sub_id}/${sem_id}/${ref_id}`, {withCredentials:true});
};

//강의자료 파일 다운로드
export const reference_download = (sub_id, sem_id, ref_id, file_id) => {
    return axios.get(`${BASE_URL}/lecture_material/${sub_id}/${sem_id}/${ref_id}/${file_id}/download`, { responseType: 'blob', withCredentials:true });
};

//과제 파일 다운로드
export const assignment_download = (sub_id, sem_id, assign_id, file_id, author_id) => {
    return axios.get(`${BASE_URL}/assignment/${sub_id}/${sem_id}/${assign_id}/${file_id}/${author_id}/download`, { responseType: 'blob', withCredentials:true });
};

//개인정보 수정 불러오기
export const information_check = () => {
    return axios.get(`${BASE_URL}/information_check`, {withCredentials:true});
};

//개인정보 수정
export const change_info = (changeData) => {
    return axios.post(`${BASE_URL}/information_check`, changeData, {withCredentials:true});
};

//개인정보 수정 비밀번호 변경
export const info_change_pw = (changeData) => {
    return axios.post(`${BASE_URL}/information_check/change_pw`, changeData, {withCredentials:true});
};
