import React from 'react';
import ReactDOM from 'react-dom';

class SectionOverview extends React.Component {
    render() {
        return (
            <div>
                <div className="uk-grid" data-uk-grid-margin>
                    <div className="uk-width-medium-1-3">
                        <div className="uk-grid">
                            <div className="uk-width-1-6">
                                <i className="uk-icon-cog uk-icon-large uk-text-primary"></i>
                            </div>
                            <div className="uk-width-5-6">
                                <h2 className="uk-h3">Section Heading</h2>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>

                    <div className="uk-width-medium-1-3">
                        <div className="uk-grid">
                            <div className="uk-width-1-6">
                                <i className="uk-icon-thumbs-o-up uk-icon-large uk-text-primary"></i>
                            </div>
                            <div className="uk-width-5-6">
                                <h2 className="uk-h3">Sample Heading</h2>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>

                    <div className="uk-width-medium-1-3">
                        <div className="uk-grid">
                            <div className="uk-width-1-6">
                                <i className="uk-icon-cloud-download uk-icon-large uk-text-primary"></i>
                            </div>
                            <div className="uk-width-5-6">
                                <h2 className="uk-h3">Sample Heading</h2>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="uk-grid-divider"/>

                <div className="uk-grid" data-uk-grid-margin>
                    <div className="uk-width-medium-1-3">
                        <div className="uk-grid">
                            <div className="uk-width-1-6">
                                <i className="uk-icon-dashboard uk-icon-large uk-text-primary"></i>
                            </div>
                            <div className="uk-width-5-6">
                                <h2 className="uk-h3">React Heading 1</h2>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>

                    <div className="uk-width-medium-1-3">
                        <div className="uk-grid">
                            <div className="uk-width-1-6">
                                <i className="uk-icon-comments uk-icon-large uk-text-primary"></i>
                            </div>
                            <div className="uk-width-5-6">
                                <h2 className="uk-h3">Sample Heading</h2>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>

                    <div className="uk-width-medium-1-3">
                        <div className="uk-grid">
                            <div className="uk-width-1-6">
                                <i className="uk-icon-briefcase uk-icon-large uk-text-primary"></i>
                            </div>
                            <div className="uk-width-5-6">
                                <h2 className="uk-h3">Sample Heading</h2>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SectionOverview;
