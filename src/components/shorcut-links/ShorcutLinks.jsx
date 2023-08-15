import ShortcutLinksCore from "./ShorcutLinkCore";
import React, {Fragment} from "react";
import DataGrid, {
    Column,
    ColumnFixing,
    FilterRow,
    GroupPanel,
    Pager,
    Paging,
    Selection
} from "devextreme-react/data-grid";
import {Popup} from 'devextreme-react/popup';
import Loading from "../Loading";
import {Button} from 'devextreme-react';
import { Paper } from "@mui/material";
import ScrollView from 'devextreme-react/scroll-view';

export default class ShortcutLinks extends ShortcutLinksCore {

    constructor(pros) {
        super(pros);
        this.state = {
            shortCutList: [],
            popupVisible: false,
            popupData: null,
        };
    }


    componentDidMount() {
        this.loadSortcutLinks(this.processing, this.error, rsp => {
            this.setState(Object.assign({}, this.state, {shortCutList: rsp}))
        });
    }

    handleOnClick = event => {
        const {action, data} = event;
        console.log(event)

        if (action === "OPEN_URL") {
            const win = window.open(data, '_blank');
            win.focus();
        } else if (action === "OPEN_DETAIL") {
            this.setState({
                popupVisible: true, popupData: data
            });
        }
    };

    hidePopup = () => {
        this.setState({
            popupVisible: false,
        });
    }

    render() {
        const {shortCutList, processing} = this.state;
        return (
            <Fragment>
                {processing && <Loading/>}
                <Paper style={{marginTop: 12}}>
                    <DataGrid
                        id={'id'}
                        dataSource={shortCutList}
                        showBorders={true}
                        showRowLines={true}
                        headerFilter={{visible: false}}
                        columnAutoWidth={true}
                        keyExpr={'id'}
                    >
                        <GroupPanel visible={false}/>
                        <Paging defaultPageSize={10}/>
                        <Pager
                            showPageSizeSelector={true}
                            allowedPageSizes={[5, 10, 20]}
                            showInfo={true}/>
                        <Selection mode={'single'}/>
                        <FilterRow visible={true}/>
                        <ColumnFixing enabled={true}/>
                        <Column caption={'id'} dataField={'id'} visible={false}/>
                        <Column caption={'url'} dataField={'url'} visible={false}/>
                        <Column caption={'Keçidin adı'} dataField={'name'}/>
                        <Column caption={'Yerləşdiyi yer'} dataField={'location'}/>
                        <Column caption={''}
                                allowSorting={false}
                                allowFiltering={false}
                                dataField={''}
                                width={150}
                                fixed={true}
                                fixedPosition={'right'}
                                cellRender={r =>
                                    <div>
                                        <Button className="button-info" width={100}
                                                height={35}
                                                style={{backgroundColor: '#FF7F50', color: 'white'}}
                                                onClick={() => this.handleOnClick({
                                                    action: 'OPEN_DETAIL',
                                                    data: r.data
                                                })}
                                        >
                                            Ətraflı
                                        </Button>
                                    </div>
                                }/>
                    </DataGrid>
                </Paper>
                {this.state.popupVisible && this.state.popupData && <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.hidePopup}
                    dragEnabled={false}
                    showTitle={true}
                    title="Ətraflı məlumat"
                    maxWidth={500}
                    maxHeight={500}
                    resizeEnabled={true}
                    // width={300}
                    // height={250}
                >
                    <ScrollView width='100%' height='100%'>
                        <div style={{color: '#333', fontSize: '18px', margin: '10px 0'}}>İzah</div>
                        {this.state.popupData.desc}
                        <div style={{color: '#333', fontSize: '18px', margin: '10px 0'}}>İstifadə yeri</div>
                        {this.state.popupData.usageDesc}
                        <div style={{margin: 20}}>
                            <Button width={100}
                                    height={35}
                                    style={{backgroundColor: '#FF7F50', color: 'white', float: 'right'}}
                                    onClick={() => this.handleOnClick({
                                        action: 'OPEN_URL',
                                        data: this.state.popupData.url
                                    })}
                            >
                                Keçid
                            </Button>
                        </div>
                    </ScrollView>
                </Popup>}
            </Fragment>
        );
    }
}
