import { Box, IconButton, Modal } from "@mui/material";
import Column from "../Grid/Column";
import CommonText from "../Text/CommonText";
import AuthInput from "../AuthInput";
import AuthButton from "../Button/AuthButton";
import { useState } from "react";
import axios from "axios";
import AuthFormText from "../Text/AuthFormText";
import CloseIcon from '@mui/icons-material/Close';
import Row from "../Grid/Row";

const FindPw = ({ open, onClose }) => {
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onhandlePost = async (data) => {
        const { id, email } = data;
        const postData = { id, email };
        
        await axios
        .post('http://localhost:4000/', postData)
        .then((response) => {
            console.log(response, "Success!");
            setPassword(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const findData = {
            id: data.get("id"),
            email: data.get("email"),
        };
        const { id, email } = findData;

        if (id !== "") setId("");
        else setId("아이디를 입력해주세요.");

        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (email === "") setEmail("이메일을 입력해주세요.");
        else {
            if (!emailRegex.test(email)) setEmail("이메일이 올바르지 않습니다.");
            else setEmail("");
        }
        
        if (setId === ("") && setEmail === ("")) onhandlePost(findData);
    };

    return(
        <Modal open={open}>
            <Box
                component="form" 
                noValidate 
                onSubmit={handleSubmit} 
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
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>비밀번호 찾기</CommonText>
                </Column>
                {password ? (
                    <>
                        <CommonText>비밀번호는 {password} 입니다.</CommonText>
                    </>
                ) : (
                    <>
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
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default FindPw;