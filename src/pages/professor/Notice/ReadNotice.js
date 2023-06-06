import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import BgcolorBox from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderPro from "../../../components/Header/HeaderPro";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DownloadIcon from '@mui/icons-material/Download';
import ContentText from "../../../components/Input/ContentText";
import { useLocation, useNavigate } from "react-router-dom";
import { notice_delete, notice_read } from "../../../services/userServices";
import FieldText from "../../../components/Input/FieldText";

const title = "소프트웨어공학 공지";
const content = "hello\n\nworld\n\nhi\n\nmy name\n\nis\n\nchoi\n\nhojin";

const ReadNotice = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const noticeID = recvData.noticeID;

    const [readData, setReadData] = useState();

    // const getNoticeData = async () => {
    //     const response = await notice_read(currSubjectID, currSemester);
    //     setReadData(response.data);
    // };
    // useEffect(() => {
    //     getNoticeData();
    // }, []);

    const onhandleDelete = async () => {
        try{
            const response = await notice_delete(currSubjectID, currSemester, noticeID);
            if(response.status === 200){
                console.log("공지사항 삭제 성공!");
                navigate(`/professor/notice_list/${currSemester}/${currSubjectID}`);
            }
            else if(response.status === 401){
                console.log("잘못된 access 토큰!");
            }
            else if(response.status === 419){
                console.log("access 토큰 만료!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (readData) => {
        const url = `/professor/edit_notice/${currSemester}/${currSubjectID}/${noticeID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "noticeID" : noticeID,
            readData,
        };
        navigate(url, { state: sendData });
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
                <OuterBox sx={{ py: 5, alignItems: "center"}}>
                    <ContentText variant="h4">강의 공지사항</ContentText>
                    <Row sx={{ width: "100%", justifyContent: "space-evenly", mt: 3 }}>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>작성자: 이기훈</ContentText>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>등록일: 2023-03-17</ContentText>
                        <ContentText variant="h6" sx={{ color: "#FA9A00" }}>조회수: 25</ContentText>
                    </Row>
                    <FieldText label="제목" name="title" variant="outlined" sx={{ my: 3, width: "80%" }} defaultValue={title} disabled/>
                    <FieldText label="내용" name="content" variant="outlined" multiline rows={18} sx={{ width: "80%" }} defaultValue={content} disabled/>
                    <ContentText sx={{ justifyContent: "flex-start", my: 3, width: "80%" }}><AttachFileIcon />파일: 소프트웨어공학.pdf&nbsp;&nbsp;<DownloadIcon /></ContentText>
                    <Row spacing={3}>
                        <CommonButton onClick={() => handleEdit(readData)} variant="contained">수정</CommonButton>
                        <CommonButton variant="contained" onClick={onhandleDelete}>삭제</CommonButton>
                        <CommonButton onClick={()=> navigate(-1)} variant="contained">취소</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default ReadNotice;