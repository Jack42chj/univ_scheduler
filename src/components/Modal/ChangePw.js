import { Box, IconButton, Modal, InputAdornment } from "@mui/material";
import Column from "../Stack/Column";
import CommonText from "../Input/CommonText";
import AuthInput from "../Input/AuthInput";
import AuthButton from "../Button/AuthButton";
import CloseIcon from '@mui/icons-material/Close';
import Row from "../Stack/Row";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import AuthFormText from "../Input/AuthFormText";
import { info_change_pw } from "../../services/userServices";

const ChangePw = ({ open, onClose }) => {
    const [password, setPassword] = useState("");
    const [checkpw, setCheckpw] = useState("");
    const [change, setChange] = useState("");

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

    const onhandlePost = async (data) => {
        const postData = { "password" : data };
        try {
            const response = await info_change_pw(postData);
            if (response.status === 200 || response.status === 201) {
                alert("비밀번호 변경 성공!");
                handleClear();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleClear = () => {
        onClose();
        setPassword("");
        setCheckpw("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            password: data.get("password"),
            checkpw: data.get("checkpw"),
        };
        const { password, checkpw } = joinData;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

        if (password.trim() === "") setPassword("비밀번호를 입력해주세요.")
        else {
            if (!passwordRegex.test(password)) setPassword("숫자, 영문, 특수문자 조합 8자리 이상 입력해주세요.");
            else setPassword("");
        }
        if(checkpw.trim() === "") setCheckpw("비밀번호를 다시 한번 입력해주세요.")
        else{
            if(checkpw === password) setCheckpw("");
            else setCheckpw("비밀번호가 일치하지 않습니다.")
        }
        if (password.trim() !== "" && checkpw.trim() !== "") {
            onhandlePost(password);
        }
        else setChange("비밀번호 재설정 실패.");
    };

    return(
        <Modal open={open}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate 
                sx={{
                position: "absolute",
                top: '40%',
                left: "50%",
                width: '300px',
                bgcolor: "#B4846C",
                transform: 'translate(-50%, -50%)',
                borderRadius: 4,
                boxShadow: 5,
                padding: 4,
            }}>
                <Row sx={{ justifyContent: "flex-end" }}>
                    <IconButton onClick={onClose} sx={{ color: "#FCDEC0" }}><CloseIcon fontSize="large"/></IconButton>
                </Row>
                <Column sx={{ mb: 2 }}>
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>비밀번호 변경</CommonText>
                </Column>
                <CommonText sx={{ mb: 2 }}>University Scheduler에 가입된 현재 계정의 <br/>비밀번호를 재설정 합니다.</CommonText>
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
                <AuthFormText sx={{ color: "#DFD3C3"}}>{checkpw}</AuthFormText>
                <AuthButton type="submit" sx={{ bgcolor: "#7D5A50" }}>
                    <CommonText variant="h6">비밀번호 재설정</CommonText>
                </AuthButton>
                <AuthFormText sx={{ color: "#DFD3C3"}}>{change}</AuthFormText>
            </Box>
        </Modal>
    );
};

export default ChangePw;