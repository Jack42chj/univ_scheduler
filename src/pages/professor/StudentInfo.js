import { MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import AuthInput from "../../components/AuthInput";
import BgcolorBox from "../../components/Box/BgcolorStack";
import OuterBox from "../../components/Box/OuterBox";
import IconBtn from "../../components/Button/IconBtn";
import Row from "../../components/Grid/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import CommonText from "../../components/Text/CommonText";
import SearchIcon from '@mui/icons-material/Search';

const CollegeList = [
    {college: "전자정보공과대학", list: [
        {major: "전자공학과"}, {major: "전자통신공학과"}, {major: "전자융합공학과"},
        {major: "전자재료공학과"}, {major: "전기공학과"}, {major: "로봇학부"},
    ]}, 
    {college: "소프트웨어융합대학", list: [
        {major: "컴퓨터정보공학부"}, {major: "소프트웨어학부"}, {major: "정보융합학부"},
    ]}, 
    {college: "공학대학", list: [
        {major: "건축공학과"}, {major: "화학공학과"}, {major: "환경공학과"}, {major: "건축학과"},
    ]}, 
    {college: "자연과학대학", list: [
        {major: "수학과"}, {major: "전자바이오물리학과"}, {major: "화학과"}, {major: "스포츠융합과학과"},
    ]},
    {college: "인문사회과학대학", list: [
        {major: "국어국문학과"}, {major: "영어산업학과"}, {major: "미디어커뮤니케이션학부"}, {major: "산업심리학과"}, {major: "동북아문화산업학부"},
    ]}, 
    {college: "정책법학대학", list: [
        {major: "행정학과"}, {major: "법학부"}, {major: "국제학부"}, {major: "자산관리학과"},
    ]}, 
    {college: "경영대학", list: [
        {major: "경영학부"}, {major: "국제통상학부"},
    ]},
];

const columns = [
    { id: "major", label: "학과" },
    { id: "name", label: "이름" },
    { id: "email", label: "이메일" },
    { id: "ph_num", label: "휴데폰 번호" },
];

function createData(major, name, email, ph_num) {
    return { major, name, email, ph_num };
}

const rows = [
    createData("컴퓨터정보공학부", "최호진", "hojinch99@naver.com", "010-5064-8771"),
    createData("컴퓨터정보공학부", "김우곤", "asd123@naver.com", "010-5555-8771"),
    createData("컴퓨터정보공학부", "이동익", "123asd@naver.com", "010-7777-8771"),
    createData("컴퓨터정보공학부", "홍길동", "hjk123@naver.com", "010-1111-8771"),
    createData("컴퓨터정보공학부", "이기훈", "khj142@naver.com", "010-2222-8771"),
    createData("컴퓨터정보공학부", "사마의", "qpw525@naver.com", "010-3333-8771"),
];

const collegeMajorMap = CollegeList.reduce((acc, curr) => {
    const { college, list } = curr;
    acc[college] = list.map((major) => major.major);
    return acc;
}, {});

const StudentInfo = () => {
    const [college, setCollege] = useState("");
    const [major, setMajor] = useState("");
    const handleChangeCollege = (e) => {
        setCollege(e.target.value);
        setMajor("");
    };
    const handleChangeMajor = (e) => setMajor(e.target.value);
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

    return(
        <>
            <HeaderPro />
            <BgcolorBox sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <CommonText variant="h6">단과대학</CommonText>
                        <Select
                            value={college}
                            name="college"
                            onChange={handleChangeCollege}
                            displayEmpty
                            sx={{ width: "30%" }}
                        >
                            <MenuItem value="">단과대학</MenuItem>
                            {Object.keys(CollegeList).map((list) => (
                                <MenuItem key={CollegeList[list].college} value={CollegeList[list].college}>{CollegeList[list].college}</MenuItem>
                            ))}
                        </Select>
                        <CommonText variant="h6">학과</CommonText>
                        <Select
                            value={major}
                            name="major"
                            onChange={handleChangeMajor}
                            displayEmpty
                            sx={{ width: "30%" }}
                        >
                            <MenuItem value="">학과</MenuItem>
                            {collegeMajorMap[college]?.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                    
                    <Stack direction="row" justifyContent="center" mt={2} spacing={3}>
                        <CommonText variant="h6">이름</CommonText>
                        <AuthInput 
                            required 
                            name="name"
                            sx={{ width: "30%", bgcolor: "#FCDEC0" }}
                        />
                        <IconBtn>
                            <SearchIcon />
                        </IconBtn>
                    </Stack>
                    
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <CommonText variant="h4">학생 정보조회</CommonText>
                    <TableContainer sx={{ width: "90%", py: 5}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="center">
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.name}>
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
            </BgcolorBox>
        </>
    );
};

export default StudentInfo;