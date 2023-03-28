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

const FindId = ({ open, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    const onhandlePost = async (data) => {
        const { name, email } = data;
        const postData = { name, email };

        await axios
        .post('http://localhost:4000/', postData)
        .then((response) => {
            console.log(response, "Success!");
            setId(response.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const findData = {
            name: data.get("name"),
            email: data.get("email"),
        };
        const { name, email } = findData;

        if (name !== "") setName("");
        else setName("이름을 입력해주세요.");

        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (email === "") setEmail("이메일을 입력해주세요.");
        else {
            if (!emailRegex.test(email)) setEmail("이메일이 올바르지 않습니다.");
            else setEmail("");
        }
        
        if (setName === ("") && setEmail === ("")) onhandlePost(findData);
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
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>아이디 찾기</CommonText>
                </Column>
                {id ? (
                    <>
                        <CommonText>아이디는 {id} 입니다.</CommonText>
                    </>
                ) : (
                    <>
                        <CommonText sx={{ mb: 2 }}>University Scheduler에 가입한 이름과 이메일을 입력하시면 아이디를 조회합니다.</CommonText>
                        <AuthInput 
                            required 
                            placeholder="이름"
                            name="name"
                        />
                        <AuthFormText sx={{ color: "#DFD3C3"}}>{name}</AuthFormText>
                        <AuthInput 
                            required 
                            placeholder="이메일" 
                            name="email" 
                        />
                        <AuthFormText sx={{ color: "#DFD3C3"}}>{email}</AuthFormText>
                        <AuthButton sx={{ bgcolor: "#7D5A50" }} type="submit"><CommonText variant="h6">아이디 조회</CommonText></AuthButton>
                    </>
                )}
            </Box>
        </Modal>    
    );
};

export default FindId;