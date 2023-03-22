import { Box, Modal } from "@mui/material";
import Column from "../Grid/Column";
import Row from "../Grid/Row";
import ModalButton from "../Button/ModalButton";
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CommonText from "../Text/CommonText";

const IconButtons = [
    {icon: <SchoolIcon sx={{ width: 120, height: 110 }} />, text: "학생", link: "/signup/student"},
    {icon: <ManageAccountsIcon sx={{ width: 120, height: 110 }} />, text: "교수", link: "/signup/professor"},
];

const AuthModal = ({ open, onClose }) => {

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
                <Column sx={{ mb: 5 }}>
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>회원가입</CommonText>
                </Column>
                <Row spacing={3}>
                    {Object.keys(IconButtons).map((item) => (
                        <>
                            <ModalButton href={IconButtons[item].link}>
                                <Column>
                                    {IconButtons[item].icon}
                                    <CommonText variant="h6">{IconButtons[item].text}</CommonText>
                                </Column>
                            </ModalButton>
                        </>
                    ))}
                </Row>
            </Box>
        </Modal>    
    );
};

export default AuthModal;