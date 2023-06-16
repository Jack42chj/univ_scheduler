import { FormControlLabel, MenuItem, Pagination, Radio, RadioGroup, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import AuthInput from "../../../components/Input/AuthInput";
import OuterBox from "../../../components/Box/OuterBox";
import IconsButton from "../../../components/Button/IconsButton";
import Row from "../../../components/Stack/Row";
import HeaderStu from "../../../components/Header/HeaderStu";
import SearchIcon from '@mui/icons-material/Search';
import ContentText from "../../../components/Input/ContentText";
import BgcolorStack from "../../../components/Stack/BackgroundStack";
import { checkTrim } from "../../../utils/Trim";
import AuthFormText from "../../../components/Input/AuthFormText";
import { useNavigate } from "react-router-dom";
import { search_syllabus } from "../../../services/sdtServices";

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

const YearSem = [
    { year: "2023-1" }, { year: "2022-2" }, { year: "2022-1" }, { year: "2021-2" },
    { year: "2021-1" }, { year: "2020-2" }, { year: "2020-1" },
];

const columns = [
    { id: "sub_code", label: "학정번호" },
    { id: "sub_name", label: "과목명" },
    { id: "time", label: "강의시간" },
    { id: "semester", label: "학기" },
    { id: "professor_name", label: "교수명" },
    { id: "classes", label: "강의실" },
];

function createData(sub_code, sub_name, time, semester, professor_name, classes) {
    return { sub_code, sub_name, time, semester, professor_name, classes };
}

const collegeMajorMap = CollegeList.reduce((acc, curr) => {
    const { college, list } = curr;
    acc[college] = list.map((major) => major.major);
    return acc;
}, {});

const SearchSyllabus = () => {
    const navigate = useNavigate();
    const [college, setCollege] = useState("");
    const [major, setMajor] = useState("");
    const [yearSem, setYearSem] = useState("");
    const [check, setCheck] = useState("");
    
    const handleChangeSemester = (e) => {
        setYearSem(e.target.value);
    };

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

    const [rows, setRow] = useState([]);

    const onhandlePost = async (data) => {
        try{
            const response = await search_syllabus(data);
            if(response.status === 200){
                setRow((response.data.syllabus.map((row) => createData(row.sub_code, row.sub_name, row.time, row.semester, row.professor_name, row.class))));
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            sub_name: data.get("sub_name"),
            professor_name: data.get("professor_name"),
            major: data.get("major"),
            semester: data.get("semester"),
            enrollment: data.get("lesson"),
        };
        const { sub_name, major, semester, professor_name, enrollment } = joinData;
        
        if(enrollment === "전체"){
            if(checkTrim(semester) && ((checkTrim(sub_name) || checkTrim(professor_name)))){
                setCheck("");
                onhandlePost(joinData);
            }
            else{
                setCheck("올바르게 입력하세요");
            }
        }
        else if (enrollment === "수강과목"){
            if(checkTrim(semester)){
                setCheck("");
                onhandlePost(joinData);
            }
            else setCheck("올바르게 입력하세요");
        }
        else{
            setCheck("올바르게 입력하세요");
        }
    };

    const handleClickRow = (data) => {
        console.log(data);
        const url = `/student/read_syl/${data.semester}/${data.sub_name}/`;
        const sendData = {
            "currSemester": data.semester,
            "currSubject": data.sub_name,
            "currSubjectID" : data.sub_code,
            "lectureData": data,
        };
        navigate(url, { state: sendData });
    };

    return(
        <>
            <HeaderStu />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }} component="form" onSubmit={handleSubmit} noValidate>
                    <Stack spacing={2} sx={{ px: 10 }}>
                        <Row sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <ContentText variant="h6">년도/학기</ContentText>
                            <Select
                                value={yearSem}
                                name="semester"
                                onChange={handleChangeSemester}
                                sx={{ width: "70%", height: "48px" }}
                            >
                                <MenuItem value="">년도-학기</MenuItem>
                                {YearSem.map((item) => (
                                    <MenuItem key={item.year} value={item.year}>{item.year}</MenuItem>
                                ))}
                            </Select>
                        </Row>
                        <Row sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <ContentText variant="h6">단과대학</ContentText>
                            <Select
                                value={college}
                                name="college"
                                onChange={handleChangeCollege}
                                sx={{ width: "70%", height: "48px" }}
                            >
                                <MenuItem value="">대학</MenuItem>
                                {CollegeList.map((item) => (
                                    <MenuItem key={item.college} value={item.college}>{item.college}</MenuItem>
                                ))}
                            </Select>
                        </Row>
                        <Row sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <ContentText variant="h6">학과</ContentText>
                            <Select
                                value={major}
                                name="major"
                                onChange={handleChangeMajor}
                                sx={{ width: "70%", height: "48px" }}
                            >
                                <MenuItem value="">학과</MenuItem>
                                {collegeMajorMap[college]?.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </Row>
                        <Row sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <ContentText variant="h6">과목명</ContentText>
                            <AuthInput 
                                required 
                                name="sub_name"
                                sx={{ width: "70%", height: "48px", bgcolor: "#FFFFFF", border: "1px solid", borderColor: "#DDDDDD" }}
                            />
                        </Row>
                        <Row sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <ContentText variant="h6">교수명</ContentText>
                            <AuthInput 
                                required 
                                name="professor_name"
                                sx={{ width: "70%", height: "48px", bgcolor: "#FFFFFF", border: "1px solid", borderColor: "#DDDDDD" }}
                            />
                        </Row>
                        <Row sx={{ alignItems: "center", justifyContent: "space-between" }}>
                            <ContentText variant="h6">수강여부</ContentText>
                            <RadioGroup name="lesson" row defaultValue="whole">
                                <FormControlLabel value="전체" control={<Radio />} label="전체" />                  
                                <FormControlLabel value="수강과목" control={<Radio />} label="수강과목" />
                            </RadioGroup>
                            <IconsButton sx={{ color: "#d4ac85", height: "48px" }} type="submit">
                                <SearchIcon sx={{ px: 0.5 }} />
                            </IconsButton>
                        </Row>
                    </Stack>
                    <Row sx={{ justifyContent: "center" }}>
                        <AuthFormText>{check}</AuthFormText>
                    </Row>
                    <ContentText>학과는 꼭 입력해 주세요. 전체를 선택 시 과목명이나 교수명을 입력해 주세요.</ContentText>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center",}}>
                    <ContentText variant="h4">강의 계획서 조회</ContentText>
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
                                    <TableRow key={row.name} onClick={handleClickRow}>
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

export default SearchSyllabus;