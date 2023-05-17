import { InputAdornment, IconButton, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import AuthBody from "../../components/Stack/AuthStack";
import Row from "../../components/Stack/Row";
import Column from "../../components/Stack/Column";
import CommonText from "../../components/Input/CommonText";
import AuthFormText from "../../components/Input/AuthFormText";
import AuthButton from "../../components/Button/AuthButton";
import AuthSchoolMenu from "../../components/AuthSchoolMenu";
import AuthInput from "../../components/Input/AuthInput";
import StudentLoginLogo from "../../assets/StudentLoginLogo.jpg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BgcolorStack from "../../components/Stack/BackgroundStack";
import { useNavigate } from "react-router-dom";
import { student_checkid, student_signup } from "../../services/userServices";
import { checkTrim } from "../../utils/Trim";
import { checkEmail, checkID, checkPassword, checkPhone } from "../../utils/Regex";

const SignUpStu = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [checkId, setCheckId] = useState(false);
    const [password, setPassword] = useState("");
    const [checkPw, setCheckPw] = useState(""); 
    const [univ, setUniv] = useState("");
    const [major, setMajor] = useState("");
    const [email, setEmail] = useState("");
    const [signUp, setSignUp] = useState("");
    const [phNum, setPhNum] = useState("");

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
        try{
            const response = await student_checkid(id);
            if(response.status === 200){
                alert('사용 가능한 아이디입니다.');
                setCheckId(true);
            }
            else{
                alert('이미 사용중인 아이디입니다.');
                setCheckId(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const navigate = useNavigate();
    const onhandlePost = async (data) => {
        const { name, id, password, univ, major, email, phNum } = data;
        const postData = { name, id, password, univ, major, email, phNum };

        try{
            const response = await student_signup(postData);
            if(response.status === 200){
                console.log("Student Sign Up Success!");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            name: data.get("name"),
            id: data.get("id"),
            password: data.get("password"),
            checkPw: data.get("checkPw"),
            univ: data.get("univ"),
            major: data.get("major"),
            email: data.get("email"),
            phNum: data.get("phNum")
        };
        const { name, id, password, checkPw, univ, major, email, phNum } = joinData;

        if (checkTrim(name)) setName("");
        else setName("이름을 입력해주세요.");
        if (!checkTrim(id)) setId("아이디를 입력해주세요.");
        else {
            if (!checkID(id)) setId("숫자 또는 영어로 입력해주세요.");
            else setId("");
        }
        if (!checkTrim(password)) setPassword("비밀번호를 입력해주세요.")
        else {
            if (!checkPassword(password)) setPassword("숫자, 영문, 특수문자 조합 8자리 이상 입력해주세요.");
            else setPassword("");
        }
        if(!checkTrim(checkPw)) setCheckPw("비밀번호를 다시 한번 입력해주세요.")
        else{
            if(checkPw === password) setCheckPw("");
            else setCheckPw("비밀번호가 일치하지 않습니다.")
        }
        if(checkTrim(univ)) setUniv("");
        else setUniv("대학교를 선택해주세요.");
        if(checkTrim(major)) setMajor("");
        else setMajor("학과를 입력해주세요.");
        if(!checkTrim(email)) setEmail("이메일을 입력해주세요.");
        else{
            if (!checkEmail(email)) setEmail("이메일이 올바르지 않습니다.");
            else setEmail("");
        }
        if(!checkTrim(phNum)) setPhNum("휴대폰 번호를 입력해주세요.");
        else{
            if (!checkPhone(phNum)) setPhNum("번호가 올바르지 않습니다.");
            else setPhNum("");
        }
        if(checkId === false) window.alert("아이디 중복확인을 해주세요.");
        if (checkTrim(name) && checkTrim(id) && checkTrim(password) && checkTrim(univ) && checkTrim(major) && checkTrim(email) && checkTrim(phNum) && checkId === true) {
            onhandlePost(joinData);
        }
        else setSignUp("입력한 정보를 다시 확인해주세요.");
    };

    return (
        <BgcolorStack>
            <Row>
                <Column sx={{ display: { xs: "none", md: "flex" }, width: "35%", minHeight: "100vh", background: `url(${StudentLoginLogo})`, backgroundSize: 'cover' }}>
                    <CommonText variant="h4" sx={{ color: "#DDDDDD", px: 2 }}>University Scheduler로<br/><br/>즐거운 대학생활을<br/><br/>시작해보세요</CommonText>
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
                            name="checkPw" 
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
                        <AuthFormText>{checkPw}</AuthFormText>
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
                            name="phNum"
                        />
                        <AuthFormText>{phNum}</AuthFormText>
                        <AuthButton type="submit" sx={{ mt: 1 }}>
                            <CommonText variant="h6">회원가입</CommonText>
                        </AuthButton>
                        <AuthFormText>{signUp}</AuthFormText>
                    </Box>
                </AuthBody>
            </Row>
        </BgcolorStack>
    );
};

export default SignUpStu;