import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Home from '../components/Userİnfo';
import EmpSaatliqIcaze from '../components/PermissionPerHour';
import EmpMezuniyyet from '../components/MezuniyyetIcaze';
import EmpInventar from '../components/İnventar';
import EmpGirisCixis from '../components/GirisCixisIcaze';

const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: 'auto',
            overflow: 'auto',
            width:"100%"
          }}> */}
            {/* <Container maxWidth="lg" sx={{ mb: 5 }}>
                <Grid container rowSpacing={5} columnSpacing={5} direction="row" >
                    <Grid item xs={4}>
                        <Home />
                    </Grid>
                    <Grid item xs={4}>
                        <EmpSaatliqIcaze />
                    </Grid>
                    <Grid item xs={4}>
                        <EmpMezuniyyet />
                    </Grid>
                    <Grid item xs={6}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <EmpInventar />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <EmpGirisCixis />
                    </Grid>
                </Grid>
            </Container> */}
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3}}>
                <Grid xs={4}>
                <Home />
                </Grid>
                <Grid xs={4}>
                <EmpSaatliqIcaze />
                </Grid>
                <Grid xs={4}>
                <EmpMezuniyyet />
                </Grid>
                <Grid xs={6}>
                <EmpInventar />
                </Grid>
                <Grid xs={6}>
                <EmpGirisCixis />
                </Grid>
            </Grid>
            {/* </Box> */}
            {/* </Box> */}
        </ThemeProvider>
    );
}