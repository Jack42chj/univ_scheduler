import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState, useEffect } from "react";
import BgcolorBox from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import CommonButton from "../../../components/Button/CommonButton";
import Row from "../../../components/Stack/Row";
import HeaderPro from "../../../components/Header/HeaderPro";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentText from "../../../components/Input/ContentText";
import { useLocation, useNavigate } from "react-router-dom";
import { assignment_download } from "../../../services/userServices";
import FieldText from "../../../components/Input/FieldText";
import Column from "../../../components/Stack/Column";
import { assignment_delete, assignment_read } from "../../../services/proServices";

const columns = [
    { id: "id", label: "학번"},
    { id: "name", label: "이름" },
    { id: "title", label: "제목" },
    { id: "content", label: "내용" },
    { id: "file", label: "파일" },
];

function createData(id ,name, title, content, file) {
    return { id, name, title, content, file };
};

const ReadAssignment = () => {
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

    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

    const [readData, setReadData] = useState();

    const getAssignData = async () => {
        try{
            const response = await assignment_read(currSubjectID, currSemester, assignID);
            if(response.status === 201){
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
        getAssignData();
    }, []);

    const rows = [];
    if(readData && readData.assignment_submit_list){
        const list = readData.assignment_submit_list;
        for(let i = 0; i < list.length; i++){
            const stu_fileList = [];
            for(let j = 0; j < list[i].file_names.length; j++){
                stu_fileList.push(list[i].file_names[j]);
            }
            rows.push(createData(list[i].student_id, list[i].student_name, list[i].title, list[i].content, stu_fileList));
        };
    };

    const content = readData ? readData.assignment.content : null;
    const fileList = readData ? readData.assignment.file_name : [];

    const onhandleDelete = async () => {
        try{
            const response = await assignment_delete(currSubjectID, currSemester, assignID);
            if(response.status === 201){
                alert("과제 삭제 성공!");
                navigate(`/professor/assign_list/${currSemester}/${currSubjectID}`, {
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
        const url = `/professor/edit_assign/${currSemester}/${currSubjectID}/${assignID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "subjectList" : subjectList,
            "semesterList" : semesterList,
            "assignID" : assignID,
            "title" : title,
            "content" : content,
            "time" : time,
        };
        navigate(url, { state: sendData });
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
                <OuterBox sx={{ py: 5, mb: 3, alignItems: "center"}}>
                    <ContentText variant="h4">과제</ContentText>
                    <ContentText variant="h6" sx={{ color: "#FA9A00", mt: 3 }}>제출 기한: {time}</ContentText>
                    <FieldText label="제목" name="title" variant="outlined" sx={{ my: 3, width: "80%" }} defaultValue={title} disabled/>
                    <FieldText label="내용" name="content" variant="outlined" multiline rows={18} sx={{ width: "80%" }} InputLabelProps={{ shrink: true }} defaultValue={content} disabled/>
                    <Column sx={{ justifyContent: "flex-start", mt: 2 }}>
                        {fileList && fileList.map((file, idx) => (
                            <div key={idx} onClick={() => handleDownload(file, 2)}>
                                <ContentText sx={{ justifyContent: "flex-start", mb: 3, width: "80%", cursor: "pointer" }}>
                                    <AttachFileIcon />{file}
                                </ContentText>
                            </div>
                        ))}
                    </Column>
                    <Row spacing={3}>
                        <CommonButton onClick={handleEdit} variant="contained">수정</CommonButton>
                        <CommonButton variant="contained" onClick={onhandleDelete}>삭제</CommonButton>
                        <CommonButton onClick={()=> navigate(-1)} variant="contained">목록</CommonButton>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, mb: 3, alignItems: "center" }}>
                    <ContentText variant="h4">제출 목록</ContentText>
                    <TableContainer sx={{ width: "90%", py: 5}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                                    <TableRow key={idx} >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === "file") {
                                            return (
                                                <TableCell key={column.label} align="center">
                                                {Array.isArray(value) ? (
                                                    value.map((file, index) => (
                                                    <div key={index} onClick={() => handleDownload(file, row.id)}>
                                                        <ContentText sx={{ justifyContent: "flex-start", mb: 3, width: "80%", cursor: "pointer" }}>
                                                        <AttachFileIcon /> {file}
                                                        </ContentText>
                                                    </div>
                                                    ))
                                                ) : (
                                                    <div onClick={() => handleDownload(value, row.id)}>
                                                    <ContentText sx={{ justifyContent: "flex-start", mb: 3, width: "80%", cursor: "pointer" }}>
                                                        <AttachFileIcon /> {value}
                                                    </ContentText>
                                                    </div>
                                                )}
                                                </TableCell>
                                            );
                                            }
                                            return (
                                            <TableCell key={column.label} align="center">
                                                {value}
                                            </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page + 1}
                        onChange={handleChangePage}
                    />
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default ReadAssignment;