import { ArrowBack, Save } from "@mui/icons-material";
import { Button, Divider, Grid, IconButton, Skeleton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../Helper/supabaseClient";

const CamLinks = ({sid, name}) => {
    const [action, setAction] = useState("idle");
    const [loading, setLoading] = useState(false);
    const [camlink, setCamLink] = useState({url: "", player: ""});

    useEffect(async () => {
        if (!sid) {
            return;
        }

        setLoading(true);

        try {
            const {data} = await supabase
                .from('project_config_key')
                .select('value')
                .eq('storage_id', sid)
                .eq('key', name);

            setCamLink(JSON.parse(data[0]?.value));
        } catch (e) {
            setCamLink({url: "", player: ""})
        }
        
        setLoading(false);
    }, [sid]);

    const handleChange = (e) => {
        e.preventDefault();
        let value = e.target.value;

        if (e.target.name === "player") {
            value = value.toUpperCase();
        }

        setCamLink({...camlink, [e.target.name]: value});
    }

    const handleSave = async () => {
        setAction("saving");
        try {
            const key = await supabase
                .from('project_config_key')
                .select('key')
                .eq('storage_id', sid)
                .eq('key', name).single();

            if (key.data) {
                await supabase
                    .from('project_config_key')
                    .update({value: JSON.stringify(camlink)})
                    .eq('storage_id', sid)
                    .eq('key', name);
                setAction("idle");
                return;
            }

            await supabase
              .from('project_config_key')
              .insert({
                storage_id: sid,
                key: name,
                value: JSON.stringify(camlink),
                type: 'json',
                required: true,
                lastUpdateBy: localStorage.getItem("username") || "USR_ERR"
            });
        } catch (e) {
            console.error("Saving failed");
        } 
        setAction("idle");
    }

    const handleReset = async () => {
        setAction("reset");
        try {
            setCamLink({url: "", player: ""});

            const key = await supabase
            .from('project_config_key')
            .select('key')
            .eq('storage_id', sid)
            .eq('key', name).single();

        if (key.data) {
            await supabase
                .from('project_config_key')
                .update({value: JSON.stringify({url: "", player: ""})})
                .eq('storage_id', sid)
                .eq('key', name);
                setAction("idle");
            return;
        }
        
        } catch (e) {
            setCamLink({url: "", player: ""});
        }

        setAction("idle");
    }

    return (
        !loading ?
        <Grid container spacing={1} sx={{px: { xs: 2, lg: 5}, mt: 2}}>
            <Grid item xs={12} md={4}>
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="URL"
                name="url"
                value={camlink.url}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={12} md={4}>
            <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Player"
                name="player"
                value={camlink.player}
                onChange={handleChange} />
            </Grid>
            <Grid item xs={6} md={2}>
                <Button sx={{py: 0.85}} fullWidth variant="outlined" color="warning" startIcon={<ArrowBack />} onClick={handleReset} disabled={action === "reset" ? true : false}>{action === "reset" ? "Wait..." : "Reset"}</Button>
            </Grid>
            <Grid item xs={6} md={2}>
                <Button sx={{py: 0.85}} fullWidth variant="outlined" color="success" startIcon={<Save />} onClick={handleSave} disabled={action === "saving" ? true : false}>{action === "saving" ? "Saving" : "Save"}</Button>
            </Grid>
        </Grid> :
        <Skeleton sx={{px: { xs: 2, lg: 5}}} height={50} />
    );
}

export default CamLinks;