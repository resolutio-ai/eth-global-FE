import { Box, Button, Container, Grid, InputAdornment, Paper, TextField, Typography, styled } from "@mui/material";
import Image from "next/image";
import React from "react";
import { EVIDENCE_FORM } from "../constants/strings";
import placeholderArt from "../public/default_art.jpg";
import { UploadFile } from "@mui/icons-material";

export const EVIDENCE_FORM_ROUTE = "/evidence-form";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const EvidenceForm = () => {

  async function formHandle(e) {
    e.preventDefault();
    const payload = {
      creator: e.target.creator.value,
      work: e.target.work.value,
      medium: e.target.medium.value,
      file: e.target.file.value,
      dateOfCreation: e.target.dateOfCreation.value,
      license: e.target.contact.value
    };
    console.log('FormHandle', payload);
    // submitData(payload);
  }
  return (
    <Box
      sx={{ mx: "auto", mb: "2rem", textAlign: "center" }}
    >
      <Grid container spacing={0}>
        <Grid item xs={6} >
          <Container sx={{ textAlign: "left" }}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <h1>{EVIDENCE_FORM}</h1>
              </Grid>
            </Grid>
            <form onSubmit={formHandle}>
              <Grid container spacing={0}>
                <Grid item xs={10} sx={{ marginBottom: '1.2rem' }}>
                  <Typography variant="span" component="span" sx={{ fontWeight: 500, fontFamily: "Noto Sans", fontSize: '1rem' }}>
                    Name of Creator
                  </Typography>
                  <br />
                  <TextField id="creator" variant="outlined" fullWidth color="primary" focused />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: '1.2rem' }}>
                  <Typography variant="span" component="span" sx={{ fontWeight: 500, fontFamily: "Noto Sans", fontSize: '1rem' }}>
                    Name of Work
                  </Typography>
                  <br />
                  <TextField id="work" variant="outlined" fullWidth color="primary" focused />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: '1.2rem' }}>
                  <Typography variant="span" component="span" sx={{ fontWeight: 500, fontFamily: "Noto Sans", fontSize: '1rem' }}>
                    Medium
                  </Typography>
                  <br />
                  <TextField id="medium" variant="outlined" fullWidth color="primary" focused />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: '1.2rem' }}>
                  <Typography variant="span" component="span" sx={{ fontWeight: 500, fontFamily: "Noto Sans", fontSize: '1rem' }}>
                    File
                  </Typography>
                  <br />
                  <TextField id="file" variant="outlined" fullWidth color="primary" focused
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <UploadFile />
                        </InputAdornment>
                      ),
                    }}>
                    <VisuallyHiddenInput type="file" />
                  </TextField>
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: '1.2rem' }}>
                  <Typography variant="span" component="span" sx={{ fontWeight: 500, fontFamily: "Noto Sans", fontSize: '1rem' }}>
                    Date of Creation
                  </Typography>
                  <br />
                  <TextField id="dateOfCreation" variant="outlined" fullWidth color="primary" focused />
                </Grid>
                <Grid item xs={10} sx={{ marginBottom: '1.2rem' }}>
                  <Typography variant="span" component="span" sx={{ fontWeight: 500, fontFamily: "Noto Sans", fontSize: '1rem' }}>
                    Contact File
                  </Typography>
                  <br />
                  <TextField id="contact" variant="outlined" fullWidth color="primary" focused />
                </Grid>

                <Grid item xs={10} sx={{ marginBottom: '1.2rem' }}>
                  <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container>
            <Image src={placeholderArt} alt="Placeholder" />

          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EvidenceForm;
