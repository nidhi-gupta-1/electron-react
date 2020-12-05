import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {VIEW_TYPE,VIEW} from '../constants/tab.constants';


class TabComponent extends Component {
    constructor() {
        super();
        this.state = {
            tabIndex: 0,
            inputField: "",
            selectValue: "",
            isVisible : false,
            tabView : [VIEW.VIEW_1,VIEW.VIEW_2,VIEW.VIEW_3]
        };
    }

    /**
     * Handle on click to display the selected view
     * @param {*} tabIndex 
     * @param {*} viewType 
     */
    onViewClick = (tabIndex, viewType) => {
        switch (viewType) {
            case VIEW_TYPE.TAB_VIEW:
                this.setState({ tabIndex: tabIndex });
                break;
            case VIEW_TYPE.DROPDOWN_VIEW:
                if (tabIndex !== "NaN") {
                    this.setState({ tabIndex: tabIndex });
                }
                break;
            case VIEW_TYPE.BUTTON_VIEW:
                if (this.state.inputField !== "") {
                    this.setState({ tabIndex: tabIndex });
                }
                break;
            default:
                break;
        }
    }

    /**
     * Handle on change to set the selected Input 
     * @param {*} e 
     */
    onInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let inputField = this.state.inputField;
        switch (name) {
            case VIEW.VIEW_1:
                inputField = value;
                break;
            default:
                break;
        }
        this.setState({ inputField: inputField });
    }

    /**
     * Render Dropdown of views
     * @param {*} name 
     */
    renderDropdown(name){
        return(
            <ul className="openItem">
                {this.state.tabView !== undefined && this.state.tabView.map((row,index) => (
                    <li key = {row+index}><a onClick={(e) => this.onViewClick(index, name)}>{row}</a></li>     
                ))}
                {/* <li><a onClick={(e) => this.onViewClick(1, name)}>View2</a></li>
                <li><a onClick={(e) => this.onViewClick(2, name)}>View3</a></li> */}
            </ul>
        );
      }

      /**
       * Handle on click to display the selected view
       * from dropDown
       * @param {*} e 
       */
      _handleClick = (e)=> {
        e.preventDefault();
        this.setState({
          isVisible: !this.state.isVisible
        });
      }

    render() {
        return (
            <div>
                <Tabs selectedIndex={this.state.tabIndex} onSelect={(e) => this.onViewClick(e, VIEW_TYPE.TAB_VIEW)}>
                    <TabList className="tablist">
                        {this.state.tabView !== undefined && this.state.tabView.map((row,index) => (
                            <Tab key = {row+index}>{row}</Tab>     
                        ))}
                        <div className="container">
                            <button type="button" name= "dropdownView" onClick={(e)=>this._handleClick(e)} onFocus={(e)=>this._handleClick(e)}>
                            +</button>
                            { this.state.isVisible ? this.renderDropdown(VIEW_TYPE.DROPDOWN_VIEW) : null }
                        </div>
                    </TabList>
                    {this.state.tabView !== undefined && this.state.tabView.map((row,index) => (
                            <TabPanel key = {row+index}>
                                <h2>Welcome To {row}</h2>
                                {row === VIEW.VIEW_3 ? "":
                                     (row === VIEW.VIEW_1 ?
                                    <form >
                                        <input type="text" id={row+index} name={row} onChange={this.onInputChange} value={this.state.inputField} required />
                                        <button className="btn1" type="submit" onClick={() => this.onViewClick((index+1), VIEW_TYPE.BUTTON_VIEW)}>Submit</button>
                                     </form> :
                                    <input type="text" id={row+index} name={row} defaultValue={this.state.inputField} />)
                                }
                            </TabPanel>     
                    ))}
                    {/* <TabPanel>
                        <h2>Welcome To Home View</h2>
                        <form >
                            <input type="text" id="view1name" name="view1name" onChange={this.onInputChange} value={this.state.inputField} required />
                            <button className="btn1" type="submit" onClick={() => this.onViewClick(1, VIEW_TYPE.BUTTON_VIEW)}>Submit</button>
                        </form>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <h2>Here's the 2nd View</h2>
                            <input type="text" id="view2name" name="view2name" defaultValue={this.state.inputField} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <h2>Here's the 3rd View</h2>
                        </div>
                    </TabPanel> */}
                </Tabs>
            </div>
        );
    }
}

export default TabComponent;