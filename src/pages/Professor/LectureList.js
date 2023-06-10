import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import OuterBox from "../../components/Box/OuterBox";
import HeaderPro from "../../components/Header/HeaderPro";
import Row from "../../components/Stack/Row";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import ContentText from "../../components/Input/ContentText";
import { professor_change_main, professor_main } from "../../services/proServices";
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
    const navigate = useNavigate();
    const [data, setData] = useState();
    const handleChangeSemester = async (e) => {
        const sendData = { "semester": e.target.value }
        console.log(sendData);
        try{
            const resp = await professor_change_main(sendData);
            if(resp.status === 201){
                setData(resp.data);
            }
            else if(resp.status === 401){
                console.log("잘못된 access 토큰!");
            }
            else if(resp.status === 419){
                console.log("access 토큰 만료!");
            }
            else
                alert(resp.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const rows = [];
    const subjectList = [];
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    const getData = async () => {
        const response = await professor_main();
        setData(response.data);
    }
    useEffect(() => {
        getData();
    }, []);

    const semesterList = data ? data.all_semester : [];
    const currSemester = data ? data.semester : [];
    const scheduleList = data ? data.schedule : [];
    
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
                            onChange={handleChangeSemester}
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
                            <TableBody sx={{ cursor: "pointer" }}>
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