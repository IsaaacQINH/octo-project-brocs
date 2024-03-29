import {Button, CircularProgress, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../../Helper/supabaseClient";
import { useState } from "react";

const JoinProject = () => {
    const user = supabase.auth.user();
    const { project } = useParams();
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState(null);
    const [fetchedProject, setFProject] = useState(null);

    useEffect(async () => {
        const controller = new AbortController();
        if (!user) {
            return <Navigate to="/login" />;
        }

        if (!project) {
            return <Navigate to="/login" />;
        }

        try {
            setLoading(true);
    
            const {data} = await supabase
                .from('project')
                .select('id, name')
                .eq('id', project)
                .eq('deleted', false)
                .single();
    
            if (!data) {
                setLoading(false);
            }
    
            setFProject(data);
    
            const fetchedUserProjects = await supabase
                .from('user')
                .select('projects')
                .eq('id', user.id)
                .single();
    
            if (fetchedUserProjects.data.projects.includes(data.id)) {
                setEvent("CONTAIN");
                setLoading(false);
                return;
            }
    
            fetchedUserProjects.data.projects.push(data.id);
    
            await supabase
                .from('user')
                .update({projects: fetchedUserProjects.data.projects})
                .eq('id', user.id);

            const storage = await supabase
                .from('project')
                .select('storage_id')
                .eq('id', project).single();

            const people = await supabase
                .from('project_config_key')
                .select('value')
                .eq('storage_id', storage.data.storage_id)
                .eq('key', 'people');

            const existingPeople = JSON.parse(people.data[0].value);
            existingPeople.push(user.id);

            await supabase
                .from('project_config_key')
                .update({value: JSON.stringify(existingPeople), lastUpdateBy: localStorage.getItem("username") || "USR_ERR"})
                .eq('storage_id', storage.data.storage_id)
                .eq('key', 'people');
    
            setLoading(false);
            setEvent("JOIN");
        } catch (e) {
            console.error(e);
        }

        return () => controller.abort();
    }, [user]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box width="100%" sx={{textAlign: "center", mt: 7}}>
                    { loading ?
                        <CircularProgress /> :
                        <>
                            <Typography variant="h4">You {event === "JOIN" ? "Joined" : "are already member of"} {fetchedProject ? fetchedProject.name : ""}</Typography>
                            <Link to="/dashboard"><Button variant="outlined" size="large">→ to Dashboard</Button></Link>
                        </>
                    }
                </Box>
            </Grid>
        </Grid>
    );
};

export default JoinProject;
