import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../Components/Website/Appbar/Appbar.component";
import {supabase} from "../Helper/supabaseClient";
import { useState } from "react";
import { useEffect } from "react";

const Website = () => {
    const [user, setUser] = useState(supabase.auth.user());

    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
            const userFromSession = supabase.auth.user();

            try {
                if (!userFromSession.id) {
                    return;
                }

                const { data, error } = await supabase
                    .from('user')
                    .select('*')
                    .eq('id', userFromSession.id)
                    .single();

                if (data && !error) {
                    setUser(userFromSession);
                    return;
                }

                await supabase
                    .from('user')
                    .insert({
                        id: userFromSession.id,
                        name: userFromSession.user_metadata.full_name,
                        full_name: userFromSession.user_metadata.full_name,
                        projects: [],
                        roles: ["APP_ROLE_USER"]
                    });

                setUser(userFromSession);
            } catch (e) {
                console.error(e);
            }
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
