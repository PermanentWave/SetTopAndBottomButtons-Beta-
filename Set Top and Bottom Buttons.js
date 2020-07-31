// ==UserScript==
// @name Set Top and Bottom buttons (Beta)
// @description Set Top and Bottom buttons on your browser
// @version 1.09b6
// @author PermanentWave
// @license Copyright (c) 2020 PermanentWave Released under the MIT license https://github.com/PermanentWave/SetTopAndBottomButtons/blob/master/LICENSE
// @include *
// @icon http://github.com/PermanentWave.png
// @run-at document-end
// @grant none
// ==/UserScript==

// package
function SetTopBottomButtons( ) {

	// load element
	let letElement = fncSelectElement( );
	// timer
	let letUpTimer;
	let letDownTimer;
	let letIdleTimer;
	// up and down timeout
	const constTimeOut = 0;
	// z-index (layer number)
	const constZIndex = 1001; // edit this value
	// y-position (%)
	const constYPosition = 55; // edit this value
	// idle timeout (milliseconds)
	const constIdleTimeOut = 2000; // edit this value
	// auto hide buttons (true:auto hide, false:always show)
	const constAutoHideMode = true; // edit this value

	// [1] skip all iframe 
	if ( window.self != window.top ) { return; };

	// create element
	function fncCreateElement( varNumber ) { return document.createElement( varNumber ); }; // end of function

	// select element
	function fncSelectElement( ) {
		// high priority used
		if ( 'scrollingElement' in document ) {
			return document.scrollingElement;
		// firefox
		} else if ( navigator.userAgent.indexOf( 'webkit' ) != -1 ) {
			return document.body;
		// browser expected firefox
		} else if ( 'documentElement' in document ) {
			return document.documentElement;
		// default
		} else {
			return document.body;
		} // end if
	}; // end of function

	// add style
	function fncAddStyle( varCSS ) {
		let letHtmlHeadElement = document.head || document.getElementsByTagName( 'head' )[0];
		if ( letHtmlHeadElement ) {
			let letStyle = fncCreateElement( "style" );
			letStyle.type = "text/css";
			letStyle.appendChild( document.createTextNode( varCSS ) );
			letHtmlHeadElement.appendChild( letStyle );
		} // end if

		return true;
	}; // end of function

	// move up
	function fncMoveUp( ) { 
		window.scrollTo( 0, 0 );
		letUpTimer = setTimeout( fncMoveUp, constTimeOut );

		return true;
	}; // end of function

	// move down
	function fncMoveDown( ) { 
		let letDocumentHeight = fncSelectElement( );
		let letBottom = letDocumentHeight.scrollHeight - letDocumentHeight.clientHeight;
		window.scrollTo( 0, letBottom * 1.05 ); // +5% over scroll
		letDownTimer = setTimeout( fncMoveDown, constTimeOut );

		return true;
	}; // end of function

	function fncScrollTop( varDocumentElement ) {
		let letScrollTop = window.pageYOffset || varDocumentElement.scrollTop;

		return letScrollTop;
	}; // end of function

	function fncScrollBottom( varDocumentElement ) {
		let letScrollTop = fncScrollTop( varDocumentElement );
		let letScrollHeight = varDocumentElement.scrollHeight;
		let letClientHeight = varDocumentElement.clientHeight;
		let letClientTop = varDocumentElement.clientTop;
		let letScrollBottom = letScrollHeight - letClientHeight - letClientTop - letScrollTop;

		return letScrollBottom;
	}; // end of function

	// Height check		// only beta version
	function fncCheckHeight( ) {
		let letAlert = "";

		letAlert = "<<Loading>>  "
		// show element
		if ( 'scrollingElement' in document ) {
			letAlert = letAlert + "document.scrollingElement";
		// firefox
		} else if ( navigator.userAgent.indexOf( 'webkit' ) != -1 ) {
			letAlert = letAlert + "document.body";
		// browser expected firefox
		} else if ( 'documentElement' in document ) {
			letAlert = letAlert + "document.documentElement";
		// default
		} else {
			letAlert = letAlert + "document.body";
		} // end if
		letAlert = letAlert + "\n";
		letAlert = letAlert + "\n";
		letAlert = letAlert + "\n";

		// scrollingElement height
		letAlert = letAlert + "scrollingElement.scrollHeight: " + document.scrollingElement.scrollHeight.toFixed(2) + "\n";
		letAlert = letAlert + "scrollingElement.scrollTop: " + fncScrollTop( document.scrollingElement ).toFixed(2) + "\n";
		letAlert = letAlert + "scrollingElement.clientHeight: " + document.scrollingElement.clientHeight.toFixed(2) + "\n";
		letAlert = letAlert + "scrollingElement.clientTop: " + document.scrollingElement.clientTop.toFixed(2) + "\n";
		letAlert = letAlert + "scrollingElement.scrollBottom: " + fncScrollBottom( document.scrollingElement ).toFixed(2) + "\n";
		letAlert = letAlert + "\n";

		// documentElement height
		letAlert = letAlert + "documentElement.scrollHeight: " + document.documentElement.scrollHeight.toFixed(2) + "\n";
		letAlert = letAlert + "documentElement.scrollTop: " + fncScrollTop( document.documentElement ).toFixed(2) + "\n";
		letAlert = letAlert + "documentElement.clientHeight: " + document.documentElement.clientHeight.toFixed(2) + "\n";
		letAlert = letAlert + "documentElement.clientTop: " + document.documentElement.clientTop.toFixed(2) + "\n";
		letAlert = letAlert + "documentElement.scrollBottom: " + fncScrollBottom( document.documentElement ).toFixed(2) + "\n";
		letAlert = letAlert + "\n";

		// body height
		letAlert = letAlert + "body.scrollHeight: " + document.body.scrollHeight.toFixed(2) + "\n";
		letAlert = letAlert + "body.scrollTop: " + fncScrollTop( document.body ).toFixed(2) + "\n";
		letAlert = letAlert + "body.clientHeight: " + document.body.clientHeight.toFixed(2) + "\n";
		letAlert = letAlert + "body.clientTop: " + document.body.clientTop.toFixed(2) + "\n";
		letAlert = letAlert + "body.scrollBottom: " + fncScrollBottom( document.body ).toFixed(2) + "\n";

		alert( letAlert );

		return true;
	}; // end of function

	// document scroll
	function fncGetScroll( ) { return ( letElement.clientHeight < letElement.scrollHeight ); }; // end of function

	// add css
	function fncShareCSS( ){ 
		// variables
		let letString='';
		let letImgUp;
		let letImgDown;
		let letImgCheck; // beta version only
		
		// img vs button
		letImgUp = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=';
		letImgDown = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==';
		letImgCheck = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAABTSURBVDhPY/z//z8DNQATlKYYEDRo9erV/0EYysUJqOaiIRhGxAKsXsMWuKGhoYxQJlZAv8CGuY5uLho1iDAYfAYRnbJhAFd6ornX2PFgLICBAQBQciFGldEVwAAAAABJRU5ErkJggg=='; // beta version only
		// button id
		letString+='#play_btn_up { position:fixed; right:0; bottom:' + constYPosition + '%;z-index:'+constZIndex+'; height:36px; width:36px; cursor:pointer; background:url(' + letImgUp + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		letString+='#play_btn_dn { position:fixed; right:0; top:' + constYPosition + '%;  z-index:'+constZIndex+'; height:36px; width:36px; cursor:pointer; background:url(' + letImgDown + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		letString+='#play_btn_chk { position:fixed; right:0; top:' + ( constYPosition + 15 ) + '%;  z-index:'+constZIndex+'; height:36px; width:36px; cursor:pointer; background:url(' + letImgCheck + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; // beta version only
		// button class
		letString+='.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
		letString+='.play_btn:hover { opacity:1; }'; 
		// append
		fncAddStyle( '' + letString );

		return true;
	}; // end of function

	// main
	function fncCreateButtonElement( ) { 
		let letUpButton;
		let letDownButton;
		let letCheckButton; // beta version only
		let letHeight = fncGetScroll( );
		let letClickFlag = 0;

		// exit	let
		if( !letHeight ) { return; }; // end if

		// add css
		fncShareCSS( ); 

		// if 
		if( letElement ){ 
			// create DOM element
			letUpButton = fncCreateElement( 'span' );
			letDownButton = fncCreateElement( 'span' );
			letCheckButton = fncCreateElement( 'span' ); // beta version only
			// set attribute
			letUpButton.setAttribute( 'id','play_btn_up' );
			letDownButton.setAttribute( 'id','play_btn_dn' );
			letCheckButton.setAttribute( 'id','play_btn_chk' ); // beta version only
			// set class
			letUpButton.className = "play_btn";
			letDownButton.className = "play_btn";
			letCheckButton.className = "play_btn"; // beta version only
			// append element
			document.body.appendChild( letUpButton );
			document.body.appendChild( letDownButton );
			document.body.appendChild( letCheckButton ); // beta version only

			// scroll
			let letScrollTop = fncScrollTop( letElement );
			// if scroll 
			letUpButton.style.display = ( letScrollTop > 0 ) ? "" : "none";

			// switch visible buttons
			function fncVisibleButtons( ) {
				let letScrollTop = fncScrollTop( letElement );
				let letScrollBottom = fncScrollBottom( letElement );

				letUpButton.style.display = ( letScrollTop > 0 ) ? "" : "none";
				letDownButton.style.display = ( letScrollBottom >= 1 ) ? "" : "none"; // remove digits after decimal point
				letCheckButton.style.display = ""; // beta version only

				return true;
			}; // end function

			// switch invisible buttons
			function fncInvisibleButtons( ) {
				if ( constAutoHideMode ) {
					letUpButton.style.display = "none";
					letDownButton.style.display = "none";
					letCheckButton.style.display = "none"; // beta version only
				} // end if

				return true;
			}; // end function

			// reset timer
			function fncRestartTimer( ) {
				fncVisibleButtons( );
				clearTimeout( letIdleTimer );
				letIdleTimer = setTimeout( fncInvisibleButtons, constIdleTimeOut );

				return true;
			}; // end function

			// OnScroll Event
			function fncOnScroll( ) {
				let letScrollTop = fncScrollTop( letElement );
				let letScrollBottom = fncScrollBottom( letElement );

				// if scroll up
				letUpButton.style.display = ( letScrollTop > 0 ) ? "" : "none";
				// if scroll down
				letDownButton.style.display = ( letScrollBottom >= 1 ) ? "" : "none"; // remove digits after decimal point
				// always on
				letCheckButton.style.display = ""; // beta version only

				// if click
				if ( letClickFlag < 0 ) {
					letUpButton.style.display = "none";
					letClickFlag = 0;
				} else if ( letClickFlag > 0 ) {
					letDownButton.style.display = "none";
					letClickFlag = 0;
				} // end if

				return true;
			}; // end function

			// add event loading
			window.addEventListener( 'load', fncRestartTimer, false );

			// add event click
			letUpButton.addEventListener( 'click', fncMoveUp, false );
			letUpButton.addEventListener( 'click', function( ){ clearTimeout( letUpTimer ); }, false );
			letUpButton.addEventListener( 'click', function( ){ letClickFlag = -1; }, false );

			letDownButton.addEventListener( 'click', fncMoveDown, false );
			letDownButton.addEventListener( 'click', function( ){ clearTimeout( letDownTimer ); }, false );
			letDownButton.addEventListener( 'click', function( ){ letClickFlag = 1; }, false );

			letCheckButton.addEventListener( 'click', fncCheckHeight, false ); // beta version only

			// add event scroll
			window.addEventListener( 'scroll', fncRestartTimer, false );
			window.addEventListener( 'scroll', fncOnScroll, false );

		} // end if

		return true;
	}; // end of function

	// run it
	fncCreateButtonElement( );

	return true;
}; // end of function

// call
SetTopBottomButtons( );
