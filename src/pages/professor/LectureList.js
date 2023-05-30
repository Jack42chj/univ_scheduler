import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import OuterBox from "../../components/Box/OuterBox";
import HeaderPro from "../../components/Header/HeaderPro";
import Row from "../../components/Stack/Row";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import ContentText from "../../components/Input/ContentText";
import { professor_main } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

const columns = [
    { id: "num", label: "학정번호" },
    { id: "name", label: "과목명" },
    { id: "period", label: "교시" },
    { id: "room", label: "강의실" },
];

function createData(num, name, period, room) {
    return { num, name, period, room };
};

const LectureList = () => {
    const data = {
        "studet": [
            {
                "name": "이동익",
                "id": 2018202004
            }
        ],
        "all_semester": [
            {
                "semester": "2023-1"
            },
            {
                "semester": "2022-2"
            }
        ],
        "semester": "2023-1",
        "schedule": [
            {
                "sub_code": "1111-1-11-1111",
                "sub_name": "데이터구조설계",
                "time": "월3수4",
                "class": "새빛302호",
                "professor_name": "test"
            },
            {
                "sub_code": "1111-1-11-1112",
                "sub_name": "KW_VIP",
                "time": "월3수4",
                "class": "새빛302호",
                "professor_name": "test"
            },
            {
                "sub_code": "1111-1-11-1113",
                "sub_name": "소프트웨어공학",
                "time": "월3수4",
                "class": "새빛302호",
                "professor_name": "test"
            }
        ],
        "subject_notice": []
    };
    // const [data, setData] = useState();
    // useEffect(() => {
    //     try {
    //         const response = professor_main();
    //         setData(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, []);
    const semesterList = data.all_semester;
    const currSemester = data.semester;
    const [semester, setSemester] = useState(currSemester);
    const handleChangeSemester = (e) => setSemester(e.target.value);
    const scheduleList = data.schedule;
    const subjectList = [];
    const rows = [];
    for(let i = 0; i < scheduleList.length; i++){
        rows.push(createData(scheduleList[i].sub_code, scheduleList[i].sub_name, scheduleList[i].time, scheduleList[i].class));
        subjectList.push({"name": scheduleList[i].sub_name});
    };

    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

    const navigate = useNavigate();
    const handleClickRow = (data) => {
        const url = `/professor/lecture/${data.num}`;
        const sendData = {
            "currSemester": currSemester,
            "semesterList": semesterList,
            "subjectList": subjectList,
            data
        };
        navigate(url, { state: sendData });
    };

    return(
        <>
            <HeaderPro />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={semester}
                            name="semester"
                            onChange={handleChangeSemester}
                            displayEmpty
                            sx={{ width: "50%", height: "48px" }}
                            defaultValue={currSemester}
                        >
                            {semesterList.map((year) => (
                                <MenuItem key={year.semester} value={year.semester}>{year.semester}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <ContentText variant="h4">강의 관리</ContentText>
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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.name} onClick={()=> handleClickRow(row)}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
                                                    {value}
                                                </TableCell>
                                            );})}
                                        
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
            </BgcolorStack>
        </>
    );
};

export default LectureList;