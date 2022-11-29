import Box from "@mui/material/Box";
import { useOutletContext } from "react-router-dom";

const LayoutEditor = () => {
  const project = useOutletContext();

  return (
    <Box>
    {
      project ?
      <Box>
        
      </Box> :
      <Box sx={{width: '100%', textAlign: 'center', mt: 10}}>
        Select a project...
      </Box>
    }
  </Box>
  );
};

export default LayoutEditor;
