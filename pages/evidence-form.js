import { Box } from "@mui/material";
import RenderOnAuthenticated from "../components/RenderOnAuthenticated";
import Meta from "../components/seo/Meta";
import Unauthorized from "../components/Unauthorized";
import EvidenceForm from "../components/evidence-form";

const InitateDispute = () => {
  return (
    <>
      <Meta title="Evidence Form" />
      {/* <RenderOnAuthenticated> */}
      <Box>
        <EvidenceForm />
      </Box>
      {/* </RenderOnAuthenticated> */}
      {/* <Unauthorized /> */}
    </>
  );
};

export default InitateDispute;
