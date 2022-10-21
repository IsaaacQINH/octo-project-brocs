import { useParams } from "react-router-dom";

const OverlayComponent = () => {
  const { project, match } = useParams();

  return (
    <>
      project: {project ? project : "no project"}<br />
      match: {match ? match : "no match"}
    </>
  );
}

export default OverlayComponent;