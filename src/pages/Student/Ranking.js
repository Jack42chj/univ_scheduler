import BgcolorBox from "../../components/Stack/BackgroundStack";
import OuterBox from "../../components/Box/OuterBox";
import HeaderStu from "../../components/Header/HeaderStu";
import Row from "../../components/Stack/Row";
import ContentText from "../../components/Input/ContentText";
import Column from "../../components/Stack/Column";
import CommonText from "../../components/Input/CommonText";
import { ranking } from "../../services/sdtServices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const column1 = [
    { text: "대학", content: "" }, { text: "전공", content: "" }, 
    { text: "학번", content: "" }, { text: "이름", content: "" } 
];

const column2 = [
    { text: "년도/학기", content: "" },
    { text: "평점",  content: "" }, { text: "",  content: "" } 
];

const Ranking = () => {
    const navigate = useNavigate();
    const [rankData, setRankData] = useState("");
    const getRankData = async () => {
        try{
            const response = await ranking();
            if(response.status === 200){
                setRankData(response.data);
            }
        } catch (err) {
            if (err.response && (err.response.status === 419 || err.response.status === 401)) {
                alert('로그인 시간 만료.');
                navigate("/");
            } else {
                console.log(err);
            }
        }
    }
    useEffect(() => {
        getRankData();
    }, []);

    const univ = rankData?.student_info?.school_name || null;
    const major = rankData?.student_info?.major || null;
    const id = rankData?.student_info?.student_id || null
    const name = rankData?.student_info?.student_name || null;
    const semester = rankData?.semester || null;
    const average = rankData?.average_score || null;
    const total = rankData?.total_student || null;
    const rank = rankData?.rank || null;
    const total_rank = rank + '/' + total;

    column1[0].content = univ;
    column1[1].content = major;
    column1[2].content = id;
    column1[3].content = name;
    column2[0].content = semester;
    column2[1].content = average;
    column2[2].content = total_rank;
    
    return(
        <>
            <HeaderStu />
            <BgcolorBox sx={{ minHeight: "100vh", alignItems: "center" }}>
                <OuterBox sx={{ my: 5, py: 5, '@media (max-width:1200px)' : { width: "80%" } }}>
                    <ContentText variant="h5">석차조회</ContentText>
                    <Row spacing={2} sx={{ mt: 5, px: 5, display : {xs: "none", md: "flex"} }}>
                        {Object.keys(column1).map((item) => (
                            <Column spacing={2}>
                                <ContentText variant="h6">{column1[item].text}</ContentText>
                                <CommonText variant="h6">{column1[item].content}</CommonText>
                            </Column>
                        ))}
                    </Row>
                    <Column spacing={2} sx={{ mt: 5, px: 5, display : {xs: "flex", md: "none"} }}>
                        {Object.keys(column1).map((item) => (
                            <Row spacing={2}>
                                <ContentText variant="h6">{column1[item].text}</ContentText>
                                <CommonText variant="h6">{column1[item].content}</CommonText>
                            </Row>
                        ))}
                    </Column>
                </OuterBox>
                <OuterBox sx={{ py: 5, '@media (max-width:1200px)' : { width: "80%" } }}>
                    <Row spacing={2} sx={{ px: 5, display : {xs: "none", md: "flex"} }}>
                        {Object.keys(column2).map((item) => (
                            <Column spacing={2}>
                                <ContentText variant="h6">{column2[item].text}</ContentText>
                                <CommonText variant="h6">{column2[item].content}</CommonText>
                            </Column>
                        ))}
                    </Row>
                    <Column spacing={2} sx={{ px: 5, display : {xs: "flex", md: "none"} }}>
                        {Object.keys(column2).map((item) => (
                            <Row spacing={2}>
                                <ContentText variant="h6">{column2[item].text}</ContentText>
                                <CommonText variant="h6">{column2[item].content}</CommonText>
                            </Row>
                        ))}
                    </Column>
                </OuterBox>
            </BgcolorBox>
        </>
    );
};

export default Ranking;