import { Box, Divider, IconButton, Modal } from "@mui/material";
import Column from "../Grid/Column";
import CommonText from "../Text/CommonText";
import CloseIcon from '@mui/icons-material/Close';
import Row from "../Grid/Row";
import OuterBox from "../Box/OuterBox";
import FieldText from "../FieldText";
import CommonButton from "../Button/CommonButton";
import AuthButton from "../Button/AuthButton";
import { useState } from "react";
import ChangePw from "./ChangePw";

const MyPage = ({ open, onClose }) => {
    const [changepw, setChangePw] = useState(false);
    const handleOpen = () => setChangePw(true);
    const handleClose = () => setChangePw(false);

    return(
        <Modal open={open}>
            <Box
                noValidate 
                sx={{
                position: "absolute",
                top: '50%',
                left: "50%",
                width: "40%",
                '@media (max-width:600px)': {
                    width: '80%',
                },
                bgcolor: "#B4846C",
                transform: 'translate(-50%, -50%)',
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                p: 4,
            }}>
                <Row sx={{ justifyContent: "flex-end" }}>
                    <IconButton onClick={onClose} sx={{ color: "#FCDEC0" }}><CloseIcon fontSize="large"/></IconButton>
                </Row>
                <Column>
                    <CommonText variant="h5" sx={{ color: "#FFCA29" }}>개인 정보 수정</CommonText>
                </Column>
                <Column sx={{ alignItems: "center", justifyContent: "center", mt: 4 }}>
                    <OuterBox sx={{ p: 4, backgroundColor: "#F5F5F5", borderRadius: 6 }}>
                        <Column spacing={2}>
                            <FieldText 
                                label="이름"
                                defaultValue="이기훈"
                                disabled
                            />
                            <FieldText 
                                label="아이디"
                                defaultValue="2018202032"
                                disabled
                            />
                            <FieldText 
                                label="학교"
                                defaultValue="광운대학교"
                                disabled
                            />
                            <FieldText 
                                label="학과"
                                defaultValue="컴퓨터정보공학부"
                                disabled
                            />
                            <FieldText 
                                label="이메일"
                                defaultValue="kihoon@kw.ac.kr"
                            />
                            <FieldText 
                                label="휴대폰"
                                defaultValue="010-1234-1234"
                            />
                            <AuthButton variant="contained" onClick={handleOpen}>
                                <CommonText variant="h6">비밀번호 변경</CommonText>
                            </AuthButton>
                            <Divider />
                            <Row sx={{ justifyContent: "flex-end" }} spacing={1}>
                                <CommonButton variant="contained">수정</CommonButton>
                                <CommonButton variant="contained" sx={{ bgcolor: "#3D3D3D", color: "#FFFFFF" }} onClick={onClose}>취소</CommonButton>
                            </Row>
                        </Column>
                    </OuterBox>
                </Column>
                <ChangePw open={changepw} onClose={handleClose} />
            </Box>
        </Modal>
    );
};

export default MyPage;