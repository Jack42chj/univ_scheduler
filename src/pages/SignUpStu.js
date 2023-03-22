import { InputAdornment, IconButton, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import AuthBody from "../components/AuthBody";
import Row from "../components/Grid/Row";
import Column from "../components/Grid/Column";
import CommonText from "../components/Text/CommonText";
import AuthFormText from "../components/Text/AuthFormText";
import AuthButton from "../components/Button/AuthButton";
import MainTheme from "../styles/muiTheme";
import AuthSchoolMenu from "../components/AuthSchoolMenu";
import AuthInput from "../components/AuthInput";
import StudentLoginLogo from "../assets/StudentLoginLogo.jpg";

const SignUpStu = () => {
    const theme = MainTheme;
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [emailError, setEmailError] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [register, setRegister] = useState("");

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onhandlePost = async ({ email, bio, password }) => {

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            email: data.get("email"),
            bio: data.get("bio"),
            password: data.get("password"),
        };
        const { email, bio, password } = joinData;

        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email))
            setEmailError("Incorrect Email Address!");
        else setEmailError("");

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(password))
            setPasswordState(
            "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
        );
        else setPasswordState("");

        if (
            emailRegex.test(email) &&
            passwordRegex.test(password)
        ) {
            onhandlePost(joinData);
        }
        else
        setRegister("SignUp Failed!");
    };

    return (
        <Box sx={{ backgroundColor: theme.palette.primary.main }}>
            <Row>
                <Column sx={{ display: { xs: "none", md: "flex" }, width: "35%", minHeight: "100vh", background: `url(${StudentLoginLogo})`, backgroundSize: 'cover' }}>
                    <CommonText variant="h4" sx={{ color: "#FFAE6D", px: 2 }}>Veritas<br/><br/>Lux<br/><br/>Mea</CommonText>
                </Column>
                <AuthBody>
                    <CommonText variant="h4">학생으로 시작할까요?</CommonText>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>  
                        <AuthInput 
                            required 
                            placeholder="이름"
                            id="name"
                            name="name"
                        />
                        <Row>
                            <AuthInput 
                                required 
                                placeholder="아이디" 
                                id="id"
                                name="id"
                                sx={{ width: "69%" }}
                            />
                            <AuthButton sx={{ width: "28%" }}>
                                중복확인
                            </AuthButton>
                        </Row>
                        <AuthInput 
                            required 
                            placeholder="비밀번호" 
                            id="password" 
                            name="password" 
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} size="small">
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <AuthInput 
                            required 
                            placeholder="비빌번호 확인" 
                            id="check" 
                            name="check" 
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} size="small">
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Row>
                            <AuthSchoolMenu />
                            <AuthInput 
                                required 
                                placeholder="전공"
                                id="major"
                                name="major"
                                sx={{ width: "50%" }}
                            />
                        </Row>
                        <AuthInput 
                            required 
                            placeholder="이메일" 
                            id="email"
                            name="email"
                        />
                        <AuthButton type="submit" sx={{ mt: 2 }}>
                            <CommonText variant="h6">회원가입</CommonText>
                        </AuthButton>
                        <AuthFormText>{register}</AuthFormText>
                    </Box>
                </AuthBody>
            </Row>
        </Box>
    );
};

export default SignUpStu;