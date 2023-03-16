import { InputBase, Button, InputAdornment, IconButton, Box, FormHelperText, Typography, Stack } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import AuthBody from "../components/AuthBody";

const SignUpPro = () => {

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [emailError, setEmailError] = useState("");
    const [passwordState, setPasswordState] = useState("");
    const [registerError, setRegisterError] = useState("");

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
            setRegisterError("SignUp Failed!");
    };

    return (
        <>
            <AuthBody>
                <Box sx={{ mt: 10 }}>
                    <Typography variant="h5" my={6} fontWeight="700">
                        교수로 시작할까요?
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >
                            <InputBase
                                required
                                placeholder="아이디"
                                id="id"
                                name="id"
                                sx={{
                                    bgcolor: "#F4F4F4",
                                    width: "72%",
                                    height: 50,
                                    borderRadius: 2,
                                    px: 2,
                                }}/>
                            <Button
                                variant="contained"
                                sx={{
                                    width:"30",
                                    borderRadius: 2,
                                    boxShadow: 0,
                                    bgcolor: "#FFD056",
                                }}
                            >
                                중복확인
                            </Button>
                        </Stack>
                        
                        <InputBase
                            required
                            placeholder="이름"
                            id="name"
                            name="name"
                            type="name"
                            error={ emailError !== "" || false }
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                px: 2,
                                mt: 1
                            }}/>
                        
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >
                            <InputBase
                            required
                            placeholder="학교"
                            id=""
                            name=""
                            type=""
                            error={emailError !== "" || false}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "43%",
                                height: 50,
                                borderRadius: 2,
                                px: 2,
                                mt: 1
                            }}/>
                            <InputBase
                            required
                            placeholder="전공"
                            id=""
                            name=""
                            type=""
                            error={emailError !== "" || false}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "55%",
                                height: 50,
                                borderRadius: 2,
                                px: 2,
                                mt: 1
                            }}/>
                        </Stack>

                        <InputBase
                            required
                            placeholder="이메일"
                            id="email"
                            name="email"
                            type="email"
                            error={emailError !== "" || false}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                px: 2,
                                mt: 1
                            }}/>
                        <FormHelperText>{emailError}</FormHelperText>

                        <InputBase
                            required
                            placeholder="비밀번호"
                            id="password"
                            name="password"
                            error={passwordState !== "" || false}
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                px: 2,
                                mt: 1
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} size="small">
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }/>
                        <FormHelperText>{passwordState}</FormHelperText>
                        <InputBase
                            required
                            placeholder="비밀번호 확인"
                            id="password"
                            name="password"
                            error={passwordState !== "" || false}
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                px: 2,
                                mt: 1
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} size="small">
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }/>
                        <FormHelperText>{passwordState}</FormHelperText>

                        <Button
                            type="submit"
                            variant="contained"
                            className="signup-btn"
                            sx={{
                                borderRadius: 8,
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                boxShadow: 0,
                                height: 50,
                                color: "#C4C4C4",
                                fontSize: 14,
                                my: 3,
                            }}>
                            회원가입
                        </Button>
                        <FormHelperText>{registerError}</FormHelperText>
                    </Box>
                </Box>
            </AuthBody>
        </>
    );
};

export default SignUpPro;