import React from "react";
// import {connect} from "react-redux";\
import Header from "../components/Header";
import Footer from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from '@mui/material/styles';
import { connect } from "react-redux";
import { AppShell, MediaQuery, Text, useMantineTheme } from "@mantine/core";


const Appframe = styled('Appframe')(({ theme }) => ({
    zIndex: 1,
    position: 'relative',
    display: 'flex',
    width: '100%',
}));

const Mainlayout = styled('main')(({ theme }) => ({
    backgroundColor: "transparent",
    //content
    margin: "0 auto",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // Added below line for Avrora
    maxWidth: "100%",
    height: "100vh"

    // Fix IE 11 issue.
}));


const PageWrapper = ({ component, ...props }) => {
    console.log("component", component)
    const theme = useMantineTheme();

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            navbar={
                <Header empId={props.user.empId} />
            }
            // aside={
            //   <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            //       <Text>Application sidebar</Text>
            //     </Aside>
            //   </MediaQuery>
            // }
            footer={
                <Footer />
            }
        // header={
        //   <Header height={{ base: 50, md: 70 }} p="md">
        //     <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        //       <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        //         <Burger
        //           opened={opened}
        //           onClick={() => setOpened((o) => !o)}
        //           size="sm"
        //           color={theme.colors.gray[6]}
        //           mr="xl"
        //         />
        //       </MediaQuery>

        //       <Text>Application header</Text>
        //     </div>
        //   </Header>
        // }
        >
            {component}
        </AppShell>
    )
}

function mapStateToProps(state) {
    return {
        user: state.loginState.user,
    };
}

export default connect(mapStateToProps)(PageWrapper);





