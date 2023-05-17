import { IconButton, Modal } from "@mui/material";
import Column from "../Stack/Column";
import Row from "../Stack/Row";
import ModalButton from "../Button/ModalButton";
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CommonText from "../Input/CommonText";
import { Fragment } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ModalBox from "../Box/ModalBox";

const IconButtons = [
    {icon: <SchoolIcon sx={{ width: 120, height: 110 }} />, text: "학부생", link: "/signup/student"},
    {icon: <ManageAccountsIcon sx={{ width: 120, height: 110 }} />, text: "교수", link: "/signup/professor"},
];

const AuthModal = ({ open, onClose }) => {
    return(
        <Modal open={open}>
            <ModalBox>
                <Row sx={{ justifyContent: "flex-end" }}>
                    <IconButton onClick={onClose} sx={{ color: "#FCDEC0" }}><CloseIcon fontSize="large"/></IconButton>
                </Row>
                <Column sx={{ mb: 5 }}>
                    <CommonText variant="h4" sx={{ color: "#FFD56F" }}>회원가입</CommonText>
                </Column>
                <Row spacing={3}>
                    {Object.keys(IconButtons).map((item) => (
                        <Fragment key={item}>
                            <ModalButton  href={IconButtons[item].link}>
                                <Column>
                                    {IconButtons[item].icon}
                                    <CommonText variant="h6">{IconButtons[item].text}</CommonText>
                                </Column>
                            </ModalButton>
                        </Fragment>
                    ))}
                </Row>
            </ModalBox>
        </Modal>    
    );
};

export default AuthModal;