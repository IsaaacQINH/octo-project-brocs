import { Box, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Boostmeter from "../Components/Overlay/Boostmeter.component";
import POVinfo from "../Components/Overlay/POVinfo.component";
import Scoreboard from "../Components/Overlay/Scoreboard.component";
import { supabase } from "../Helper/supabaseClient";

const Overlay = () => {
  const { project, match } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [blueData, setBlueData] = useState(null);
  const [orangeData, setOrangeData] = useState(null);

  useEffect(async () => {
    try {
      const {data} = await supabase
        .from('match')
        .select('format, blue_wins, orange_wins, gamedate, blue_team:team!blue_name(id, name, metadata), orange_team:team!orange_name(id, name, metadata)')
        .eq('id', match).single();

      setMatchData({
        format: data?.format,
        blue_wins: data?.blue_wins,
        orange_wins: data?.orange_wins
      });
      setBlueData(data?.blue_team);
      setOrangeData(data?.orange_team);
    } catch (e) {
      console.error(e);
    }
  }, [project, match]);

  if (match) {
    return (
      <Box>
        <Scoreboard match={matchData} blue={blueData} orange={orangeData} isReplay={false}/>
        <Boostmeter />
        <POVinfo team={0} />
      </Box>
    );
  }

  return (
    <Box>
      project: {project ? project : "no project"}<br />
    </Box>
  );
};

export default Overlay;
