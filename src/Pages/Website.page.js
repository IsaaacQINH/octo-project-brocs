import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../Components/Website/Appbar/Appbar.component";
import {supabase} from "../Helper/supabaseClient";
import { useState } from "react";

const Website = () => {
    const [user, setUser] = useState(supabase.auth.user());

    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            setUser(supabase.auth.user());
        } else {
            setUser(null);
        }
    });

    return (
    <Box sx={{background: 'linear-gradient(130deg, rgba(0,0,0,1) 0%, rgba(20,20,30,1) 100%)', color: 'white', minHeight: 1000}}>
        { user ? <ResponsiveAppBar user={user}/> : <ResponsiveAppBar user={null} /> }
        <Outlet />
    </Box>
    );
};

export default Website;
