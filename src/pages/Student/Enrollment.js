import { MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState, useEffect } from "react";
import AuthInput from "../../components/Input/AuthInput";
import OuterBox from "../../components/Box/OuterBox";
import IconsButton from "../../components/Button/IconsButton";
import Row from "../../components/Stack/Row";
import HeaderStu from "../../components/Header/HeaderStu";
import SearchIcon from '@mui/icons-material/Search';
import ContentText from "../../components/Input/ContentText";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { checkTrim } from "../../utils/Trim";
import AuthFormText from "../../components/Input/AuthFormText";
import { useNavigate } from "react-router-dom";
import { add_enrollment, delete_enrollment, enrollment_list, search_enrollment } from "../../services/sdtServices";

const CollegeList = [
    {college: "대학 공통", list: [
        {major: "공통"},
    ]}, 
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

const column_one = [
    { id: "sub_code", label: "학정번호" },
    { id: "sub_name", label: "과목명" },
    { id: "professor_name", label: "교수명" },
    { id: "classification", label: "이수구분" },
    { id: "credit", label: "학점" },
    { id: "remain_seat", label: "여석" },
    { id: "time", label: "요일" },
    { id: "classes", label: "강의실" },
];

const column_two = [
    { id: "sub_code", label: "학정번호" },
    { id: "sub_name", label: "과목명" },
    { id: "professor_name", label: "교수명" },
    { id: "classification", label: "이수구분" },
    { id: "credit", label: "학점" },
    { id: "time", label: "요일" },
    { id: "classes", label: "강의실" },
];

function create_oneData(sub_code, sub_name, professor_name, classification, credit, remain_seat, time, classes) {
    return { sub_code, sub_name, professor_name, classification, credit, remain_seat, time, classes };
};

function create_twoData(sub_code, sub_name, professor_name, classification, credit, time, classes){
    return { sub_code, sub_name, professor_name, classification, credit, time, classes };
}

const collegeMajorMap = CollegeList.reduce((acc, curr) => {
    const { college, list } = curr;
    acc[college] = list.map((major) => major.major);
    return acc;
}, {});

const Enrollment = () => {
    const navigate = useNavigate();
    const [college, setCollege] = useState("");
    const [major, setMajor] = useState("");
    const [check, setCheck] = useState("");

    const handleChangeCollege = (e) => {
        setCollege(e.target.value);
        setMajor("");
    };

    const handleChangeMajor = (e) => setMajor(e.target.value);

    const [page_one, setPageOne] = useState(0);
    const [page_two, setPageTwo] = useState(0);
    const rowsPerPage = 5;
  
    const handleChangePageOne = (event, newPage) => {
        setPageOne(newPage - 1);
    };

    const handleChangePageTwo = (event, newPage) => {
        setPageTwo(newPage - 1);
    };

    const [myList, setMyList] = useState();

    const getMyList = async () => {
        try{
            const response = await enrollment_list();
            if(response.status === 200){
                setMyList(response.data);
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
        getMyList();
    }, []);

    const myRow = [];
    if(myList && myList.enrollment_list){
        const list =  myList.enrollment_list;
        for(let i = 0; i < list.length; i++){
            myRow.push(create_twoData(list[i].sub_code, list[i].sub_name, list[i].professor_name, list[i].classification, list[i].credit, list[i].time, list[i].class));
        };
    };

    const [listRow, setListRow] = useState([]);

    const onhandlePost = async (data) => {
        console.log(data);
        try{
            const response = await search_enrollment(data);
            if(response.status === 200){
                setListRow((response.data.sub_list.map((row) => create_oneData(row.sub_code, row.sub_name, row.professor_name, row.classification, row.credit, row.remain_seat, row.time, row.class))));
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
            major: data.get("major"),
        };
        const { sub_name, major} = joinData;
        
        if(checkTrim(sub_name) || checkTrim(major)){
            setCheck("");
            onhandlePost(joinData);
        }
        else setCheck("올바르게 입력하세요");
    };

    const onhandleDelete = async(data) => {
        try{
            console.log(data);
            const response = await delete_enrollment(data);
            if(response.status === 200){
                alert("수강 삭제 성공!");
                window.location.reload();
            } 
        } catch (err){
            console.log(err);
        }
    }

    const onhandleInsert = async(data) => {
        try{
            const response = await add_enrollment(data);
            if(response.status === 200){
                alert("수강 신청 성공!");
                window.location.reload();
            } 
        } catch (err){
            if (err.response && (err.response.status === 419 || err.response.status === 401)) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else if(err.response.status === 409){
                alert("강의시간 중복");
            } else if(err.response.status === 413){
                alert("학점 초과(18학점)");
            } else if(err.response.status === 400){
                alert("과목명 중복");
            } else if(err.response.status === 403){
                alert("여석 부족");
            } else{
                console.log(err);
            }
        }
    }

    const handleClickRow = (data, num) => {
        if(num == 1){
            onhandleInsert(data);
        }
        else{
            onhandleDelete(data);
        }
    };

    return(
        <>
            <HeaderStu />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ py: 2, justifyContent: "center", alignItems: "center",}}>
                    <ContentText variant="h4">수강 신청</ContentText>
                    <TableContainer sx={{ width: "90%", py: 1}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {column_one.map((column) => (
                                        <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>신청</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listRow.slice(page_one * rowsPerPage, page_one * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow key={row.name}>
                                        {column_one.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
                                                    {value}
                                                </TableCell>
                                            );})}
                                            <TableCell align="center">
                                                <IconsButton onClick={() => {handleClickRow(row, 1)}} sx={{ color: "#f56642", width: "36px", height: "36px" }}><AddIcon fontSize="large"/></IconsButton>
                                            </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(listRow.length / rowsPerPage)}
                        page_one={page_one + 1}
                        onChange={handleChangePageOne}
                    />
                </OuterBox>
                <OuterBox sx={{ my: 3, py: 1 }} component="form" onSubmit={handleSubmit} noValidate>
                    <Stack spacing={1} sx={{ px: 30 }}>
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
                            <ContentText>학과와 과목명으로 검색해주세요.</ContentText>
                            <IconsButton sx={{ color: "#d4ac85", height: "48px" }} type="submit">
                                <SearchIcon sx={{ px: 0.5 }} />
                            </IconsButton>
                        </Row>
                    </Stack>
                    <Row sx={{ justifyContent: "center" }}>
                        <AuthFormText>{check}</AuthFormText>
                    </Row>
                </OuterBox>
                { myList && myList.enrollment_list && (
                        <OuterBox sx={{ justifyContent: "center", alignItems: "center" }}>
                        <ContentText variant="h4">나의 수강 신청 목록</ContentText>
                        <TableContainer sx={{ width: "90%", py: 1}}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        {column_two.map((column) => (
                                            <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                        <TableCell align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>삭제</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {myRow.slice(page_two * rowsPerPage, page_two * rowsPerPage + rowsPerPage).map((row) => (
                                        <TableRow key={row.name}>    
                                            {column_two.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align="center">
                                                        {value}
                                                    </TableCell>
                                                    
                                                );})}
                                                <TableCell align="center">
                                                    <IconsButton onClick={() => {handleClickRow(row, 2)}} sx={{ color: "#f56642", width: "36px", height: "36px" }}><CloseIcon fontSize="large"/></IconsButton>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Pagination
                            count={Math.ceil(myList.length / rowsPerPage)}
                            page_two={page_two + 1}
                            onChange={handleChangePageTwo}
                        />
                    </OuterBox>
                )}
            </BgcolorStack>
        </>
    );
};

export default Enrollment;