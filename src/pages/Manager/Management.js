import { MenuItem, Pagination, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import AuthInput from "../../components/Input/AuthInput";
import OuterBox from "../../components/Box/OuterBox";
import IconsButton from "../../components/Button/IconsButton";
import Row from "../../components/Stack/Row";
import HeaderRoot from "../../components/Header/HeaderRoot";
import SearchIcon from '@mui/icons-material/Search';
import ContentText from "../../components/Input/ContentText";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import CloseIcon from '@mui/icons-material/Close';
import { checkTrim } from "../../utils/Trim";
import AuthFormText from "../../components/Input/AuthFormText";
import { useNavigate } from "react-router-dom";
import { delete_user, search_user } from "../../services/userServices";

const JobList = [
    {job: "교수"}, {job: "학생"}, 
];

const columns = [
    { id: "id", label: "학번" },
    { id: "name", label: "이름" },
];

function createData(id, name) {
    return { id, name };
}

const Management = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState("");
    const [check, setCheck] = useState("");
    const handleChangeJob = (e) => {
        setJob(e.target.value);
    };

    const [page, setPage] = useState(0);
    const rowsPerPage = 5;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage - 1);
    };

    const [rows, setRow] = useState([]);

    const onhandlePost = async (data) => {
        try{
            const response = await search_user(data);
            if(response.status === 200){
                setRow(response.data.user.map((row) => createData(row.id, row.name)));
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

    const onhandleDelete = async (data) => {
        try{
            const response = await delete_user(data);
            if(response.status === 200){
                alert("계정 삭제 성공");
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
            job: data.get("job"),
            id: data.get("id"),
            name: data.get("name"),
        };
        const { job, id, name } = joinData;
        if(checkTrim(job) && (checkTrim(id) || checkTrim(name))){
            setCheck("");
            onhandlePost(joinData);
        }
        else{
            setCheck("직업을 선택하고 이름 또는 학번을 입력하세요");
        }
    };

    const handleClickRow = async(data) => {
        const deleteData = {
            "id" : data.id
        };
        onhandleDelete(deleteData);
    };

    return(
        <>
            <HeaderRoot />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 3 }} component="form" onSubmit={handleSubmit} noValidate>
                    <Row sx={{ justifyContent: "space-around"}}>   
                        <ContentText variant="h6">직업</ContentText>
                        <Select
                            value={job}
                            name="job"
                            onChange={handleChangeJob}
                            displayEmpty
                            sx={{ width: "20%", height: "48px" }}
                        >
                            <MenuItem value="">선택</MenuItem>
                            {JobList.map((list) => (
                                <MenuItem key={list.job} value={list.job}>{list.job}</MenuItem>
                            ))}
                        </Select>
                        <ContentText variant="h6">학번</ContentText>
                        <AuthInput 
                            required 
                            name="id"
                            sx={{ width: "20%", bgcolor: "#FFFFFF", border: "1px solid", borderColor: "#DDDDDD" }}
                        />
                        <ContentText variant="h6">이름</ContentText>
                        <AuthInput 
                            required 
                            name="name"
                            sx={{ width: "20%", bgcolor: "#FFFFFF", border: "1px solid", borderColor: "#DDDDDD" }}
                        />
                        <IconsButton sx={{ color: "#d4ac85", height: "48px" }} type="submit">
                            <SearchIcon sx={{ px: 0.5 }} />
                        </IconsButton>
                    </Row>
                    <Row sx={{ justifyContent: "center" }}>
                        <AuthFormText>{check}</AuthFormText>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center"}}>
                    <ContentText variant="h4">회원조회</ContentText>
                    <TableContainer sx={{ width: "90%", py: 5}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell align="center" sx={{ fontSize: 18, color: "#7D5A50" }}>삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <>
                                        <TableRow key={row.name}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align="center">
                                                    {value}
                                                </TableCell>
                                            );})}
                                            <TableCell align="center">
                                                <IconsButton onClick={() => {handleClickRow(row)}} sx={{ color: "#f56642", width: "36px", height: "36px" }}><CloseIcon fontSize="large"/></IconsButton>
                                            </TableCell>
                                        </TableRow>    
                                    </>
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

export default Management;