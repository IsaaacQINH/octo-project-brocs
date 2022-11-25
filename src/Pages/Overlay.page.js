import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../Helper/supabaseClient";

const Overlay = () => {
  const { project, match } = useParams();
  const [matchData, setMatchData] = useState(null);

  useEffect(async () => {
    try {
      const {data} = await supabase
        .from('match')
        .select('format, blue_wins, orange_wins, gamedate, blue_team:team!blue_name(id, name), orange_team:team!orange_name(id, name)')
        .eq('id', match).single();

      setMatchData(data);
    } catch (e) {
      console.error(e);
    }
  }, [project, match]);

  return (
    <>
      project: {project ? project : "no project"}<br />
      match: {match ? match : "no match"}<br />
      format: {matchData ? matchData.format : "---"}<br />
      blue: {matchData ? matchData.blue_team?.name : "null"} Wins: {matchData ? matchData.blue_wins : 0}<br />
      orange: {matchData ? matchData.orange_team?.name : "null"} Wins: {matchData ? matchData.orange_wins : 0}<br />
    </>
  );
};

export default Overlay;
