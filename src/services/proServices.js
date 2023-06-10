import axios from "axios";

const BASE_URL = "http://localhost:3001";

//교수 회원가입
export const professor_signup = (signupData) => {
    return axios.post(`${BASE_URL}/signup_professor`, signupData);
};

//교수 회원가입 아이디 중복확인
export const professor_checkid = (id) => {
    return axios.post(`${BASE_URL}/signup_professor/id_check`, id);
};

//교수 메인화면
export const professor_main = () => {
    return axios.get(`${BASE_URL}/main`, {withCredentials:true});
};

//교수 학기 변경
export const professor_change_main = (currSemester) => {
    return axios.post(`${BASE_URL}/main`, currSemester, {withCredentials:true});
};

//공지사항 작성
export const notice_write = (sub_id, sem_id, noticeData) => {
    return axios.post(`${BASE_URL}/notice/${sub_id}/${sem_id}/create`, noticeData, { 
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true }
    );
};

//공지사항 수정
export const notice_update = (sub_id, sem_id, noti_id, noticeData) => {
    return axios.put(`${BASE_URL}/notice/${sub_id}/${sem_id}/${noti_id}/update`, noticeData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true }
    );
};

//공지사항 삭제
export const notice_delete = (sub_id, sem_id, noti_id) => {
    return axios.delete(`${BASE_URL}/notice/${sub_id}/${sem_id}/${noti_id}/delete`, {withCredentials:true});
};

//강의자료실 작성
export const reference_write = (sub_id, sem_id, refData) => {
    return axios.post(`${BASE_URL}/lecture_material/${sub_id}/${sem_id}/create`, refData, { 
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true }
    );
};

//강의자료실 수정
export const reference_update = (sub_id, sem_id, ref_id, refData) => {
    return axios.put(`${BASE_URL}/lecture_material/${sub_id}/${sem_id}/${ref_id}/update`, refData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true }
    );
};

//강의자료실 삭제
export const reference_delete = (sub_id, sem_id, ref_id) => {
    return axios.delete(`${BASE_URL}/lecture_material/${sub_id}/${sem_id}/${ref_id}/delete`, {withCredentials:true});
};

//교수 학생 조회
export const student_info = (infoData) => {
    return axios.post(`${BASE_URL}/studentInfoCheck`, infoData, {withCredentials:true});
};

//교수 성적 입력 불러오기
export const grade_list = (sub_id, sem_id) => {
    return axios.get(`${BASE_URL}/${sub_id}/${sem_id}`, {withCredentials:true});
};

//교수 성적 입력
export const grade_enter = (sub_id, sem_id, gradeData) => {
    return axios.post(`${BASE_URL}/${sub_id}/${sem_id}`, gradeData, {withCredentials:true});
};

//교수 강의계획서 목록 조회
export const syllabus_list = (sub_id, sem_id) => {
    return axios.get(`${BASE_URL}/syllabus/${sub_id}/${sem_id}/list`, {withCredentials:true});
};

//교수 강의계획서 작성
export const syllabus_write = (sub_id, sem_id, sylData) => {
    return axios.post(`${BASE_URL}/syllabus/${sub_id}/${sem_id}/create`, sylData, {withCredentials:true});
};

//교수 강의계획서 수정
export const syllabus_update = (sub_id, sem_id, sylData) => {
    return axios.put(`${BASE_URL}/syllabus/${sub_id}/${sem_id}/update`, sylData, {withCredentials:true});
};