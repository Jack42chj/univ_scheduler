import { Box, Modal } from "@mui/material";
import Column from "../Grid/Column";
import Row from "../Grid/Row";
import ModalButton from "../Button/ModalButton";
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CommonText from "../Text/CommonText";
import AuthInput from "../AuthInput";
import AuthButton from "../Button/AuthButton";

const IconButtons = [
    {icon: <SchoolIcon sx={{ width: 120, height: 110 }} />, text: "학생", link: "/signup/student"},
    {icon: <ManageAccountsIcon sx={{ width: 120, height: 110 }} />, text: "교수", link: "/signup/professor"},
];

const FindPw = ({ open, onClose }) => {

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
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>비밀번호 찾기</CommonText>
                </Column>
                <CommonText sx={{ mb: 2 }}>University Scheduler에 가입된 아이디와 이메일을 입력하시면 비밀번호를 재설정합니다.</CommonText>
                <AuthInput 
                    required 
                    placeholder="아이디" 
                    name="id" 
                />
                <AuthInput 
                    required 
                    placeholder="이메일" 
                    name="email" 
                />
                <AuthButton sx={{ bgcolor: "#7D5A50" }}><CommonText variant="h6">비밀번호 재설정</CommonText></AuthButton>
            </Box>
        </Modal>    
    );
};

export default FindPw;