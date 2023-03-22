import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const SchoolName = [
    {name: "건국대학교"}, {name: "경희대학교"}, {name: "고려대학교"},
    {name: "광운대학교"}, {name: "서강대학교"}, {name: "서울대학교"},
    {name: "중앙대학교"}, {name: "연세대학교"}, {name: "한양대학교"},
];

const AuthSchoolMenu = () => {
    const [name, setName] = useState('');
    const handleChange = (e) => setName(e.target.value);
        
    return(
        <FormControl sx={{ width: "47%", bgcolor: "#DDDDDD", borderRadius: 2, height: 50 }}>
            <Select
                value={name}
                name="univ"
                onChange={handleChange}
                displayEmpty
                sx={{ color: "#858585" }}
            >
                <MenuItem value="">대학교</MenuItem>
                {Object.keys(SchoolName).map((school) => (
                    <MenuItem key={SchoolName[school].name} value={SchoolName[school].name}>{SchoolName[school].name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AuthSchoolMenu;