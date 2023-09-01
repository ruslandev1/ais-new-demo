import React from 'react';
import PageWrapper from "./PageContainer";
import ShortcutLinks from '../components/shorcut-links/ShorcutLinks';
import { connect } from 'react-redux';
import { setModuleTitle } from './../actions/AppStateActions';


const ShortcutLinkPage = props => <PageWrapper component={<ShortcutLinks {...props}/>}/>;

export default connect(mapStateToProps,dispatch =>dispatch(setModuleTitle('Qısayol keçidlər')))(ShortcutLinkPage);

function mapStateToProps(state) {
    return {
      user: state.loginState.user,
    };
  }
