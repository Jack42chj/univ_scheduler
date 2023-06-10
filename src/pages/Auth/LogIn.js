import { Box, Button } from "@mui/material";
import Row from "../../components/Stack/Row";
import { useState } from "react";
import Column from "../../components/Stack/Column";
import AuthInput from "../../components/Input/AuthInput";
import AuthBody from "../../components/Stack/AuthStack";
import AuthButton from "../../components/Button/AuthButton";
import MainLogo from "../../assets/MainLogo.jpg";
import AuthFormText from "../../components/Input/AuthFormText";
import AuthModal from "../../components/Modal/AuthModal";
import CommonText from "../../components/Input/CommonText";
import FindPw from "../../components/Modal/FindPw";
import FindId from "../../components/Modal/FindId";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import { signin } from "../../services/userServices";
import { useNavigate } from "react-router-dom";
import { checkTrim } from "../../utils/Trim";

const LogIn = () => {
    const [id, setId] = useState('');
    const [password, setPw] = useState('');
    const [signOpen, setSignOpen] = useState(false);
    const [pwOpen, setPwOpen] = useState(false);
    const [idOpen, setIdOpen] = useState(false);

    const signHandleToggle = () => {
        setSignOpen(prevState => !prevState);
    };
    const findPwHandleToggle = () => {
        setPwOpen(prevState => !prevState);
    };
    const findIdHandleToggle = () => {
        setIdOpen(prevState => !prevState);
    };

    const navigate = useNavigate();
    const onhandlePost = async (data) => {
        const { id, password } = data;
        const postData = { id, password };
        try{
            const response = await signin(postData);
            if(response.status === 200){
                console.log("Student Login Success!");
                navigate('/student/main');
            }
            else if(response.status === 201){
                console.log("Professor Login Success!");
                navigate('/professor/main');
            }
            else
                alert(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            id: data.get("id"),
            password: data.get("password"),
        };
        const { id, password } = joinData;

        if (checkTrim(id)) setId("");
        else setId("ID를 확인해주세요");

        if (checkTrim(password)) setPw("");
        else setPw("비밀번호를 확인해주세요");

        if (checkTrim(id) && checkTrim(password)) {
            onhandlePost(joinData);
        }
    };

    return(
        <BgcolorStack>
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
                        />
                        <AuthFormText>{id}</AuthFormText>
                        <AuthInput 
                            required 
                            placeholder="비밀번호" 
                            type="password"
                            name="password" 
                            sx={{ mt: 1 }}
                        />
                        <AuthFormText>{password}</AuthFormText>
                        <AuthButton type="submit" sx={{ mt: 2 }}>
                            <CommonText variant="h6">로그인</CommonText>
                        </AuthButton>
                    </Box>
                    <Row spacing={2} sx={{ my: 2 }}>
                        <AuthButton onClick={findIdHandleToggle}>
                            <CommonText variant="h6">아이디 찾기</CommonText>
                        </AuthButton>
                        <AuthButton onClick={findPwHandleToggle}>
                            <CommonText variant="h6">비밀번호 찾기</CommonText>
                        </AuthButton>
                    </Row>
                    <CommonText variant="h6" sx={{ textAlign: 'center' }}>
                        아직 계정이 없으세요?&nbsp;&nbsp;
                        <Button onClick={signHandleToggle} variant="text" sx={{ "&.MuiButtonBase-root:hover": { bgcolor: "transparent" }, p: 0 }}>
                            <CommonText variant="h6" sx={{ color: "#FFAE6D" }}>
                                회원가입
                            </CommonText>
                        </Button>
                    </CommonText>
                </AuthBody>
                <AuthModal open={signOpen} onClose={signHandleToggle} />
                <FindId open={idOpen} onClose={findIdHandleToggle} />
                <FindPw open={pwOpen} onClose={findPwHandleToggle} />
            </Row>
        </BgcolorStack>
    );
};

export default LogIn;