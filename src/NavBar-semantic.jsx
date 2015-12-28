import React from 'react';
import ReactDOM from 'react-dom';

class MainNavBar extends React.Component {

    componentDidMount() {
        $('.ui.dropdown').dropdown();
    }

    render() {
        var menu = [
            { href: "dashboard.html", icon: "home icon", title: "Knowledge Center" },
            { href: "delivery.html", icon: "file text icon", title: "Delivery" },
            { href: "schedule.html", icon: "calendar icon", title: "Schedule" },
            { href: "features.html", icon: "comments outline icon", title: "Features" },
            { href: "technologies.html", icon: "desktop icon", title: "Technologies" },
            { href: "codebase.html", icon: "github icon", title: "Codebase" },
            { href: "dataflows.html", icon: "sitemap icon", title: "DataFlows" }
        ];
        var mainMenu = [];
        menu.forEach((item)=> {
            mainMenu.push(
                <a className={'item '+(this.props.page===item.href? 'active' : '')} href={item.href} key={item.href}>
                    <i className={item.icon}></i> {item.title}
                </a>
            );
        });
        return (
            <div className="ui pointing menu">
                {mainMenu}

                <div className="right menu">
                    <div className="item">
                        <div className="ui icon input">
                            <input type="text" placeholder="Search..."/>
                            <i className="search link icon"></i>
                        </div>
                    </div>
                    <div className="ui dropdown item">
                        Tools
                        <i className="dropdown icon"></i>

                        <div className="menu">
                            <a className="item" href="upload-data.html">
                                Upload Data
                            </a>
                            <a className="item" href="upload-file.html">
                                Upload File
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainNavBar;
