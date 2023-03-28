import { Box, IconButton, Modal } from "@mui/material";
import Column from "../Grid/Column";
import Row from "../Grid/Row";
import ModalButton from "../Button/ModalButton";
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CommonText from "../Text/CommonText";
import { Fragment } from "react";
import CloseIcon from '@mui/icons-material/Close';

const IconButtons = [
    {icon: <SchoolIcon sx={{ width: 120, height: 110 }} />, text: "학부/대학원", link: "/signup/student"},
    {icon: <ManageAccountsIcon sx={{ width: 120, height: 110 }} />, text: "교수/직원", link: "/signup/professor"},
];

const AuthModal = ({ open, onClose }) => {

    return(
        <Modal open={open}>
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
                <Row sx={{ justifyContent: "flex-end" }}>
                    <IconButton onClick={onClose} sx={{ color: "#FCDEC0" }}><CloseIcon fontSize="large"/></IconButton>
                </Row>
                <Column sx={{ mb: 5 }}>
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>회원가입</CommonText>
                </Column>
                <Row spacing={3}>
                    {Object.keys(IconButtons).map((item) => (
                        <Fragment key={item}>
                            <ModalButton href={IconButtons[item].link}>
                                <Column>
                                    {IconButtons[item].icon}
                                    <CommonText variant="h6">{IconButtons[item].text}</CommonText>
                                </Column>
                            </ModalButton>
                        </Fragment>
                    ))}
                </Row>
            </Box>
        </Modal>    
    );
};

export default AuthModal;