import { Box, InputAdornment, IconButton, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Row from "../components/Grid/Row";
import { useState } from "react";
import Column from "../components/Grid/Column";
import axios from "axios";
import AuthInput from "../components/AuthInput";
import AuthBody from "../components/AuthBody";
import AuthButton from "../components/Button/AuthButton";
import MainLogo from "../assets/MainLogo.jpg";
import AuthFormText from "../components/Text/AuthFormText";
import AuthModal from "../components/Modal/AuthModal";
import MainTheme from "../styles/muiTheme";
import CommonText from "../components/Text/CommonText";
import FindPw from "../components/Modal/FindPw";
import FindId from "../components/Modal/FindId";

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPw] = useState('');
    const [login] = useState('');
    const [signOpen, setSignOpen] = useState(false);
    const signHandleOpen = () => setSignOpen(true);
    const signHandleClose = () => setSignOpen(false);
    const [pwOpen, setPwOpen] = useState(false);
    const findpwHandleOpen = () => setPwOpen(true);
    const findpwHandleClose = () => setPwOpen(false);
    const [idOpen, setIdOpen] = useState(false);
    const findidHandleOpen = () => setIdOpen(true);
    const findidHandleClose = () => setIdOpen(false);
    const theme = MainTheme;

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onhandlePost = async (data) => {
        const { id, password } = data;
        const postData = { id, password };

        await axios
        .post('http://localhost:3001/', postData)
        .then((response) => {
            console.log(response, "Success!");
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            id: data.get("id"),
            password: data.get("password"),
        };
        const { id, password } = joinData;

        if (id !== "") setId("");
        else setId("ID를 확인해주세요");

        if (password !== "") setPw("");
        else setPw("비밀번호를 확인해주세요");

        if (password !=="" && id !== "") {
            onhandlePost(joinData);
        }
    };

    return(
        <Box sx={{ backgroundColor: theme.palette.primary.main }}>
            <Row>
                <Column sx={{ display: { xs: "none", md: "flex" }, width: "35%", minHeight: "100vh", background: `url(${MainLogo})`, backgroundSize: 'cover' }}>
                    <CommonText variant="h4" sx={{ color: "#DDDDDD", px: 2 }}>즐겁고 편리한<br /><br />대학 생활을 위한 선택<br /><br />University Scheduler</CommonText>
                </Column>
                <AuthBody>
                    <CommonText variant="h4">University Scheduler</CommonText>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>  
                        <AuthInput 
                            required 
                            placeholder="아이디" 
                            name="id" 
                            error={id !== "" || false}
                        />
                        <AuthFormText>{id}</AuthFormText>
                        <AuthInput 
                            required 
                            placeholder="비밀번호" 
                            id="password" 
                            name="password" 
                            error={password !== "" || false} 
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            sx={{ mt: 1 }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} size="small">
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <AuthFormText>{password}</AuthFormText>
                        <AuthButton type="submit" sx={{ mt: 2 }}>
                            <CommonText variant="h6">로그인</CommonText>
                        </AuthButton>
                        <AuthFormText>{login}</AuthFormText>
                    </Box>
                    <Row spacing={2} sx={{ my: 2 }}>
                        <AuthButton onClick={findidHandleOpen}>
                            <CommonText variant="h6">아이디 찾기</CommonText>
                        </AuthButton>
                        <AuthButton onClick={findpwHandleOpen}>
                            <CommonText variant="h6">비밀번호 찾기</CommonText>
                        </AuthButton>
                    </Row>
                    <CommonText variant="h6" sx={{ textAlign: 'center' }}>
                        아직 계정이 없으세요?&nbsp;&nbsp;
                        <Button onClick={signHandleOpen} variant="text" sx={{ "&.MuiButtonBase-root:hover": { bgcolor: "transparent" }, p: 0 }}>
                            <CommonText variant="h6" sx={{ color: "#FFAE6D" }}>
                                회원가입
                            </CommonText>
                        </Button>
                    </CommonText>
                </AuthBody>
                <AuthModal open={signOpen} onClose={signHandleClose} />
                <FindId open={idOpen} onClose={findidHandleClose} />
                <FindPw open={pwOpen} onClose={findpwHandleClose} />
            </Row>
        </Box>
    );
};

export default Login;