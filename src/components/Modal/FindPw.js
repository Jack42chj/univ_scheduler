import { Box, IconButton, InputAdornment, Modal } from "@mui/material";
import Column from "../Stack/Column";
import CommonText from "../Input/CommonText";
import AuthInput from "../Input/AuthInput";
import AuthButton from "../Button/AuthButton";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthFormText from "../Input/AuthFormText";
import CloseIcon from '@mui/icons-material/Close';
import Row from "../Stack/Row";
import { change_pw, find_pw } from "../../services/userServices";
import ModalBox from "../Box/ModalBox";
import { checkEmail, checkPassword } from "../../utils/Regex";
import { checkTrim } from "../../utils/Trim";

const FindPw = ({ open, onClose }) => {
    const [id, setId] = useState("");
    const [checkId, setCheckId] = useState("");
    const [email, setEmail] = useState("");
    const [check, setCheck] = useState("");
    const [author, setAuthor] = useState("");
    const [password, setPassword] = useState("");
    const [checkpw, setCheckpw] = useState("");
    const [changepw, setChangePw] = useState("");

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

    const handleClose = () => {
        setAuthor("");
        setCheckId("");
        setPassword("");
        setCheckpw("");
    };

    const handleButtonClick = () => {
        handleClose();
        onClose();
    };

    const onhandlePost = async (data) => {
        const { id, email } = data;
        const postData = { id, email };
        try {
            const response = await find_pw(postData);
            if (response.status === 200) {
                setAuthor(1);
            }
            else if (response.status === 201) {
                setAuthor(2);
            }
            setCheckId(id);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert('일치하는 정보가 없습니다.');
                handleButtonClick();
                window.location.reload();
            } else {
                console.log(err);
            }
        }
    };

    const onhandleNewPost = async (data1, data2, data3) => {
        const postData = { 
            "password": data1, 
            "author": data2,
            "id" : data3,
        };
        try {
            const response = await change_pw(postData);
            if (response.status === 200) {
                console.log("학생 비밀번호 변경 성공!");                
            }
            else if (response.status === 201) {
                console.log("교수 비밀번호 변경 성공!");
            }
            handleButtonClick();
            window.alert("비밀번호 재설정 성공!");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const findData = {
            id: data.get("id"),
            email: data.get("email"),
        };
        const { id, email } = findData;

        if (checkTrim(id)) setId("");
        else setId("아이디를 입력해주세요.");

        if (!checkTrim(email)) setEmail("이메일을 입력해주세요.");
        else {
            if (!checkEmail(email)) setEmail("이메일이 올바르지 않습니다.");
            else setEmail("");
        }
        
        if (checkTrim(id) && checkTrim(email) && checkEmail(email)) onhandlePost(findData);
        else setCheck("입력한 정보를 다시 확인해주세요.");
    };

    const handleNewSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            password: data.get("password"),
            checkPw: data.get("checkPw"),
        };
        const { password, checkPw } = joinData;

        if (!checkTrim(password)) setPassword("비밀번호를 입력해주세요.")
        else {
            if (checkPassword(password)) setPassword("숫자, 영문, 특수문자 조합 8자리 이상 입력해주세요.");
            else setPassword("");
        }
        if(!checkTrim(checkPw)) setCheckpw("비밀번호를 다시 한번 입력해주세요.")
        else{
            if(checkPw === password) setCheckpw("");
            else setCheckpw("비밀번호가 일치하지 않습니다.")
        }
        if (checkTrim(password) && checkTrim(checkPw) && (password === checkPw)) {
            onhandleNewPost(password, author, checkId);
        }
        else setChangePw("입력한 정보를 다시 확인해주세요.");
    }

    return(
        <Modal open={open}>
            <ModalBox>
                <Row sx={{ justifyContent: "flex-end" }}>
                    <IconButton onClick={handleButtonClick} sx={{ color: "#FCDEC0" }}><CloseIcon fontSize="large"/></IconButton>
                </Row>
                <Column sx={{ mb: 2 }}>
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>비밀번호 찾기</CommonText>
                </Column>
                {author ? (
                    <>
                        <Box
                            component="form" 
                            noValidate 
                            onSubmit={handleNewSubmit} 
                        >
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
                            <AuthFormText sx={{ color: "#DFD3C3"}}>{password}</AuthFormText>
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
                            <AuthFormText sx={{ color: "#DFD3C3"}}>{checkpw}</AuthFormText>
                            <AuthButton type="submit" sx={{ bgcolor: "#7D5A50" }}><CommonText variant="h6">비밀번호 재설정</CommonText></AuthButton>
                            <AuthFormText sx={{ color: "#DFD3C3"}}>{changepw}</AuthFormText>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box
                            component="form" 
                            noValidate 
                            onSubmit={handleSubmit} 
                        >
                            <CommonText sx={{ mb: 2 }}>University Scheduler에 가입된 아이디와 이메일을 입력하시면 비밀번호를 재설정합니다.</CommonText>
                            <AuthInput 
                                required 
                                placeholder="아이디" 
                                name="id" 
                            />
                            <AuthFormText sx={{ color: "#DFD3C3"}}>{id}</AuthFormText>
                            <AuthInput 
                                required 
                                placeholder="이메일" 
                                name="email" 
                            />
                            <AuthFormText sx={{ color: "#DFD3C3"}}>{email}</AuthFormText>
                            <AuthButton type="submit" sx={{ bgcolor: "#7D5A50" }}><CommonText variant="h6">비밀번호 재설정</CommonText></AuthButton>
                            <AuthFormText sx={{ color: "#DFD3C3"}}>{check}</AuthFormText>
                        </Box>
                    </>
                )}
            </ModalBox>
        </Modal>
    );
};

export default FindPw;