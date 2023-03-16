import { InputBase, Button, InputAdornment, IconButton, Box, FormHelperText, Typography, Stack, Modal } from "@mui/material";
import { LineAxisOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AuthBody from "../components/AuthBody";

const SignIn = () => {
    const [id, setId] = useState('');
    const [password, setPw] = useState('');
    const [login, setLogin] = useState('');
    const [isOpen, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onhandlePost = async (data) => {
        const { id, passrowd } = data;
        const postData = { id, password };

        await axios
        .post('http://localhost:4000/', postData)
        .then((response) => {
            console.log(response, "Success!");
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const joinData = {
            id: data.get("id"),
            password: data.get("password"),
        };
        const { id, password } = joinData;

        if (id !== "") setId("");
        else setId("ID를 확인해주세요");

        if (password !== "") setPw("");
        else setPw("비밀번호를 확인해주세요");

        if (password !=="" && id !== "") {
            onhandlePost(joinData);
        }
    };

    return (
        <>
            <AuthBody>
                <Box sx={{ mt: 10 }}>
                    <Typography variant='h4' sx={{
                        mb: 4,
                        mt: 6,
                        fontWeight: '700',
                    }}>
                        University Scheduler
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <InputBase
                            required
                            placeholder="아이디"
                            id="id"
                            name="id"
                            error={id !== "" || false}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                px: 2,
                            }}
                        />
                        <FormHelperText sx={{ color: 'red' }}>{id}</FormHelperText>
                        <InputBase
                            required
                            placeholder="비밀번호"
                            id="password"
                            name="password"
                            error={password !== "" || false}
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            sx={{
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                height: 50,
                                borderRadius: 2,
                                px: 2,
                                mt: 1,
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} size="small">
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText sx={{ color: 'red' }}>{password}</FormHelperText>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                borderRadius: 8,
                                bgcolor: "#F4F4F4",
                                width: "100%",
                                boxShadow: 0,
                                height: 50,
                                color: "#C4C4C4",
                                fontSize: 14,
                                mt: 2,
                            }}
                        >
                            로그인
                        </Button>
                        <FormHelperText>{login}</FormHelperText>
                    </Box>
                    <Stack 
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={2}
                        my={2}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 4,
                                bgcolor: "#F4F4F4",
                                width: "50%",
                                boxShadow: 0,
                                height: 45,
                                color: "#C4C4C4",
                                fontSize: 14,
                            }}
                        >
                            아이디 찾기
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 4,
                                bgcolor: "#F4F4F4",
                                width: "50%",
                                boxShadow: 0,
                                height: 45,
                                color: "#C4C4C4",
                                fontSize: 14,
                            }}
                        >
                            비밀번호 찾기
                        </Button>
                    </Stack>
                    <Typography sx={{ fontSize: 14, textAlign: 'center' }}>
                        아직 계정이 없으세요?&nbsp;&nbsp;
                        <Button onClick={setOpen} variant="text" sx={{ color: '#9728ff', "&.MuiButtonBase-root:hover": { bgcolor: "transparent" } }}>회원가입</Button>
                    </Typography>
                    <Modal open={isOpen} onClose={handleClose}>
                        <Box sx={{
                            position: "absolute",
                            top: '40%',
                            left: "50%",
                            width: '300px',
                            bgcolor: "white",
                            transform: 'translate(-50%, -50%)',
                            borderRadius: 4,
                            boxShadow: 5,
                            padding: 4,
                        }}>
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                mb={5}
                            >
                                <Typography variant="h4" fontWeight="700">회원가입</Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                                spacing={3}
                            >
                                <Button
                                    variant="contained"
                                    href='/signup/student'
                                    sx={{
                                        borderRadius: 4,
                                        bgcolor: "#F4F4F4",
                                        width: "50%",
                                        boxShadow: 5,
                                        color: "#C4C4C4",
                                    }}
                                >
                                    <Stack
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <SchoolIcon sx={{ width: 120, height: 110 }}/>
                                        <Typography variant="h5">학생</Typography>
                                    </Stack>
                                    
                                </Button>
                                <Button
                                    variant="contained"
                                    href='/signup/professor'
                                    sx={{
                                        borderRadius: 4,
                                        bgcolor: "#F4F4F4",
                                        width: "50%",
                                        boxShadow: 5,
                                        height: "100%",
                                        color: "#C4C4C4",
                                    }}
                                >
                                    <Stack
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <ManageAccountsIcon sx={{ width: 120, height: 110 }}/>
                                        <Typography variant="h5">교수</Typography>
                                    </Stack>
                                </Button>
                            </Stack>
                        </Box>
                    </Modal>
                </Box>
            </AuthBody>
        </>
    );
};

export default SignIn;