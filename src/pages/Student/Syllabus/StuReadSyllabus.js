import { MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import BackgroundStack from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderStu from "../../../components/Header/HeaderStu";
import ContentText from "../../../components/Input/ContentText";
import { useLocation, useNavigate } from "react-router-dom";
import FieldText from "../../../components/Input/FieldText";
import { syllabus_read } from "../../../services/proServices";

const StuReadSyllabus = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const semesterList = recvData.semesterList;
    const subjectList = recvData.subjectList;
    const lectureData = recvData.lectureData;
    const [sylData, setSylData] = useState();

    const getSylData = async () => {
        try{
            const response = await syllabus_read(currSubjectID, currSemester);
            if(response.status === 200){
                setSylData(response.data);
            }
        } catch (err) {
            if (err.response && (err.response.status === 419 || err.response.status === 401)) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else {
                console.log(err);
            }
        }
    };
    useEffect(() => {
        getSylData();
    }, []);

    const ess = sylData ? sylData.classification : null;
    const grade = sylData ? sylData.credit : null;
    const ph_num = sylData ? sylData.phone_number : null;
    const email = sylData ? sylData.email : null;
    const pro_name = sylData ? sylData.professor_name : null;
    const ta_name = sylData ? sylData.assistant_name : null;
    const intro = sylData ? sylData.course_sumary : null;
    const achiev = sylData ? sylData.course_performance : null;
    const rule = sylData ? sylData.operation_type : null;
    const book = sylData ? sylData.textbook : null;
    const ratio = sylData ? sylData.evaluation_method_ratio : null;
    const schedule = sylData ? sylData.lec_schedule : null;

    return(
        <>
            <HeaderStu />
            <BackgroundStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={currSemester}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                            disabled
                        >
                            <MenuItem value={currSemester}>{currSemester}</MenuItem>
                        </Select>
                        <ContentText variant="h6">과목명</ContentText>
                        <Select
                            value={currSubject}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                            disabled
                        >
                            <MenuItem value={currSubject}>{currSubject}</MenuItem>
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center"}}>
                    {(sylData && sylData.credit) ? (
                        <>
                            <ContentText variant="h4">강의 계획서</ContentText>
                            <Row spacing={1} sx={{ justifyContent: "center", width: "80%", mt: 5 }}>
                                <FieldText label="교과명" name="sub_name" variant="outlined" defaultValue={currSubject} fullWidth disabled/>
                                <FieldText label="학정번호" name="sub_code" variant="outlined" defaultValue={currSubjectID} fullWidth disabled/>
                            </Row>
                            <Row spacing={1} sx={{ justifyContent: "center", width: "80%", my: 1 }}>
                                <FieldText label="년도학기" name="sem" variant="outlined" defaultValue={currSemester} fullWidth disabled/>
                                <FieldText label="이수구분" name="ess" variant="outlined" defaultValue={ess} fullWidth disabled/>
                                <FieldText label="학점" name="grade" variant="outlined" defaultValue={grade} fullWidth disabled/>
                            </Row>
                            <Row spacing={1} sx={{ justifyContent: "center", width: "80%" }}>
                                <FieldText label="강의시간" name="time" variant="outlined" defaultValue={lectureData.period} fullWidth disabled/>
                                <FieldText label="강의실" name="room" variant="outlined" defaultValue={lectureData.class} fullWidth disabled/>
                            </Row>
                            <Row spacing={1} sx={{ justifyContent: "center", width: "80%", my: 1 }}>
                                <FieldText label="휴대폰" name="ph_num" variant="outlined" defaultValue={ph_num} fullWidth disabled/>
                                <FieldText label="이메일" name="email" variant="outlined" defaultValue={email} fullWidth disabled/>
                            </Row>
                            <Row spacing={1} sx={{ justifyContent: "center", width: "80%" }}>
                                <FieldText label="담당교수" name="pro_name" variant="outlined" defaultValue={pro_name} fullWidth disabled/>
                                <FieldText label="담당조교" name="ta_name" variant="outlined" defaultValue={ta_name} fullWidth disabled/>
                            </Row>
                            <FieldText label="교과목 개요" name="intro" variant="outlined" sx={{ width: "80%", my: 1 }} defaultValue={intro} disabled/>
                            <FieldText label="교과목 학습 성과" name="achiev" variant="outlined" multiline rows={5} sx={{ width: "80%" }} defaultValue={achiev} InputLabelProps={{ shrink: true }} disabled/>
                            <FieldText label="강의 운영 방식" name="rule" variant="outlined" sx={{ width: "80%", my: 1 }} defaultValue={rule} disabled/>
                            <FieldText label="교재" name="book" variant="outlined" sx={{ width: "80%" }} defaultValue={book} disabled/>
                            <FieldText label="평가 방법 비율" name="ratio" variant="outlined" sx={{ width: "80%", my: 1 }} defaultValue={ratio} disabled/>
                            <FieldText label="일정" name="schedule" variant="outlined" multiline rows={10} sx={{ mb: 3, width: "80%" }} defaultValue={schedule} InputLabelProps={{ shrink: true }} disabled/>
                            <Row spacing={3} mt={2}>
                                <CommonButton variant="contained" onClick={() => navigate(-1)}>이전</CommonButton>
                            </Row>
                        </>
                    ) : (
                        <>
                            <ContentText variant="h4">강의 계획서</ContentText>
                            <ContentText sx={{ mt: 3 }}>등록된 강의 계획서가 없습니다.</ContentText>
                            <Row spacing={3} mt={2}>
                                <CommonButton variant="contained" onClick={() => navigate(-1)}>이전</CommonButton>
                            </Row>
                        </>
                    )}
                </OuterBox>
            </BackgroundStack>
        </>
    );
};

export default StuReadSyllabus;