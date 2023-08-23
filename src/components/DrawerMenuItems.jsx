import React, {Fragment} from "react";
import { styled } from '@mui/material/styles';
import * as PropTypes from "prop-types";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import Icon from "@mui/material/Icon/Icon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse/Collapse";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from "@mui/material/Divider/Divider";

const PREFIX = 'DrawerMenuItems';

const classes = {
    root: `${PREFIX}-root`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),// theme.spacing(4),
        },
    }
}));


function DrawerMenuItems(props) {

    const items = props.items === null ? [] : props.items;
    // console.log(items)
    return (
        <List component="nav" >{listItemGenerator(items)}</List>
    );

    function itemList(accInfo) {
        console.log("ACCINFO",accInfo)
        return (
            <ListItem key={'listItem_' + accInfo.accInfoId}  component={Link} to={accInfo.modName} dense={true}>
                <ListItemIcon style={{minWidth: 35}}>
                    <Icon>{accInfo.iconName}</Icon>
                </ListItemIcon>
                <ListItemText primary={accInfo.accInfoName}/>
            </ListItem>);
    }

    function listGroup(item, nodes) {
        const open = props.menuGroupState[item.accInfoId];
        return (
            <Root key={'frg_' + item.accInfoId}>
                <Divider/>
                <ListItem  onClick={() => props.onMenuItemAction({action: 'menuItemGroupClick', payload: item})}>
                    <ListItemText primary={item.accInfoName}/>
                    {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </ListItem>


                <Collapse in={!!open} timeout="auto" unmountOnExit key={'grpListItem_' + item.accInfoId}>
                    <List component="div" disablePadding>
                        {nodes}
                    </List>
                </Collapse>
                <Divider/>
            </Root>
        );
    }

    function listItemGenerator(fetchItem) {
        return fetchItem?.map(item => {
            if (item.accTypeId === 2 || item.accTypeId === 4) {
                return itemList(item);
            }
            else if (item.accTypeId === 5) {
                return listGroup(item, listItemGenerator(item.childsPools));
            }
        });
    }


}

DrawerMenuItems.propTypes = {
    // classes: PropTypes.object.isRequired,
    onMenuItemAction: PropTypes.func.isRequired,
    menuGroupState: PropTypes.object.isRequired,
};
export default DrawerMenuItems;
// export default (DrawerMenuItems);
