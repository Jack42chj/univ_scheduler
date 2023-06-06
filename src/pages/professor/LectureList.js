import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import OuterBox from "../../components/Box/OuterBox";
import HeaderPro from "../../components/Header/HeaderPro";
import Row from "../../components/Stack/Row";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import ContentText from "../../components/Input/ContentText";
import { professor_change_main, professor_main } from "../../services/userServices";
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
                "name": "데이터구조설계",
                "time": "월3수4",
                "class": "새빛302호",
                "professor_name": "test"
            },
            {
                "sub_code": "1111-1-11-1112",
                "name": "KW_VIP",
                "time": "월3수4",
                "class": "새빛302호",
                "professor_name": "test"
            },
            {
                "sub_code": "1111-1-11-1113",
                "name": "소프트웨어공학",
                "time": "월3수4",
                "class": "새빛302호",
                "professor_name": "test"
            }
        ],
        "subject_notice": []
    };
    const navigate = useNavigate();
    //const [data, setData] = useState();
    const rows = [];
    const subjectList = [];
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    // const getData = async () => {
    //     const response = await professor_main();
    //     setData(response.data);
    // }
    // useEffect(() => {
    //     getData();
    // }, []);

    const semesterList = data ? data.all_semester : [];
    const currSemester = data ? data.semester : [];
    const scheduleList = data ? data.schedule : [];
    // const handleChangeSemester = async (e) => {
    //     const sendData = { "semester": e.target.value }
    //     try{
    //         const resp = await professor_change_main(sendData);
    //         if(resp.status === 201){
    //             setData(resp.data);
    //         }
    //     }
    //     catch(err){console.log(err)}
    // };
    for(let i = 0; i < scheduleList.length; i++){
        rows.push(createData(scheduleList[i].sub_code, scheduleList[i].name, scheduleList[i].time, scheduleList[i].class));
        let listData = {"name": scheduleList[i].name, "sub_ID": scheduleList[i].sub_code};
        subjectList.push(listData);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const handleClickRow = (data) => {
        const url = `/professor/lecture/${currSemester}/${data.num}`;
        const sendData = {
            "currSemester": currSemester,
            "semesterList": semesterList,
            "subjectList": subjectList,
            data
        };
        navigate(url, { state: sendData });
    };

    return(
        <div>
            <HeaderPro />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={currSemester}
                            name="semester"
                            //onChange={handleChangeSemester}
                            displayEmpty
                            sx={{ width: "50%", height: "48px" }}
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
                                        <TableCell key={column.label} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.num} onClick={()=> handleClickRow(row)}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={value} align="center">
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
        </div>
    );
};

export default LectureList;