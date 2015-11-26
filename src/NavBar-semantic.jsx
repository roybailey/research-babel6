import React from 'react';
import ReactDOM from 'react-dom';

class MainNavBar extends React.Component {

    componentDidMount() {
        $('.ui.dropdown').dropdown();
    }

    render() {
        return (
            <div className="ui pointing menu">
                <a className="active item" href="dashboard.html">
                    <i className="home icon"></i> Knowledge Center
                </a>
                <a className="item" href="features.html">
                    <i className="comments outline icon"></i> Features
                </a>
                <a className="item" href="technologies.html">
                    <i className="desktop icon"></i> Technologies
                </a>
                <a className="item">
                    <i className="github icon"></i> GitHub
                </a>

                <div className="right menu">
                    <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Search..."/>
                            <i className="search link icon"></i>
                        </div>
                    </div>
                    <div className="ui dropdown item">
                        Developer
                        <i className="dropdown icon"></i>

                        <div className="menu">
                            <a className="item" href="">
                                <i className="archive icon"></i> JIRA
                            </a>
                            <a className="item" href="support.html">
                                <i className="doctor icon"></i> Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainNavBar;
