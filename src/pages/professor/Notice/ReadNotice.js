import { MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import BgcolorBox from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderPro from "../../../components/Header/HeaderPro";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentText from "../../../components/Input/ContentText";
import { useLocation, useNavigate } from "react-router-dom";
import { notice_delete, notice_read } from "../../../services/userServices";
import FieldText from "../../../components/Input/FieldText";
import Column from "../../../components/Stack/Column";

const ReadNotice = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const semesterList = recvData.semesterList;
    const subjectList = recvData.subjectList;
    const noticeID = recvData.noticeID;
    const title = recvData.title;
    const writer = recvData.writer;
    const date = recvData.date;
    const view = recvData.view;

    const readData = {
        "notice": {
            "title": "test",
            "content": "test content",
        },
        "file": {
            "file_name": [
                "butterfly-ge8aa2bc33_640.jpg",
                "thumb_l_CDD94CBD46425E4EDBD18A7A17C199E7.jpg",
            ],
        },
    };

    // const [readData, setReadData] = useState();

    // const getNoticeData = async () => {
    //     const response = await notice_read(currSubjectID, currSemester, noticeID);
    //     setReadData(response.data);
    // };
    // useEffect(() => {
    //     getNoticeData();
    // }, []);

    const content = readData ? readData.notice.content : null;
    const fileList = readData ? readData.file.file_name : [];
    const onhandleDelete = async () => {
        try{
            const response = await notice_delete(currSubjectID, currSemester, noticeID);
            if(response.status === 201){
                console.log("공지사항 삭제 성공!");
                navigate(`/professor/notice_list/${currSemester}/${currSubjectID}`, {
                    state: {
                        "currSemester": currSemester,
                        "currSubject" : currSubject,
                        "semesterList" : semesterList,
                        "subjectList" : subjectList,
                        "currSubjectID": currSubjectID,
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
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = () => {
        const url = `/professor/edit_notice/${currSemester}/${currSubjectID}/${noticeID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "subjectList" : subjectList,
            "semesterList" : semesterList,
            "noticeID" : noticeID,
            "title" : title,
            "view" : view,
            "content" : content,
        };
        navigate(url, { state: sendData });
    };

    const handleClickFile = (file) => {
        console.log(file);
    };

    return(
        <>
            <HeaderPro />
            <BgcolorBox sx={{ minHeight: "100vh", alignItems: "center" }}>
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
                <OuterBox sx={{ py: 5, mb: 1, alignItems: "center"}}>
                    <ContentText variant="h4">강의 공지사항</ContentText>
                    <Row sx={{ width: "100%", justifyContent: "space-evenly", mt: 3 }}>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>작성자: {writer}</ContentText>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>등록일: {date}</ContentText>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>조회수: {view}</ContentText>
                    </Row>
                    <FieldText label="제목" name="title" variant="outlined" sx={{ my: 3, width: "80%" }} defaultValue={title} disabled/>
                    <FieldText label="내용" name="content" variant="outlined" multiline rows={18} sx={{ width: "80%" }} InputLabelProps={{ shrink: true }} defaultValue={content} disabled/>
                    <Column sx={{ justifyContent: "flex-start" }}>
                        {fileList.map((file, idx) => (
                            <div key={idx} onClick={() => handleClickFile(file)}>
                                <ContentText sx={{ justifyContent: "flex-start", mt: 1, width: "80%", cursor: "pointer" }}>
                                    <AttachFileIcon />{file}
                                </ContentText>
                            </div>
                        ))}
                    </Column>
                    <Row spacing={3} mt={2}>
                        <CommonButton onClick={handleEdit} variant="contained">수정</CommonButton>
                        <CommonButton variant="contained" onClick={onhandleDelete}>삭제</CommonButton>
                        <CommonButton onClick={()=> navigate(-1)} variant="contained">목록</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default ReadNotice;