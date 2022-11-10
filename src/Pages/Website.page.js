import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import {supabase} from "../Helper/supabaseClient";

import ResponsiveAppBar from "../Components/Website/Appbar/Appbar.component";

const Website = () => {
    const user = supabase.auth.user();

    return (
    <Box sx={{background: '#3e3e3e', color: 'white', minHeight: 1000}}>
        <ResponsiveAppBar user={user}/>
        <Outlet />
    </Box>
    );
};

export default Website;
