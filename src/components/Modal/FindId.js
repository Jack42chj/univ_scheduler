import { Box, Modal } from "@mui/material";
import Column from "../Grid/Column";
import CommonText from "../Text/CommonText";
import AuthInput from "../AuthInput";
import AuthButton from "../Button/AuthButton";

const FindId = ({ open, onClose }) => {

    return(
        <Modal open={open} onClose={onClose}>
            <Box sx={{
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
                <Column sx={{ mb: 2 }}>
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>아이디 찾기</CommonText>
                </Column>
                <CommonText sx={{ mb: 2 }}>University Scheduler에 가입한 이름과 이메일을 입력하시면 아이디를 조회합니다.</CommonText>
                <AuthInput 
                    required 
                    placeholder="이름" 
                    name="name" 
                />
                <AuthInput 
                    required 
                    placeholder="이메일" 
                    name="email" 
                />
                <AuthButton sx={{ bgcolor: "#7D5A50" }}><CommonText variant="h6">아이디 조회</CommonText></AuthButton>
            </Box>
        </Modal>    
    );
};

export default FindId;