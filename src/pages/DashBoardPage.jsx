import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Home from '../components/Userİnfo';
import EmpSaatliqIcaze from '../components/PermissionPerHour';
import EmpMezuniyyet from '../components/MezuniyyetIcaze';
import EmpInventar from '../components/İnventar';
import EmpGirisCixis from '../components/GirisCixisIcaze';

const drawerWidth = 240;


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard(props) {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center" ,marginTop: "200px"}}>
                <Container>
                    <Grid container rowSpacing={{ xs: 4, sm: 5, md: 6, lg: 4 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems={"center"}>
                        <Grid xs={12}
                            sm={6}
                            md={4}
                            lg={4}>
                            <Home />
                        </Grid>
                        <Grid xs={12}
                            sm={6}
                            md={4}
                            lg={4}>
                            <EmpSaatliqIcaze empId={props.empId} />
                        </Grid>
                        <Grid xs={12}
                            sm={12}
                            md={4}
                            lg={4}>
                            <EmpMezuniyyet empId={props.empId} />
                        </Grid>
                        <Grid xs={12}
                            sm={12}
                            md={6}
                            lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <EmpInventar empId={props.empId} />
                            </Paper>
                        </Grid>
                        <Grid xs={12}
                            sm={12}
                            md={6}
                            lg={6}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <EmpGirisCixis empId={props.empId} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}