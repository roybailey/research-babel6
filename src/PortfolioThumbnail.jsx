import React from 'react';
import ReactDOM from 'react-dom';
import D3 from 'd3';

class PortfolioThumbnail extends React.Component {

    render() {
        console.log("Rendering PortfolioThumbnail "+this.props.id);
        var dataModel = "{target:'#" +this.props.id+"'}";
        return (
            <div className="uk-width-medium-1-3">
                <div className="uk-thumbnail uk-overlay-hover" data-uk-modal={dataModel}>
                    <figure className="uk-overlay">
                        <img width="600" height="400"
                             src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNjAwcHgiIGhlaWdodD0iNDAwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2MDAgNDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGNUY1RjUiIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIi8+DQo8ZyBvcGFjaXR5PSIwLjciPg0KCTxwYXRoIGZpbGw9IiNEOEQ4RDgiIGQ9Ik0yMjguMTg0LDE0My41djExM2gxNDMuNjMydi0xMTNIMjI4LjE4NHogTTM2MC4yNDQsMjQ0LjI0N0gyNDAuNDM3di04OC40OTRoMTE5LjgwOEwzNjAuMjQ0LDI0NC4yNDcNCgkJTDM2MC4yNDQsMjQ0LjI0N3oiLz4NCgk8cG9seWdvbiBmaWxsPSIjRDhEOEQ4IiBwb2ludHM9IjI0Ni44ODEsMjM0LjcxNyAyNzEuNTcyLDIwOC43NjQgMjgwLjgyNCwyMTIuNzY4IDMxMC4wMTYsMTgxLjY4OCAzMjEuNTA1LDE5NS40MzQgDQoJCTMyNi42ODksMTkyLjMwMyAzNTQuNzQ2LDIzNC43MTcgCSIvPg0KCTxjaXJjbGUgZmlsbD0iI0Q4RDhEOCIgY3g9IjI3NS40MDUiIGN5PSIxNzguMjU3IiByPSIxMC43ODciLz4NCjwvZz4NCjwvc3ZnPg0K"
                             alt=""/>
                        <figcaption
                            className="uk-overlay-panel uk-overlay-icon uk-overlay-background uk-overlay-fade"></figcaption>
                        <a className="uk-position-cover" href="#">({this.props.id}.1)</a>
                    </figure>
                </div>
                <div id={this.props.id} className="uk-modal">
                    <div className="uk-modal-dialog uk-modal-dialog-lightbox">
                        <a href="" className="uk-modal-close uk-close uk-close-alt">({this.props.id}.2)</a>
                        <img width="600" height="400"
                             src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkViZW5lXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iNjAwcHgiIGhlaWdodD0iNDAwcHgiIHZpZXdCb3g9IjAgMCA2MDAgNDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2MDAgNDAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IGZpbGw9IiNGNUY1RjUiIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIi8+DQo8ZyBvcGFjaXR5PSIwLjciPg0KCTxwYXRoIGZpbGw9IiNEOEQ4RDgiIGQ9Ik0yMjguMTg0LDE0My41djExM2gxNDMuNjMydi0xMTNIMjI4LjE4NHogTTM2MC4yNDQsMjQ0LjI0N0gyNDAuNDM3di04OC40OTRoMTE5LjgwOEwzNjAuMjQ0LDI0NC4yNDcNCgkJTDM2MC4yNDQsMjQ0LjI0N3oiLz4NCgk8cG9seWdvbiBmaWxsPSIjRDhEOEQ4IiBwb2ludHM9IjI0Ni44ODEsMjM0LjcxNyAyNzEuNTcyLDIwOC43NjQgMjgwLjgyNCwyMTIuNzY4IDMxMC4wMTYsMTgxLjY4OCAzMjEuNTA1LDE5NS40MzQgDQoJCTMyNi42ODksMTkyLjMwMyAzNTQuNzQ2LDIzNC43MTcgCSIvPg0KCTxjaXJjbGUgZmlsbD0iI0Q4RDhEOCIgY3g9IjI3NS40MDUiIGN5PSIxNzguMjU3IiByPSIxMC43ODciLz4NCjwvZz4NCjwvc3ZnPg0K"
                             alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default PortfolioThumbnail;
