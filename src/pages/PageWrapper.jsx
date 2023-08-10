import React from "react";
// import {connect} from "react-redux";\
import Header from "../components/Header";
import Footer from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from '@mui/material/styles';



const Root = styled('Root')(({ theme }) => ({
    flexGrow: 1,
}));

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

    // Fix IE 11 issue.
}));


const PageWrapper = ({component}) => {
    console.log("component", component)
    return (
        <div id={"idPageWrapper"} style={{ display: "flex" }}>
            <CssBaseline>
                <Root>
                    <Appframe>
                        <Header />
                        <Mainlayout>
                            {component}
                        </Mainlayout>
                    </Appframe>
                    <Footer />
                </Root>
            </CssBaseline>
        </div>
    );
}




export default PageWrapper;

// export default withStyles(persistentDrawerStyle, {withTheme: true})(connect((state) => {
//     return {
//         drawerOpen: state.drawerState.drawerOpen,
//     };
// }, null)(PageWrapper));
