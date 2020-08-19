// ==UserScript==
// @name AdGuard Set Top and Bottom buttons (Beta)
// @name:ja AdGuard 最上部/最下部 移動ボタン (Beta)
// @description Set Top and Bottom buttons on your browser (Beta)
// @description:ja 最上部/最下部へ移動するボタンをブラウザ上に追加します (Beta)
// @version 1.13b1
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

	// load element
	const letElement = fncSelectElement( );
	// timer
	let letUpTimer;
	let letDownTimer;
	let letIdleTimer;
	// up and down timeout (miliseconds)
	const constTimeOut = 0;
	// z-index (layer number)
	const constZIndex = 1001; // edit this value
	// y-position (%)
	const constYPosition = 55; // edit this value
	// idle timeout (milliseconds)
	const constIdleTimeOut = 2000; // edit this value
	// auto hide buttons (true:auto hide, false:always show)
	const constAutoHideMode = true; // edit this value

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
		window.scrollTo( 0, letBottom );
		letDownTimer = setTimeout( fncMoveDown, constTimeOut );

		return true;
	}; // end of function

	// get y-position from top
	function fncScrollTop( varDocumentElement ) {
		let letScrollTop = window.pageYOffset || varDocumentElement.scrollTop;

		return letScrollTop;
	}; // end of function

	// get y-position from bottom
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
	function fncShareCSS( ) { 
		// variables
		let letString = '';
		let letImgUp;
		let letImgDown;
		let letImgCheck; // beta version only

		// img vs button
		letImgUp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMjAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDgtMTlUMjI6NDQ6NTgrMDk6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDgtMTlUMjI6NDQ6NTgrMDk6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS44LjQiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDgtMTlUMjI6NDQ6NTgrMDk6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PlHVXmMAAAGCaUNDUHNSR0IgSUVDNjE5NjYtMi4xAAAokXWRu0sDQRCHvySK4oMIWlhYBIlWifgA0cYiQaOgFvEEX83lzCVCEo+7CxJsBduAgmjjq9C/QFvBWhAURRArC2tFG5VzzggRMbPMzre/3Rl2Z8GrZLSsVdUN2ZxtxmORwMzsXKDmkVqaaSRIUNUsY2JqRKGivd3gceNV2K1V+dy/Vr+YtDTw1AoPaYZpC48Kj6/Yhsubwi1aWl0UPhYOmXJB4WtXT5T4yeVUiT9cNpV4FLxNwoHUL078Yi1tZoXl5QSzmbz2cx/3JQ3J3PSUxHbxNizixIgQYIxhovTTw6DM/YTppUtWVMjv/s6fZFlyNZkNCpgskSKNTUjUvFRPStRFT8rIUHD7/7evlt7XW6reEIHqB8d56YCaDfgsOs77vuN8HoDvHs5y5fzlPRh4Fb1Y1oK74F+Dk/OyltiC03VovTNUU/2WfOJeXYfnI2icheZLqJsv9exnn8NbUFblqy5gewc65bx/4QuGA2f0XklmhwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAKxJREFUOI3l0bENwkAMBdBvIrFAVmGF1Ol+jxiAWRggondHzQpZKYLGReTYvoiGIu7un/VOug8cbqS1oKodgIcd7ySXn0HDJgCjRS8AtwpNQYcNFr9baAh6jORs+aWFbsAMW92XqLjlDRaVUqGyAwtLyVAxTAA8CywsxaFXkp+TLZ4B9BlGcra/HCybVLVbZb0ZfyjFP9hCy1IirIWmpVRYgual7MEAICrlgPMFVuSZwaTk21gAAAAASUVORK5CYII=';
		letImgDown = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgZXhpZjpQaXhlbFhEaW1lbnNpb249IjIwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMjAiCiAgIGV4aWY6Q29sb3JTcGFjZT0iMSIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMCIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDgtMTlUMjI6NDQ6MzErMDk6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDgtMTlUMjI6NDQ6MzErMDk6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS44LjQiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDgtMTlUMjI6NDQ6MzErMDk6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PgcyKwoAAAGCaUNDUHNSR0IgSUVDNjE5NjYtMi4xAAAokXWRu0sDQRCHvySK4oMIWlhYBIlWifgA0cYiQaOgFvEEX83lzCVCEo+7CxJsBduAgmjjq9C/QFvBWhAURRArC2tFG5VzzggRMbPMzre/3Rl2Z8GrZLSsVdUN2ZxtxmORwMzsXKDmkVqaaSRIUNUsY2JqRKGivd3gceNV2K1V+dy/Vr+YtDTw1AoPaYZpC48Kj6/Yhsubwi1aWl0UPhYOmXJB4WtXT5T4yeVUiT9cNpV4FLxNwoHUL078Yi1tZoXl5QSzmbz2cx/3JQ3J3PSUxHbxNizixIgQYIxhovTTw6DM/YTppUtWVMjv/s6fZFlyNZkNCpgskSKNTUjUvFRPStRFT8rIUHD7/7evlt7XW6reEIHqB8d56YCaDfgsOs77vuN8HoDvHs5y5fzlPRh4Fb1Y1oK74F+Dk/OyltiC03VovTNUU/2WfOJeXYfnI2icheZLqJsv9exnn8NbUFblqy5gewc65bx/4QuGA2f0XklmhwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAMFJREFUOI3l0bFxAjEQBdAHZK7HLRCTeLYBCqAE10ABNKCM+FpwB9RAzNgzHggQzB2jk46ACIWr1ZNWn7dbM0gpfaDDJiJ+ngFSSp/4xldE/M5z/YQDutzwDNbhiD+YQ0ScscZ+KtrD9lhn4zpyr2mBHVZYjo1fwP5ve7NCcxWtYXfwMZQxtIRNCiXfOvjTCjYI5T5y6VUPNSPYYPRmKLm2zS2bGva6UKaiLWwULKG5XMWqYAHVwppgDx2E0jrzZusCy16pPBfspzgAAAAASUVORK5CYII=';
		letImgCheck = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAABTSURBVDhPY/z//z8DNQATlKYYEDRo9erV/0EYysUJqOaiIRhGxAKsXsMWuKGhoYxQJlZAv8CGuY5uLho1iDAYfAYRnbJhAFd6ornX2PFgLICBAQBQciFGldEVwAAAAABJRU5ErkJggg=='; // beta version only
		// button id
		letString += '#play_btn_up { position:fixed; right:0; bottom:' + constYPosition + '%;z-index:' + constZIndex + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgUp + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		letString += '#play_btn_dn { position:fixed; right:0; top:' + constYPosition + '%;  z-index:' + constZIndex + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgDown + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
		letString += '#play_btn_chk { position:fixed; right:0; top:' + ( constYPosition + 15 ) + '%;  z-index:' + constZIndex + '; height:36px; width:36px; cursor:pointer; background:url(' + letImgCheck + ') no-repeat scroll 50% 50% rgba( 0, 0, 0, 0.7 ); border-radius:5px 0 0 5px; margin-top:-24px; }'; // beta version only
		// button class
		letString += '.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
		letString += '.play_btn:hover { opacity:1; }'; 
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

		// switch visible buttons
		function fncVisibleButtons( ) {
			let letScrollTop = fncScrollTop( letElement );
			let letScrollBottom = fncScrollBottom( letElement );

			// if scroll up
			letUpButton.style.display = ( letScrollTop > 0 ) ? "" : "none";
			// if scroll down
			letDownButton.style.display = ( letScrollBottom >= 1 ) ? "" : "none"; // remove digits after decimal point
			// always on
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

		// onscroll event
		function fncOnScroll( ) {
			fncVisibleButtons( );

			// if click
			if ( letClickFlag < 0 ) { // invisible top button if click top button
				letUpButton.style.display = "none";
				letClickFlag = 0;
			} else if ( letClickFlag > 0 ) { // invisible buttom button if click buttom button
				letDownButton.style.display = "none";
				letClickFlag = 0;
			} // end if

			return true;
		}; // end function

		// exit function
		if( !letHeight ) { return; }; // end if

		// add css
		fncShareCSS( ); 
		
		// if loading element
		if( letElement ) { 
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

			fncVisibleButtons( );

			// add event loading
			window.addEventListener( 'load', fncRestartTimer, false );
			// add event click up button
			letUpButton.addEventListener( 'click', fncMoveUp, false );
			letUpButton.addEventListener( 'click', function( ){ clearTimeout( letUpTimer ); }, false );
			letUpButton.addEventListener( 'click', function( ){ letClickFlag = -1; }, false );
			// add event click down button
			letDownButton.addEventListener( 'click', fncMoveDown, false );
			letDownButton.addEventListener( 'click', function( ){ clearTimeout( letDownTimer ); }, false );
			letDownButton.addEventListener( 'click', function( ){ letClickFlag = 1; }, false );
			// add event click information button
			letCheckButton.addEventListener( 'click', fncCheckHeight, false ); // beta version only
			// add event scroll
			window.addEventListener( 'scroll', fncRestartTimer, false );
			window.addEventListener( 'scroll', fncOnScroll, false );
		} // end if

		return true;
	}; // end of function

	// skip all iframe 
	if ( window.self != window.top ) { return; };

	// run it
	fncCreateButtonElement( );

	return true;
}; // end of function

// call
SetTopBottomButtons( );
