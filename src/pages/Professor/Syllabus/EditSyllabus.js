import { MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import BackgroundStack from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderPro from "../../../components/Header/HeaderPro";
import ContentText from "../../../components/Input/ContentText";
import { useLocation, useNavigate } from "react-router-dom";
import { checkTrim } from "../../../utils/Trim";
import FieldText from "../../../components/Input/FieldText";
import AuthFormText from "../../../components/Input/AuthFormText";
import { syllabus_update } from "../../../services/proServices";

const EditSyllabus = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const semesterList = recvData.semesterList;
    const subjectList = recvData.subjectList;
    const lectureData = recvData.lectureData;
    const [complete, setComplete] = useState("");

    const [sylData, setSylData] = useState();

    const getSylData = async () => {
        const response = await syllabus_read(currSubjectID, currSemester);
        getSylData(response.data);
    };
    useEffect(() => {
        getSylData();
    }, []);

    const ess = sylData ? sylData.syllabus.classification : null;
    const grade = sylData ? sylData.syllabus.credit : null;
    const ph_num = sylData ? sylData.syllabus.phone_number : null;
    const email = sylData ? sylData.syllabus.email : null;
    const pro_name = sylData ? sylData.syllabus.professor_name : null;
    const ta_name = sylData ? sylData.syllabus.assistant_name : null;
    const intro = sylData ? sylData.syllabus.course_summary : null;
    const achiev = sylData ? sylData.syllabus.course_performance : null;
    const rule = sylData ? sylData.syllabus.operation_type : null;
    const book = sylData ? sylData.syllabus.textbook : null;
    const ratio = sylData ? sylData.syllabus.evaluation_method_ratio : null;
    const schedule = sylData ? sylData.syllabus.lec_schedule : null;

    const onhandlePost = async(data) => {
        console.log(data);
        try{
            const response = await syllabus_update(currSubjectID, currSemester, data);
            if(response.status === 201){
                console.log("강의계획서 수정 성공!");
                navigate(`/professor/syllabus_list/${currSemester}/${currSubjectID}`, {
                    state: {
                        "currSemester": currSemester,
                        "currSubject" : currSubject,
                        "semesterList" : semesterList,
                        "subjectList" : subjectList,
                        "currSubjectID": currSubjectID,
                        "lectureData": lectureData
                    }
                }
            );}
            else if(response.status === 401){
                console.log("잘못된 access 토큰!");
                navigate("/");
            }
            else if(response.status === 419){
                console.log("access 토큰 만료!");
                navigate("/");
            }
            else
                alert(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            sub_name : currSubject,
            sub_code : currSubjectID,
            sem : currSemester,
            ess : data.get("ess"),
            grade : data.get("grade"),
            time : lectureData.period,
            room : lectureData.class,
            ph_num : data.get("ph_num"),
            email : data.get("email"),
            pro_name : data.get("pro_name"),
            ta_name : data.get("ta_name"),
            intro : data.get("intro"),
            achiev : data.get("achiev"),
            rule : data.get("rule"),
            book : data.get("book"),
            ratio : data.get("ratio"),
            schedule : data.get("schedule"),
        };

        const { ess, grade, ph_num, email, pro_name, ta_name, intro, achiev, rule, book, ratio, schedule } = joinData;
        if(checkTrim(ess) && checkTrim(grade) && checkTrim(ph_num) && checkTrim(email) && checkTrim(pro_name) && checkTrim(ta_name) && checkTrim(intro) && checkTrim(achiev) 
            && checkTrim(rule)  && checkTrim(book) && checkTrim(ratio) && checkTrim(schedule))
        {
            setComplete("");
            onhandlePost(joinData);
        }
        else{
            setComplete("빈칸이 존재합니다. 모두 입력해주세요.");
        }
    };

    return(
        <>
            <HeaderPro />
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
                <OuterBox component="form" onSubmit={handleSubmit} noValidate sx={{ py: 5, justifyContent: "center", alignItems: "center"}}>
                    <ContentText variant="h4">강의 계획서</ContentText>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%", mt: 5 }}>
                        <FieldText label="교과명" name="sub_name" variant="outlined" defaultValue={currSubject} fullWidth disabled/>
                        <FieldText label="학정번호" name="sub_code" variant="outlined" defaultValue={currSubjectID} fullWidth disabled/>
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%", my: 1 }}>
                        <FieldText label="년도학기" name="sem" variant="outlined" defaultValue={currSemester} fullWidth disabled/>
                        <FieldText label="이수구분" name="ess" variant="outlined" defaultValue={ess} InputLabelProps={{ shrink: true }} fullWidth />
                        <FieldText label="학점" name="grade" variant="outlined" defaultValue={grade} InputLabelProps={{ shrink: true }} fullWidth />
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%" }}>
                        <FieldText label="강의시간" name="time" variant="outlined" defaultValue={lectureData.period} fullWidth disabled/>
                        <FieldText label="강의실" name="room" variant="outlined" defaultValue={lectureData.class} fullWidth disabled/>
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%", my: 1 }}>
                        <FieldText label="휴대폰" name="ph_num" variant="outlined" defaultValue={ph_num} InputLabelProps={{ shrink: true }} fullWidth />
                        <FieldText label="이메일" name="email" variant="outlined" defaultValue={email} InputLabelProps={{ shrink: true }} fullWidth />
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%" }}>
                        <FieldText label="담당교수" name="pro_name" variant="outlined" defaultValue={pro_name} InputLabelProps={{ shrink: true }} fullWidth />
                        <FieldText label="담당조교" name="ta_name" variant="outlined" defaultValue={ta_name} InputLabelProps={{ shrink: true }} fullWidth />
                    </Row>
                    <FieldText label="교과목 개요" name="intro" variant="outlined" sx={{ width: "80%", my: 1 }} defaultValue={intro} InputLabelProps={{ shrink: true }} />
                    <FieldText label="교과목 학습 성과" name="achiev" variant="outlined" multiline rows={5} sx={{ width: "80%" }} defaultValue={achiev} InputLabelProps={{ shrink: true }} />
                    <FieldText label="강의 운영 방식" name="rule" variant="outlined" sx={{ width: "80%", my: 1 }} defaultValue={rule} InputLabelProps={{ shrink: true }} />
                    <FieldText label="교재" name="book" variant="outlined" sx={{ width: "80%" }} defaultValue={book} InputLabelProps={{ shrink: true }} />
                    <FieldText label="평가 방법 비율" name="ratio" variant="outlined" sx={{ width: "80%", my: 1 }} defaultValue={ratio} InputLabelProps={{ shrink: true }} />
                    <FieldText label="일정" name="schedule" variant="outlined" multiline rows={10} sx={{ mb: 3, width: "80%" }} defaultValue={schedule} InputLabelProps={{ shrink: true }} />
                    <AuthFormText>{complete}</AuthFormText>
                    <Row spacing={3} mt={2}>
                        <CommonButton variant="contained" type="submit">수정</CommonButton>
                        <CommonButton variant="contained" onClick={() => navigate(-1)}>취소</CommonButton>
                    </Row>
                </OuterBox>
            </BackgroundStack>
        </>
    );
};

export default EditSyllabus;