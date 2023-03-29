import { InputAdornment, IconButton, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import AuthBody from "../../components/AuthBody";
import Row from "../../components/Grid/Row";
import Column from "../../components/Grid/Column";
import CommonText from "../../components/Text/CommonText";
import AuthFormText from "../../components/Text/AuthFormText";
import AuthButton from "../../components/Button/AuthButton";
import AuthSchoolMenu from "../../components/AuthSchoolMenu";
import AuthInput from "../../components/AuthInput";
import StudentLoginLogo from "../../assets/StudentLoginLogo.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import BgcolorStack from "../../components/Box/BgcolorStack";

const SignUpStu = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [checkid, setCheckId] = useState(true);
    const [password, setPassword] = useState("");
    const [checkpw, setCheckpw] = useState(""); 
    const [univ, setUniv] = useState("");
    const [major, setMajor] = useState("");
    const [email, setEmail] = useState("");
    const [signup, setSignup] = useState("");
    const [phnum, setPhnum] = useState("");

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
    const [checkValues, setCheckValues] = useState({
        checkPassword: "",
        showCheckPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowCheckPassword = () => {
        setCheckValues({
            ...checkValues,
            showCheckPassword: !checkValues.showCheckPassword,
        });
    };

    const pwhandleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const checkpwhandleChange = (prop) => (event) => {
        setCheckValues({ ...checkValues, [prop]: event.target.value });
    };

    const handleClickCheckId = () => {
        const id = document.getElementsByName("id")[0].value;
        handleCheckId(id);
    };

    const handleCheckId = async (id) => {
        await axios
        .post('http://localhost:3001/checkid', { id: id, })
        .then((response) => {
            if(response === false){
                alert('사용 가능한 아이디입니다.');
                setCheckId(response);
            }
            else{
                alert('이미 사용중인 아이디입니다.');
                setCheckId(response);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const onhandlePost = async (data) => {
        const { name, id, password, univ, major, email, phnum } = data;
        const postData = { name, id, password, univ, major, email, phnum };

        console.log(postData);
        await axios
        .post('http://localhost:3001/signup/student', postData)
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
            name: data.get("name"),
            id: data.get("id"),
            password: data.get("password"),
            checkpw: data.get("checkpw"),
            univ: data.get("univ"),
            major: data.get("major"),
            email: data.get("email"),
            phnum: data.get("phnum"),
        };
        const { name, id, password, checkpw, univ, major, email, phnum } = joinData;

        const idRegex =  /^[a-z-0-9]*$/;
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

        if (name === "") setName("이름을 입력해주세요.");
        else setName("");
        if (id === "") setId("아이디를 입력해주세요.");
        else {
            if (!idRegex.test(id)) setId("숫자 또는 영어로 입력해주세요.");
            else setId("");
        }
        if (password === "") setPassword("비밀번호를 입력해주세요.")
        else {
            if (!passwordRegex.test(password)) setPassword("숫자, 영문, 특수문자 조합 8자리 이상 입력해주세요.");
            else setPassword("");
        }
        if(checkpw === "") setCheckpw("비밀번호를 다시 한번 입력해주세요.")
        else{
            if(checkpw === password) setCheckpw("");
            else setCheckpw("비밀번호가 일치하지 않습니다.")
        }
        if(univ === "") setUniv("대학교를 선택해주세요.");
        else setUniv("");
        if(major === "") setMajor("학과를 입력해주세요.");
        else setMajor("");
        if(email === "") setEmail("이메일을 입력해주세요.");
        else{
            if (!emailRegex.test(email)) setEmail("이메일이 올바르지 않습니다.");
            else setEmail("");
        }
        if(phnum === "") setPhnum("휴대폰 번호를 입력해주세요.");
        else{
            if (!phoneRegex.test(phnum)) setPhnum("번호가 올바르지 않습니다.");
            else setPhnum("");
        }
        if(checkid === true) window.alert("아이디 중복확인을 해주세요.");
        if (name !=="" && id !== "" && password !=="" && checkpw !== "" && univ !=="" && major !== "" && email !== "" && phnum !== "" && checkid === false) {
            onhandlePost(joinData);
        }
        else setSignup("입력한 정보를 다시 확인해주세요.");
    };

    return (
        <BgcolorStack>
            <Row>
                <Column sx={{ display: { xs: "none", md: "flex" }, width: "35%", minHeight: "100vh", background: `url(${StudentLoginLogo})`, backgroundSize: 'cover' }}>
                    <CommonText variant="h4" sx={{ color: "#DDDDDD", px: 2 }}>Veritas<br/><br/>Lux<br/><br/>Mea</CommonText>
                </Column>
                <AuthBody>
                    <IconButton href="/" sx={{ justifyContent: 'flex-start', width: "50px" }}><ArrowBackIcon fontSize="large" sx={{ color: "#FCDEC0" }} /></IconButton>
                    <CommonText variant="h5" sx={{ my: 3 }}>학생으로 시작할까요?</CommonText>
                    <Box component="form" noValidate onSubmit={handleSubmit}>  
                        <AuthInput 
                            required 
                            placeholder="이름"
                            name="name"
                        />  
                        <AuthFormText>{name}</AuthFormText>
                        <Row>
                            <AuthInput 
                                required 
                                placeholder="아이디(숫자, 영어, 숫자 + 영어)" 
                                name="id"
                                sx={{ width: "69%" }}
                            />
                            <AuthButton onClick={handleClickCheckId} sx={{ width: "28%" }}>
                                중복확인
                            </AuthButton>
                        </Row>
                        <AuthFormText>{id}</AuthFormText>
                        <AuthInput 
                            required 
                            placeholder="비밀번호(영문, 숫자, 특수문자 조합 8자리 이상)" 
                            name="password" 
                            type={values.showPassword ? "text" : "password"}
                            value={values.password || ""}
                            onChange={pwhandleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} size="small">
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <AuthFormText>{password}</AuthFormText>
                        <AuthInput 
                            required 
                            placeholder="비빌번호 확인" 
                            name="checkpw" 
                            type={checkValues.showCheckPassword ? "text" : "password"}
                            value={checkValues.password || ""}
                            onChange={checkpwhandleChange("password")}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowCheckPassword} size="small">
                                        {checkValues.showCheckPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <AuthFormText>{checkpw}</AuthFormText>
                        <Row>
                            <AuthSchoolMenu />
                            <AuthInput 
                                required 
                                placeholder="전공"
                                name="major"
                                sx={{ width: "50%" }}
                            />
                        </Row>
                        <AuthFormText>{univ}{major}</AuthFormText>
                        <AuthInput 
                            required 
                            placeholder="이메일"
                            name="email"
                        />
                        <AuthFormText>{email}</AuthFormText>
                        <AuthInput 
                            required 
                            placeholder="휴대폰 번호"
                            name="phnum"
                        />
                        <AuthFormText>{phnum}</AuthFormText>
                        <AuthButton type="submit" sx={{ mt: 1 }}>
                            <CommonText variant="h6">회원가입</CommonText>
                        </AuthButton>
                        <AuthFormText>{signup}</AuthFormText>
                    </Box>
                </AuthBody>
            </Row>
        </BgcolorStack>
    );
};

export default SignUpStu;