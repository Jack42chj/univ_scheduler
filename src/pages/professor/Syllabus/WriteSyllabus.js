import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
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

const WriteSyllabus = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const semesterList = recvData.semesterList;
    const subjectList = recvData.subjectList;
    const lectureData = recvData.lectureData;
    const [complete, setComplete] = useState("");

    const onhandlePost = async(data) => {
        try{
            console.log(data);
        } catch (error) {
            console.error(error);
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
            && checkTrim(rule)  && checkTrim(book) && checkTrim(ratio) && checkTrim(schedule)) {
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
                        <FieldText label="이수구분" name="ess" variant="outlined" fullWidth />
                        <FieldText label="학점" name="grade" variant="outlined" fullWidth />
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%" }}>
                        <FieldText label="강의시간" name="time" variant="outlined" defaultValue={lectureData.period} fullWidth disabled/>
                        <FieldText label="강의실" name="room" variant="outlined" defaultValue={lectureData.class} fullWidth disabled/>
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%", my: 1 }}>
                        <FieldText label="휴대폰" name="ph_num" variant="outlined" fullWidth />
                        <FieldText label="이메일" name="email" variant="outlined" fullWidth />
                    </Row>
                    <Row spacing={1} sx={{ justifyContent: "center", width: "80%" }}>
                        <FieldText label="담당교수" name="pro_name" variant="outlined" fullWidth />
                        <FieldText label="담당조교" name="ta_name" variant="outlined" fullWidth />
                    </Row>
                    <FieldText label="교과목 개요" name="intro" variant="outlined" sx={{ width: "80%", my: 1 }} />
                    <FieldText label="교과목 학습 성과" name="achiev" variant="outlined" multiline rows={5} sx={{ width: "80%" }} />
                    <FieldText label="강의 운영 방식" name="rule" variant="outlined" sx={{ width: "80%", my: 1 }} />
                    <FieldText label="교재" name="book" variant="outlined" sx={{ width: "80%" }} />
                    <FieldText label="평가 방법 비율" name="ratio" variant="outlined" sx={{ width: "80%", my: 1 }} />
                    <FieldText label="일정" name="schedule" variant="outlined" multiline rows={10} sx={{ mb: 3, width: "80%" }} />
                    <AuthFormText>{complete}</AuthFormText>
                    <Row spacing={3} mt={2}>
                        <CommonButton variant="contained" type="submit">등록</CommonButton>
                        <CommonButton variant="contained" onClick={() => navigate(-1)}>취소</CommonButton>
                    </Row>
                </OuterBox>
            </BackgroundStack>
        </>
    );
};

export default WriteSyllabus;