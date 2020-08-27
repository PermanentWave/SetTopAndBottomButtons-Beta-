// ==UserScript==
// @name AdGuard Set Top and Bottom buttons (Beta)
// @name:ja AdGuard 最上部/最下部 移動ボタン (Beta)
// @description Set Top and Bottom buttons on your browser (Beta)
// @description:ja 最上部/最下部へ移動するボタンをブラウザ上に追加します (Beta)
// @version 2.0b4
// @author PermanentWave
// @homepageURL https://github.com/PermanentWave/SetTopAndBottomButtons
// @updateURL https://raw.githubusercontent.com/PermanentWave/SetTopAndBottomButtons-Beta-/master/SetTopAndBottomButtons.user.js
// @supportURL https://github.com/PermanentWave/SetTopAndBottomButtons/issues
// @license Copyright (c) 2020 PermanentWave Released under the MIT license https://github.com/PermanentWave/SetTopAndBottomButtons/blob/master/LICENSE
// @include *
// @icon http://github.com/PermanentWave.png
// @run-at document-end
// @grant none
// ==/UserScript==

// package
function SetTopBottomButtons( ) {

	// timer
	let letIdleTimer;
	// load element
	const LOAD_ELEMENT = fncSelectElement( );
	// layer index (number)
	const LAYER_INDEX = 1001; // edit this value
	// position (%)
	const POSITION = 55; // edit this value
	const POSITION_OFFSET = 15; // edit this value	// only beta version
	// idle timeout (milliseconds)
	const IDLE_TIMEOUT = 2000; // edit this value
	// auto hide buttons (true:auto hide, false:always show)
	const AUTO_HIDE_MODE = true; // edit this value

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
		let letElement = document.head || document.getElementsByTagName( 'head' )[0];
		if ( letElement ) {
			let letStyle = fncCreateElement( "style" );
			letStyle.type = "text/css";
			letStyle.appendChild( document.createTextNode( varCSS ) );
			letElement.appendChild( letStyle );
		} // end if

		return true;
	}; // end of function

	// add css
	function fncShareCSS( ) {
		let letString = '';
		let letImgUp;
		let letImgDown;
		let letImgCheck; // beta version only

		// img vs button
		letImgUp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAMAAAC3SZ14AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURaqqqqqqqkdwTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqjfXEQEAAAAMdFJOU/wPAKSPdF28R8805OPAZQgAAABpSURBVBjTZZBbDgAhCANbfOv977urBJ/9sRkIkwh5AivkjdgaT8TSWuGBEmpF2pFDFslwC3nE/kR4QwFBjaN0NIZqHOvQE2bsR6GiafwLnA1t3YE8jeQ0itxGzW60bMaZaVwx48GI96M/9sgD7Y3Hro8AAAAASUVORK5CYII=';
		letImgDown = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUBAMAAAByuXB5AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqu6rUBMAAAALdFJOUwAQ/j2n1PG8j1x0dBa5ZQAAAGhJREFUCNdjYIADQTjtKgBmMIYwmBWAWezJDMwqYJaTAQPDpAYgg0MTSHBpAYlFC0B6miYwcGqA9bIoMxg5QPSWGadD9YqmBUL1MoYKwPQKgvUyQPWCAFgvxBkgvRAA0gsBQL3oroUCAIEJErtmb0XIAAAAAElFTkSuQmCC';
		letImgCheck = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAABTSURBVDhPY/z//z8DNQATlKYYEDRo9erV/0EYysUJqOaiIRhGxAKsXsMWuKGhoYxQJlZAv8CGuY5uLho1iDAYfAYRnbJhAFd6ornX2PFgLICBAQBQciFGldEVwAAAAABJRU5ErkJggg=='; // beta version only
		// button id
		letString += '#play_btn_up { position:fixed; right:0; bottom:' + POSITION + '%; z-index:' + LAYER_INDEX + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgUp + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		letString += '#play_btn_dn { position:fixed; right:0; top:' + POSITION + '%; z-index:' + LAYER_INDEX + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgDown + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		letString += '#play_btn_chk { position:fixed; right:0; top:' + ( POSITION + POSITION_OFFSET ) + '%; z-index:' + LAYER_INDEX + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgCheck + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; // beta version only
		// button class
		letString += '.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
		letString += '.play_btn:hover { opacity:1; }'; 
		// append
		fncAddStyle( '' + letString );

		return true;
	}; // end of function

	// move up
	function fncMoveUp( ) { 
		window.scrollBy( 0, -fncScrollTop( LOAD_ELEMENT ) );

		return true;
	}; // end of function

	// move down
	function fncMoveDown( ) { 
		window.scrollBy( 0, fncScrollBottom( LOAD_ELEMENT ) );

		return true;
	}; // end of function

	// get position from top to client top
	function fncScrollTop( varDocumentElement ) { return window.pageYOffset || varDocumentElement.scrollTop; }; // end of function

	// get position from bottom to client bottom
	function fncScrollBottom( varDocumentElement ) { return varDocumentElement.scrollHeight - varDocumentElement.clientHeight - fncScrollTop( varDocumentElement ); }; // end of function

	// compare height
	function fncCompareHeight( ) { return ( LOAD_ELEMENT.clientHeight < LOAD_ELEMENT.scrollHeight ); }; // end of function
	
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
		letAlert = letAlert + "scrollingElement.scrollBottom: " + fncScrollBottom( document.scrollingElement ).toFixed(2) + "\n";
		letAlert = letAlert + "\n";

		// documentElement height
		letAlert = letAlert + "documentElement.scrollHeight: " + document.documentElement.scrollHeight.toFixed(2) + "\n";
		letAlert = letAlert + "documentElement.scrollTop: " + fncScrollTop( document.documentElement ).toFixed(2) + "\n";
		letAlert = letAlert + "documentElement.clientHeight: " + document.documentElement.clientHeight.toFixed(2) + "\n";
		letAlert = letAlert + "documentElement.scrollBottom: " + fncScrollBottom( document.documentElement ).toFixed(2) + "\n";
		letAlert = letAlert + "\n";

		// body height
		letAlert = letAlert + "body.scrollHeight: " + document.body.scrollHeight.toFixed(2) + "\n";
		letAlert = letAlert + "body.scrollTop: " + fncScrollTop( document.body ).toFixed(2) + "\n";
		letAlert = letAlert + "body.clientHeight: " + document.body.clientHeight.toFixed(2) + "\n";
		letAlert = letAlert + "body.scrollBottom: " + fncScrollBottom( document.body ).toFixed(2) + "\n";

		alert( letAlert );

		return true;
	}; // end of function

	// main
	function fncCreateButtonElement( ) { 
		let letUpButton;
		let letDownButton;
		let letCheckButton; // beta version only

		// switch visible buttons
		function fncVisibleButtons( ) {
			// if scroll up
			letUpButton.style.display = ( fncScrollTop( LOAD_ELEMENT ) > 0 ) ? "" : "none";
			// if scroll down
			letDownButton.style.display = ( fncScrollBottom( LOAD_ELEMENT ) >= 1 ) ? "" : "none"; // remove digits after decimal point
			// always on
			letCheckButton.style.display = ""; // beta version only

			return true;
		}; // end function

		// switch invisible buttons
		function fncInvisibleButtons( ) {
			if ( AUTO_HIDE_MODE ) {
				letUpButton.style.display = "none";
				letDownButton.style.display = "none";
				letCheckButton.style.display = "none"; // beta version only
			} // end if

			return true;
		}; // end function

		// restart timer
		function fncRestartTimer( ) {
			clearTimeout( letIdleTimer );
			letIdleTimer = setTimeout( fncInvisibleButtons, IDLE_TIMEOUT );

			return true;
		}; // end function

		// if unnecessary
		if( !fncCompareHeight( ) ) { return; }; // end if

		// add css
		fncShareCSS( ); 
		
		// if load element
		if( LOAD_ELEMENT ) { 
			// create DOM element
			letUpButton = fncCreateElement( 'span' );
			letDownButton = fncCreateElement( 'span' );
			letCheckButton = fncCreateElement( 'span' ); // beta version only
			// set attribute
			letUpButton.setAttribute( 'id', 'play_btn_up' );
			letDownButton.setAttribute( 'id', 'play_btn_dn' );
			letCheckButton.setAttribute( 'id', 'play_btn_chk' ); // beta version only
			// set class
			letUpButton.className = "play_btn";
			letDownButton.className = "play_btn";
			letCheckButton.className = "play_btn"; // beta version only
			// append element
			document.body.appendChild( letUpButton );
			document.body.appendChild( letDownButton );
			document.body.appendChild( letCheckButton ); // beta version only

			// initialize buttons
			fncVisibleButtons( );

			// add event load
			window.addEventListener( 'load', fncRestartTimer, false );
			// add event click up button
			letUpButton.addEventListener( 'click', fncMoveUp, false );
			// add event click down button
			letDownButton.addEventListener( 'click', fncMoveDown, false );
			// add event click information button
			letCheckButton.addEventListener( 'click', fncCheckHeight, false ); // beta version only
			// add event scroll
			window.addEventListener( 'scroll', fncRestartTimer, false );
			window.addEventListener( 'scroll', fncVisibleButtons, false );
		} // end if

		return true;
	}; // end of function

	// skip all iframe 
	if ( window.self != window.top ) { return; };

	// run
	fncCreateButtonElement( );

	return true;
}; // end of function

// call
SetTopBottomButtons( );