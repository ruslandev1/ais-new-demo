import React from "react";
import PageWrapper from "./PageWrapper";
import Dashboard from "./DashBoardPage";



const HomePage = (props) => {
  return <PageWrapper component={<Dashboard />}/>
}

export default HomePage;


// export default connect(mapStateToProps, (dispatch) =>
//   dispatch(setModuleTitle("Əsas Səhifə"))
// )(HomePage);

// function mapStateToProps(state) {
//   return {
//     user: state.loginState.user,
//   };
// }
