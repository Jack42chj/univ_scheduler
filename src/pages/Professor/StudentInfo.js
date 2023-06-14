import { MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import AuthInput from "../../components/Input/AuthInput";
import OuterBox from "../../components/Box/OuterBox";
import IconsButton from "../../components/Button/IconsButton";
import Row from "../../components/Stack/Row";
import HeaderPro from "../../components/Header/HeaderPro";
import SearchIcon from '@mui/icons-material/Search';
import ContentText from "../../components/Input/ContentText";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import { checkTrim } from "../../utils/Trim";
import AuthFormText from "../../components/Input/AuthFormText";
import { student_info } from "../../services/proServices";
import { useNavigate } from "react-router-dom";

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
    { id: "ph_num", label: "휴대폰" },
];

function createData(major, name, email, ph_num) {
    return { major, name, email, ph_num };
}

const collegeMajorMap = CollegeList.reduce((acc, curr) => {
    const { college, list } = curr;
    acc[college] = list.map((major) => major.major);
    return acc;
}, {});

const StudentInfo = () => {
    const navigate = useNavigate();
    const [college, setCollege] = useState("");
    const [major, setMajor] = useState("");
    const [check, setCheck] = useState("");
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

    // const recvData = {
    //     "studentInfo": [
    //         {
    //             "name": "이동익",
    //             "major": "컴퓨터정보공학부",
    //             "email": "dlehddlr319@naver.com",
    //             "phone_number": "01097330678"
    //         },
    //         {
    //             "name": "asd",
    //             "major": "컴퓨터정보공학부",
    //             "email": "dlehddlr319@naver.com",
    //             "phone_number": "01097330678"
    //         },
    //         {
    //             "name": "123",
    //             "major": "컴퓨터정보공학부",
    //             "email": "dlehddlr319@naver.com",
    //             "phone_number": "01097330678"
    //         },
    //         {
    //             "name": "2626",
    //             "major": "컴퓨터정보공학부",
    //             "email": "dlehddlr319@naver.com",
    //             "phone_number": "01097330678"
    //         },
    //         {
    //             "name": "asasha",
    //             "major": "컴퓨터정보공학부",
    //             "email": "dlehddlr319@naver.com",
    //             "phone_number": "01097330678"
    //         },
    //     ],
    // };

    const [rows, setRow] = useState([]);

    const onhandlePost = async (data) => {
        console.log(data);
        try{
            const response = await student_info(data);
            if(response.status === 201){
                setRow((response.data.studentInfo.map((row) => createData(row.major, row.name, row.email, row.phone_number))));
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            major: data.get("major"),
            name: data.get("name"),
        };
        const { name, major } = joinData;
        if(checkTrim(name) || checkTrim(major)){
            setCheck("");
            onhandlePost(joinData);
        }
        else{
            setCheck("학과를 선택하거나 이름을 입력하세요");
        }
    };

    return(
        <>
            <HeaderPro />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }} component="form" onSubmit={handleSubmit} noValidate>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">단과대학</ContentText>
                        <Select
                            value={college}
                            name="college"
                            onChange={handleChangeCollege}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            <MenuItem value="">단과대학</MenuItem>
                            {CollegeList.map((list) => (
                                <MenuItem key={list.college} value={list.college}>{list.college}</MenuItem>
                            ))}
                        </Select>
                        <ContentText variant="h6">학과</ContentText>
                        <Select
                            value={major}
                            name="major"
                            onChange={handleChangeMajor}
                            displayEmpty
                            sx={{ width: "30%", height: "48px" }}
                        >
                            <MenuItem value="">학과</MenuItem>
                            {collegeMajorMap[college]?.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                    <Stack direction="row" justifyContent="center" my={2} spacing={3}>
                        <ContentText variant="h6">이름</ContentText>
                        <AuthInput 
                            required 
                            name="name"
                            sx={{ width: "30%", bgcolor: "#FFFFFF", border: "1px solid", borderColor: "#DDDDDD" }}
                        />
                        <IconsButton sx={{ color: "#d4ac85" }} type="submit">
                            <SearchIcon sx={{ px: 0.5 }} />
                        </IconsButton>
                    </Stack>
                    <Row sx={{ justifyContent: "center" }}>
                        <AuthFormText>{check}</AuthFormText>
                    </Row>
                    <ContentText>학과 또는 이름을 입력해 원하는 학생을 찾으세요.</ContentText>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <ContentText variant="h4">학생 정보조회</ContentText>
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
            </BgcolorStack>
        </>
    );
};

export default StudentInfo;