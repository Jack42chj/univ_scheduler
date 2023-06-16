import { MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import OuterBox from "../../components/Box/OuterBox";
import HeaderStu from "../../components/Header/HeaderStu";
import Row from "../../components/Stack/Row";
import BgcolorStack from "../../components/Stack/BackgroundStack";
import ContentText from "../../components/Input/ContentText";
import { useNavigate } from "react-router-dom";
import { student_change_main, student_main } from "../../services/sdtServices";

const Main = () => {
    const navigate = useNavigate();
    //const [data, setData] = useState();

    // const handleChangeSemester = async (e) => {
    //     const sendData = { "semester": e.target.value }
    //     try{
    //         const resp = await student_change_main(sendData);
    //         if(resp.status === 200){
    //             setData(resp.data);
    //         }
    //     } catch (err) {
    //         if (err.response && (err.response.status === 419 || err.response.status === 401)) {
    //             alert('로그인 시간 만료.');
    //             navigate("/");
    //         } else {
    //             console.log(err);
    //         }
    //     }
    // };

    // const getData = async () => {
    //     try{
    //         console.log(1);
    //         const response = await student_main();
    //         if(response.status === 200){
    //             setData(response.data);
    //             console.log(response.data);
    //         }
    //     } catch (err) {
    //         if (err.response && (err.response.status === 419 || err.response.status === 401)) {
    //             alert('로그인 시간 만료.');
    //             navigate("/");
    //         } else {
    //             console.log(err);
    //         }
    //     }
    // };
    // useEffect(() => {
    //     getData();
    // },[]);


    const data = {
        "all_semester": [
            {
                "semester": "2023-1"
            }
        ],
        "semester": "2023-1",
        "schedule": [
            {
                "sub_code": "H020-1-0019-02",
                "sub_name": "C프로그래밍",
                "time": "화4/목3",
                "class": "새빛303",
                "professor_name": "이우신"
            },
            {
                "sub_code": "H020-1-0242-01",
                "sub_name": "아무거나",
                "time": "월4/수6",
                "class": "새빛302",
                "professor_name": "이우신"
            }
        ],
    }

    const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const subjectList = [];
    const scheduleList = data ? data.schedule : [];
    const semesterList = data ? data.all_semester : [];
    const currSemester = data ? data.semester : null;
    if(data && data.schedule){
        data.schedule.forEach((item) => {
            item.bgcolor = generateRandomColor();
        });
    }
    

    for(let i = 0; i < scheduleList.length; i++){
        let listData = {"name": scheduleList[i].sub_name, "sub_ID": scheduleList[i].sub_code};
        subjectList.push(listData);
    };

    const classPeriods = Array.from({ length: 8 }, (i, j) => j + 1);
    const weekdays = ["월", "화", "수", "목", "금"];

    const getCourseByTime = (day, time) => {
        const courses = data.schedule.filter((item) => {
            const timeSlots = item.time.split("/");
            return timeSlots.some((slot) => {
                const slotDay = slot.slice(0, 1);
                const slotTimes = slot.slice(1).split(",").map((t) => t.trim());
                return slotDay === day && slotTimes.includes(String(time));
            });
        });

        if (courses.length > 0) {
            const courseNames = courses.map((course) => `${course.sub_name} (${course.class}/${course.professor_name}) ${course.sub_code}`);
            return {
                courses: courseNames.join(", "),
                bgcolor: courses[0].bgcolor,
            };
        }

        return {
            courses: "",
            bgcolor: ""
        };
    };

    const handleClickSubject = (strData) => {
        const startIndex = strData.lastIndexOf(" ") + 1;
        const currSubjectID = strData.substring(startIndex);
        const course = data.schedule.find((item) => item.sub_code === currSubjectID);
        const url = `/student/lecture/${currSemester}/${currSubjectID}`;
        const sendData = {
            "currSemester": currSemester,
            "currSubjectID": currSubjectID,
            "currSubject": course.sub_name,
            "semesterList": semesterList,
            "subjectList": subjectList,
            "data": course,
        };
        navigate(url, { state: sendData });
    };

    return (
        <div>
            <HeaderStu />
            <BgcolorStack sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 1 }}>
                    <Row sx={{ justifyContent: "space-around" }}>
                        <ContentText variant="h6">학기</ContentText>
                        <Select
                            value={currSemester}
                            name="semester"
                            //onChange={handleChangeSemester}
                            displayEmpty
                            sx={{ width: "50%", height: "48px" }}
                        >
                            {semesterList.map((year) => (
                                <MenuItem key={year.semester} value={year.semester}>{year.semester}</MenuItem>
                            ))}
                        </Select>
                    </Row>
                </OuterBox>
                <OuterBox sx={{ py: 5, justifyContent: "center", alignItems: "center" }}>
                    <ContentText variant="h4">강의 시간표</ContentText>
                    { data && data.schedule && (
                        <TableContainer sx={{ width: "80%", mx: "auto", borderRadius: 6, border: "3px solid #D4D4D4", my: 5, "& td": { borderBottom: "3px solid #F0F0F0", borderRight: "3px solid #F0F0F0", height: 60 },
                        "& th": { borderBottom: "3px solid #F0F0F0", borderRight: "3px solid #F0F0F0", height: 60 }, "& td:last-child": { borderRight: "none" }, "& th:last-child": { borderRight: "none" } }}>
                            <Table>
                                <TableHead sx={{ borderBottom: 3 }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ width: 50 }}>시간</TableCell>
                                        {weekdays.map((day) => (
                                            <TableCell key={day} align="center" sx={{ height: 40 }}>{day}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {classPeriods.map((time, index) => {
                                        const { courses, bgcolor } = getCourseByTime("월", time);
                                        return (
                                            <TableRow key={index}>
                                                <TableCell align="center" sx={{ height: 50 }}>{time}</TableCell>
                                                <TableCell align="center" sx={{ width: 100, backgroundColor: bgcolor }}>{courses}</TableCell>
                                                {weekdays.slice(1).map((day) => {
                                                    const { courses, bgcolor } = getCourseByTime(day, time);
                                                    return (
                                                        <TableCell key={day} align="center" sx={{ width: 100, backgroundColor: bgcolor }} onClick={()=>{handleClickSubject(courses)}}>{courses}</TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </OuterBox>
            </BgcolorStack>
        </div>
    );
};

export default Main;