import { useState } from "react";
import { IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ModalBox from "../Box/ModalBox";
import Column from "../Stack/Column";
import Row from "../Stack/Row";
import CommonText from "../Input/CommonText";
import AuthInput from "../Input/AuthInput";
import AuthFormText from "../Input/AuthFormText";
import AuthButton from "../Button/AuthButton";
import { find_id } from "../../services/userServices";
import { checkEmail } from "../../utils/Regex";
import { checkTrim } from "../../utils/Trim";

const FindId = ({ open, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [showResult, setShowResult] = useState(false);
    
    const handleClose = () => {
        setShowResult(false);
    };

    const handleButtonClick = () => {
        handleClose();
        onClose();
        setName("");
        setEmail("");
    };

    const onhandlePost = async (data) => {
        const { name, email } = data;
        const postData = { name, email };
        try {
            const response = await find_id(postData);
            if (response.status === 200 || 201) {
                setId(response.data.id);
                alert("아이디 찾기 성공!");
                setShowResult(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const findData = {
            name: data.get("name"),
            email: data.get("email"),
        };
        const { name, email } = findData;
        if (checkTrim(name)) setName("");
        else setName("이름을 입력해주세요.");
        
        if (!checkTrim(email)) setEmail("이메일을 입력해주세요.");
        else {
            if (!checkEmail(email)) setEmail("이메일이 올바르지 않습니다.");
            else setEmail("");
        } 
        if (checkTrim(name) && checkTrim(email)) onhandlePost(findData);
    };

    return(
        <Modal open={open}>
            <ModalBox 
                component="form" 
                noValidate 
                onSubmit={handleSubmit}
            >
                <Row sx={{ justifyContent: "flex-end" }}>
                    <IconButton onClick={handleButtonClick} sx={{ color: "#FCDEC0" }}><CloseIcon fontSize="large"/></IconButton>
                </Row>
                <Column sx={{ mb: 2 }}>
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>아이디 찾기</CommonText>
                </Column>
                {showResult ? (
                    <>
                        <CommonText>회원님의 아이디는 {id} 입니다.</CommonText>
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
            </ModalBox>
        </Modal>    
    );
};

export default FindId;