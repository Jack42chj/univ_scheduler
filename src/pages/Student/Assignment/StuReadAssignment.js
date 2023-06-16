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
import { assignment_download } from "../../../services/userServices";
import FieldText from "../../../components/Input/FieldText";
import Column from "../../../components/Stack/Column";
import { assignment_delete, assignment_read } from "../../../services/proServices";

const StuReadAssignment = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const currSubject = recvData.currSubject;
    const currSubjectID = recvData.currSubjectID;
    const semesterList = recvData.semesterList;
    const subjectList = recvData.subjectList;
    const title = recvData.title;
    const time = recvData.due_date;
    const assignID = recvData.assignID;

    // const [readData, setReadData] = useState();

    // const getAssignData = async () => {
    //     try{
    //         const response = await assignment_read(currSubjectID, currSemester, assignID);
    //         if(response.status === 200){
    //             setReadData(response.data);
    //         }
    //     } catch (err) {
    //         if (err.response && (err.response.status === 419 || err.response.status === 401)) {
    //             alert('로그인 시간 만료.');
    //             navigate("/");
    //         } else {
    //             console.log(err);
    //         }
    //     }
    // };
    // useEffect(() => {
    //     getAssignData();
    // }, []);

    const readData = {
        "assignment": {
            "content": "테스트 수정입니다.",
            "file_name": [
                "thumb_l_CDD94CBD46425E4EDBD18A7A17C199E7.jpg"
            ]
        },
        // "assignment_submit": {
        //     "title": "제출 테스트",
        //     "content": "제출 테스트 입니다.",
        //     "file_names": [
        //         "butterfly-ge8aa2bc33_640.jpg",
        //         "thumb_l_CDD94CBD46425E4EDBD18A7A17C199E7.jpg"
        //     ]
        // }
    }

    const content = readData ? readData.assignment.content : null;
    const fileList = readData ? readData.assignment.file_name : [];
    const stuTitle = (readData && readData.assignment_submit) ? readData.assignment_submit.title : null;
    const stuContent = (readData && readData.assignment_submit) ? readData.assignment_submit.content : null;
    const stuFileList = (readData && readData.assignment_submit) ? readData.assignment_submit.file_names : [];

    const onhandleDelete = async () => {
        try{
            const response = await assignment_delete(currSubjectID, currSemester, assignID);
            if(response.status === 200){
                alert("과제 삭제 성공!");
                navigate(`/student/assign_list/${currSemester}/${currSubjectID}`, {
                    state: {
                        "currSemester": currSemester,
                        "currSubject" : currSubject,
                        "semesterList" : semesterList,
                        "subjectList" : subjectList,
                        "currSubjectID": currSubjectID,
                    }
                }
            );}
        } catch (err) {
            if (err.response && (err.response.status === 419 || err.response.status === 401)) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else {
                console.log(err);
            }
        }
    };

    const handleEdit = () => {
        const url = `/student/edit_assign/${currSemester}/${currSubjectID}/${assignID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "subjectList" : subjectList,
            "semesterList" : semesterList,
            "assignID" : assignID,
            "title" : stuTitle,
            "content" : stuContent,
        };
        navigate(url, { state: sendData });
    };

    const handleWriteNotice = () => {
        const url = `/student/write_assign/${currSemester}/${currSubjectID}/${assignID}`;
        const sendWriteData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
            "semesterList" : semesterList,
            "subjectList" : subjectList,
            "assignID": assignID
        };
        navigate(url, { state: sendWriteData });
    };

    const handleDownload = async (file, author_id) => {
        const resp = await assignment_download(currSubjectID, currSemester, assignID, file, author_id);
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
                <OuterBox sx={{ py: 5, mb: 3, alignItems: "center"}}>
                    <ContentText variant="h4">과제</ContentText>
                    <ContentText variant="h6" sx={{ color: "#FA9A00", mt: 3 }}>제출 기한: {time}</ContentText>
                    <FieldText label="제목" name="title" variant="outlined" sx={{ my: 3, width: "80%" }} defaultValue={title} disabled/>
                    <FieldText label="내용" name="content" variant="outlined" multiline rows={10} sx={{ width: "80%" }} InputLabelProps={{ shrink: true }} defaultValue={content} disabled/>
                    <Column sx={{ justifyContent: "flex-start", mt: 2 }}>
                        {fileList && fileList.map((file, idx) => (
                            <div key={idx} onClick={() => handleDownload(file, 2)}>
                                <ContentText sx={{ justifyContent: "flex-start", mb: 3, width: "80%", cursor: "pointer" }}>
                                    <AttachFileIcon />{file}
                                </ContentText>
                            </div>
                        ))}
                    </Column>
                </OuterBox>
                <OuterBox sx={{ py: 5, mb: 3, alignItems: "center" }}>
                    <ContentText variant="h4">제출</ContentText>
                    {(readData && readData.assignment_submit) ? (
                        <>
                            <FieldText label="제목" name="title" variant="outlined" sx={{ my: 3, width: "80%" }} defaultValue={stuTitle} disabled/>
                            <FieldText label="내용" name="content" variant="outlined" multiline rows={18} sx={{ width: "80%" }} InputLabelProps={{ shrink: true }} defaultValue={stuContent} disabled/>
                            <Column sx={{ justifyContent: "flex-start" }}>
                                {stuFileList && stuFileList.map((file, idx) => (
                                    <div key={idx} onClick={() => handleDownload(file, 1)}>
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
                        </>
                    ): (
                        <Row spacing={3} mt={3}>
                            <CommonButton variant="contained" onClick={handleWriteNotice}>작성</CommonButton>
                            <CommonButton onClick={()=> navigate(-1)} variant="contained">목록</CommonButton>
                        </Row>
                    )}
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default StuReadAssignment;