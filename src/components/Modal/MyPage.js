import { Box, Divider, IconButton, Modal } from "@mui/material";
import Column from "../Stack/Column";
import CommonText from "../Input/CommonText";
import CloseIcon from '@mui/icons-material/Close';
import Row from "../Stack/Row";
import OuterBox from "../Box/OuterBox";
import FieldText from "../Input/FieldText";
import CommonButton from "../Button/CommonButton";
import AuthButton from "../Button/AuthButton";
import { useEffect, useState } from "react";
import ChangePw from "./ChangePw";
import { checkTrim } from "../../utils/Trim";
import { checkEmail, checkPhone } from "../../utils/Regex";
import AuthFormText from "../Input/AuthFormText";
import { change_info, information_check } from "../../services/userServices";

const MyPage = ({ open, onClose }) => {
    const [changepw, setChangePw] = useState(false);
    const handleOpen = () => setChangePw(true);
    const handleClose = () => setChangePw(false);
    const [data, setData] = useState();
    const [change, setChange] = useState(true);

    const getData = async () => {
        const response = await information_check();
        setData(response.data);
        setChange(false);
    }
    useEffect(() => {
        getData();
    }, [change]);

    const name = data ? data.name : null;
    const id = data? data.id : null;
    const univ = data ? data.school : null;
    const major = data ? data.major : null;
    const email = data ? data.email: null;
    const phnum = data ? data.phone_number: null;

    const [newEmail, setNewEmail] = useState('');
    const [newPhNum, setNewPhNum] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const changeData = {
            email: data.get("newEmail"),
            phone_number: data.get("newPhNum"),
        };
        const { email, phone_number } = changeData;
        
        if (!checkTrim(email)) setNewEmail("이메일을 입력해주세요.");
        else {
            if (!checkEmail(email)) setNewEmail("이메일이 올바르지 않습니다.");
            else setNewEmail("");
        }
        if(!checkTrim(phone_number)) setNewPhNum("휴대폰 번호를 입력해주세요.");
        else{
            if (!checkPhone(phone_number)) setNewPhNum("번호가 올바르지 않습니다.");
            else setNewPhNum("");
        }
        if (checkTrim(email) && checkTrim(phone_number)) onhandlePost(changeData);
    };

    const onhandlePost = async (data) => {
        try {
            const res = await change_info(data);
            if(res.status === 200 || res.status === 201){
                window.alert("개인정보 수정 성공!");
                setChange(true);
                onClose();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <Modal open={open}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate 
                sx={{
                position: "absolute",
                top: '50%',
                left: "50%",
                width: "40%",
                '@media (max-width:600px)': {
                    width: '80%',
                    top: "50%",
                    p: 2,
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
                <Column sx={{ alignItems: "center", justifyContent: "center", mt: 4, '@media (max-width:600px)': { mt: 1 }, }}>
                    <OuterBox sx={{ p: 4, backgroundColor: "#F5F5F5", borderRadius: 6, '@media (max-width:600px)': { py: 1 } }}>
                        <Column spacing={2}>
                            <FieldText 
                                label="이름"
                                defaultValue={name}
                                disabled
                            />
                            <FieldText 
                                label="아이디"
                                defaultValue={id}
                                disabled
                            />
                            <FieldText 
                                label="학교"
                                defaultValue={univ}
                                disabled
                            />
                            <FieldText 
                                label="학과"
                                defaultValue={major}
                                disabled
                            />
                            <FieldText 
                                label="이메일"
                                defaultValue={email}
                                name="newEmail"
                            />
                            <AuthFormText>{newEmail}</AuthFormText>
                            <FieldText 
                                label="휴대폰"
                                defaultValue={phnum}
                                name="newPhNum"
                            />
                            <AuthFormText>{newPhNum}</AuthFormText>
                            <AuthButton variant="contained" onClick={handleOpen}>
                                <CommonText variant="h6">비밀번호 변경</CommonText>
                            </AuthButton>
                            <Divider />
                            <Row sx={{ justifyContent: "flex-end" }} spacing={1}>
                                <CommonButton variant="contained" type="submit">수정</CommonButton>
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