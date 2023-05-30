import { Box, Divider, IconButton, Modal } from "@mui/material";
import Column from "../Stack/Column";
import CommonText from "../Input/CommonText";
import CloseIcon from '@mui/icons-material/Close';
import Row from "../Stack/Row";
import OuterBox from "../Box/OuterBox";
import FieldText from "../Input/FieldText";
import CommonButton from "../Button/CommonButton";
import AuthButton from "../Button/AuthButton";
import { useState } from "react";
import ChangePw from "./ChangePw";

const MyPage = ({ open, onClose }) => {
    const [changepw, setChangePw] = useState(false);
    const handleOpen = () => setChangePw(true);
    const handleClose = () => setChangePw(false);

    const exData = {
        "student": [
            {   "name" : "이기훈",
                "id": 2018202032,
                "univ": "광운대학교",
                "major": "컴퓨터정보공학부",
                "email": "kihoon@kw.ac.kr",
                "phnum": "01012345678",
            },
        ],
    };

    // const [data, setData] = useState();
    // useEffect(() => {
    //     try {
    //         const response = professor_main();
    //         setData(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, []);

    const name = exData.student[0].name;
    const id = exData.student[0].id;
    const univ = exData.student[0].univ;
    const major = exData.student[0].major;
    const email = exData.student[0].email;
    const phnum = exData.student[0].phnum;

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const findData = {
            email: data.get("email"),
            phNum: data.get("phnum"),
        };
        const { email, phNum } = findData;
        
        if (!checkTrim(email)) setEmail("이메일을 입력해주세요.");
        else {
            if (!checkEmail(email)) setEmail("이메일이 올바르지 않습니다.");
            else setEmail("");
        }
        if (checkTrim(name) && checkTrim(email)) onhandlePost(findData);
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
                                name="email"
                            />
                            <FieldText 
                                label="휴대폰"
                                defaultValue={phnum}
                                name="phnum"
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