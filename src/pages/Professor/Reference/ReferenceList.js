import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { reference_list } from "../../../services/userServices";
import HeaderPro from "../../../components/Header/HeaderPro";
import BgcolorStack from "../../../components/Stack/BackgroundStack";
import OuterBox from "../../../components/Box/OuterBox";
import Row from "../../../components/Stack/Row";
import ContentText from "../../../components/Input/ContentText";
import CommonButton from "../../../components/Button/CommonButton";

const columns = [
    { id: "num", label: "번호" },
    { id: "title", label: "제목" },
    { id: "filexo", label: "파일" },
    { id: "writer", label: "작성자" },
    { id: "date", label: "작성일" },
    { id: "view_count", label: "조회수" },
];

function createData(num, title, filexo, writer, date, view_count) {
    if(filexo === 1) filexo = <FilePresentIcon />;
    else filexo = "";
    return { num, title, filexo, writer, date, view_count };
};

const ReferenceList = () => {
    const navigate = useNavigate();
    const recvData = useLocation().state;
    const currSemester = recvData.currSemester;
    const semesterList = recvData.semesterList;
    const currSubject = recvData.currSubject;
    const subjectList = recvData.subjectList;
    const currSubjectID = recvData.currSubjectID;

    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const [referenceList, setReferenceList] = useState();

    const getRefList = async () => {
        try{
            const response = await reference_list(currSubjectID, currSemester);
            if(response.status === 201){
                setReferenceList(response.data);
            }
        } catch (err) {
            if (err.response && err.response.status.toString().startswith('4')) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else {
                console.log(err);
            }
        }
    };
    useEffect(() => {
        getRefList();
    }, []);
    
    const rows = [];
    if(referenceList && referenceList.lecture_material){
        const list = referenceList.lecture_material;
        for(let i = 0; i < list.length; i++){
            let file_exist = 0;
            if(list[i].file_names[0] !== null) file_exist = 1;
            rows.push(createData(list[i].id, list[i].title, file_exist , list[i].writer, list[i].created_time, list[i].view));
        };
    };

    const handleClickRow = (data) => {
        const refID = data.num;
        const title = data.title;
        const writer = data.writer;
        const date = data.date;
        const view = data.view_count;
        const url = `/professor/read_ref/${currSemester}/${currSubjectID}/${refID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID": currSubjectID,
            "semesterList" : semesterList,
            "subjectList" : subjectList,
            "refID" : refID,
            "title" : title,
            "writer" : writer,
            "date" : date,
            "view" : view,
        };
        navigate(url, { state: sendData });
    };

    const handleWriteReference = () => {
        const url = `/professor/write_ref/${currSemester}/${currSubjectID}`;
        const sendWriteData = {
            "currSemester": currSemester,
            "currSubject": currSubject,
            "currSubjectID" : currSubjectID,
            "semesterList" : semesterList,
            "subjectList" : subjectList,
        };
        navigate(url, { state: sendWriteData });
    };

    return(
        <>
            <HeaderPro />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={currSemester}
                            name="semester"
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            {semesterList.map((year) => (
                                <MenuItem key={year.semester} value={year.semester}>{year.semester}</MenuItem>
                            ))}
                        </Select>
                        <ContentText variant="h6">과목명</ContentText>
                        <Select
                            value={currSubject}
                            name="subject"
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            {subjectList.map((list) => (
                                <MenuItem key={list.name} value={list.name}>{list.name+'('+ list.sub_ID +')'}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <ContentText variant="h4">강의자료실</ContentText>
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
                            <TableBody sx={{ cursor: "pointer" }}>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                                    <TableRow key={idx} onClick={() => handleClickRow(row)}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
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
                    <Row spacing={3} mt={3}>
                        <CommonButton variant="contained" onClick={handleWriteReference}>작성</CommonButton>
                        <CommonButton variant="contained" onClick={() => navigate(-1)}>이전</CommonButton>
                    </Row>
                </OuterBox>
            </BgcolorStack>
        </>
    );
};

export default ReferenceList;