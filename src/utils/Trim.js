//빈칸 입력 확인 trim === "" false, trim !== "" true
export const checkTrim = (text) => {
    if(text.trim() === "") return false;
    return true;
};