import { MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import BgcolorBox from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderStu from "../../../components/Header/HeaderStu";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentText from "../../../components/Input/ContentText";
import { useLocation, useNavigate } from "react-router-dom";
import { notice_download, notice_read } from "../../../services/userServices";
import FieldText from "../../../components/Input/FieldText";
import Column from "../../../components/Stack/Column";

const StuReadNotice = () => {
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

    const [readData, setReadData] = useState();

    const getNoticeData = async () => {
        try{
            const response = await notice_read(currSubjectID, currSemester, noticeID);
            if(response.status === 200){
                setReadData(response.data);
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
        getNoticeData();
    }, []);

    const content = readData ? readData.notice.content : null;
    const fileList = readData ? readData.file.file_name : [];

    const handleDownload = async (file) => {
        const resp = await notice_download(currSubjectID, currSemester, noticeID, file);
        if(resp.status === 200){
            const downloadUrl = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', file);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    };

    return(
        <>
            <HeaderStu />
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
                        {fileList && fileList.map((file, idx) => (
                            <div key={idx} onClick={() => handleDownload(file)}>
                                <ContentText sx={{ justifyContent: "flex-start", mt: 1, width: "80%", cursor: "pointer" }}>
                                    <AttachFileIcon />{file}
                                </ContentText>
                            </div>
                        ))}
                    </Column>
                    <Row spacing={3} mt={2}>
                        <CommonButton onClick={()=> navigate(-1)} variant="contained">목록</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default StuReadNotice;