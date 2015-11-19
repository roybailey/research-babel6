import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar.jsx';
import SplashScreen from './SplashScreen.jsx';
import SectionOverview from './SectionOverview.jsx';
import ArticleOverview from './ArticleOverview.jsx';
import ThumbnailBar from './ThumbnailBar.jsx';
import Portfolio from './Portfolio.jsx';

if( document.querySelector("#NavBar")) {
	ReactDOM.render(<NavBar/>, document.querySelector("#NavBar"));
}

if( document.querySelector("#SplashScreen")) {
	ReactDOM.render(<SplashScreen/>, document.querySelector("#SplashScreen"));
}

if( document.querySelector("#SectionOverview")) {
    ReactDOM.render(<SectionOverview/>, document.querySelector("#SectionOverview"));
}

if( document.querySelector("#ArticleOverview")) {
    ReactDOM.render(<ArticleOverview/>, document.querySelector("#ArticleOverview"));
}

if( document.querySelector("#Portfolio")) {
	ReactDOM.render(<Portfolio/>, document.querySelector("#Portfolio"));
}

if( document.querySelector("#ThumbnailBar")) {
    ReactDOM.render(<ThumbnailBar/>, document.querySelector("#ThumbnailBar"));
}
