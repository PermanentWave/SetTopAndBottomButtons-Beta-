// ==UserScript==
// @name Set Top and Bottom buttons (Beta)
// @description Set Top and Bottom buttons on your browser (Beta)
// @version 1.08b5
// @author PermanentWave
// @license Copyright (c) 2020 PermanentWave Released under the MIT license https://opensource.org/licenses/mit-license.php
// @include *
// @icon http://github.com/PermanentWave.png
// @run-at document-end
// @grant none
// ==/UserScript==

// figure out if this is moz || IE because they use documentElement
var varHtmlElement = fncSelectElement();
// timer
var varUpTimer;
var varDownTimer;
var varIdleTimer;
// up and down timeout
var varTimeOut;
// idle timeout
var varIdleTimeOut = 3000; // edit this value
// z-index
var varZIndex = 1001; // edit this value
// y-position (%)
var varYPosition = 55; // edit this value
// auto hide buttons
var varAutoHideMode = true; // edit this value

// [1] skip all iframe 
if (window.self!=window.top) {return}

// create element
function fncCreateElement(varNumber) { return document.createElement(varNumber); } // end of function

// select element
function fncSelectElement() {
	if ('scrollingElement' in document) {
		return document.scrollingElement;
	} else if (navigator.userAgent.indexOf('webkit') != -1) {
		return document.body;
	} else if ('documentElement' in document) {
		return document.documentElement;
	} else {
		return document.body;
	} // end if
}  // end of function

// add style
function fncAddStyle(varCSS) {
	var varHtmlHeadElement = document.head || document.getElementsByTagName('head')[0];
	if (varHtmlHeadElement) {
		var varStyle = fncCreateElement("style");
		varStyle.type = "text/css";
		varStyle.appendChild(document.createTextNode(varCSS));
		varHtmlHeadElement.appendChild(varStyle);
	} // end if
} // end of function

// move up
function fncMoveUp() { 
	window.scrollTo(0, 0);
	varUpTimer = setTimeout(fncMoveUp, varTimeOut);
	return true;
} // end of function

// move down
function fncMoveDown() { 
	var varDocumentHeight = fncSelectElement();
	var varBottom = varDocumentHeight.scrollHeight - varDocumentHeight.clientHeight;
	window.scrollTo(0, varBottom*1.05); // +5% over scroll
	varDownTimer = setTimeout(fncMoveDown, varTimeOut);
	return true;
} // end of function

// Height check // only beta version
function fncCheckHeight() {
	var varAlert = "";
	var varTmp;
	var varElement = fncSelectElement();

	// loading height
	varAlert = varAlert + "(Loading) scrollHeight: " + varElement.scrollHeight.toFixed(2) + "\n";
	varAlert = varAlert + "(Loading) scrollTop: " + varElement.scrollTop.toFixed(2) + "\n";
	varAlert = varAlert + "(Loading) clientHeight: " + varElement.clientHeight.toFixed(2) + "\n";
	varAlert = varAlert + "(Loading) clientTop: " + varElement.clientTop.toFixed(2) + "\n";
	varTmp = varElement.scrollHeight - varElement.scrollTop - varElement.clientHeight - varElement.clientTop;
	varAlert = varAlert + "(Loading) scrollBottom: " + varTmp.toFixed(2) + "\n";
	varAlert = varAlert + "\n";
	varAlert = varAlert + "\n";

	// scrollingElement height
	varAlert = varAlert + "scrollingElement.scrollHeight: " + document.scrollingElement.scrollHeight.toFixed(2) + "\n";
	varAlert = varAlert + "scrollingElement.scrollTop: " + document.scrollingElement.scrollTop.toFixed(2) + "\n";
	varAlert = varAlert + "scrollingElement.clientHeight: " + document.scrollingElement.clientHeight.toFixed(2) + "\n";
	varAlert = varAlert + "scrollingElement.clientTop: " + document.scrollingElement.clientTop.toFixed(2) + "\n";
	varTmp = document.scrollingElement.scrollHeight - document.scrollingElement.scrollTop - document.scrollingElement.clientHeight - document.scrollingElement.clientTop;
	varAlert = varAlert + "scrollingElement.scrollBottom: " + varTmp.toFixed(2) + "\n";
	varAlert = varAlert + "\n";
	
	// documentElement height
	varAlert = varAlert + "documentElement.scrollHeight: " + document.documentElement.scrollHeight.toFixed(2) + "\n";
	varAlert = varAlert + "documentElement.scrollTop: " + document.documentElement.scrollTop.toFixed(2) + "\n";
	varAlert = varAlert + "documentElement.clientHeight: " + document.documentElement.clientHeight.toFixed(2) + "\n";
	varAlert = varAlert + "documentElement.clientTop: " + document.documentElement.clientTop.toFixed(2) + "\n";
	varTmp = document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight - document.documentElement.clientTop;
	varAlert = varAlert + "documentElement.scrollBottom: " + varTmp.toFixed(2) + "\n";
	varAlert = varAlert + "\n";

	// body height
	varAlert = varAlert + "body.scrollHeight: " + document.body.scrollHeight.toFixed(2) + "\n";
	varAlert = varAlert + "body.scrollTop: " + document.body.scrollTop.toFixed(2) + "\n";
	varAlert = varAlert + "body.clientHeight: " + document.body.clientHeight.toFixed(2) + "\n";
	varAlert = varAlert + "body.clientTop: " + document.body.clientTop.toFixed(2) + "\n";
	varTmp = document.body.scrollHeight - document.body.scrollTop - document.body.clientHeight - document.body.clientTop;
	varAlert = varAlert + "body.scrollBottom: " + varTmp.toFixed(2) + "\n";

	alert(varAlert);
} // end of function

// document scroll
function fncGetScroll(varScrolledStep) { 
	var varDocument = document;
	var varDocumentBody = varDocument.body;
	var varDocumentElement = varDocument.documentElement;
	var varClient = "client" + varScrolledStep;
	var varScrolledStep = "scroll" + varScrolledStep;
	return /CSS/.test(varDocument.compatMode)? (varDocumentElement[varClient]< varDocumentElement[varScrolledStep]) : (varDocumentBody[varClient]< varDocumentBody[varScrolledStep])
} // end of function

// add css
function fncShareCSS(){ 
	// variables
	var varString='';
	var varImgUp;
	var varImgDown;
	var varImgCheck; // beta version only
	
	// img vs button
	varImgUp = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=';
	varImgDown = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==';
	varImgCheck = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAABTSURBVDhPY/z//z8DNQATlKYYEDRo9erV/0EYysUJqOaiIRhGxAKsXsMWuKGhoYxQJlZAv8CGuY5uLho1iDAYfAYRnbJhAFd6ornX2PFgLICBAQBQciFGldEVwAAAAABJRU5ErkJggg=='; // beta version only
	// button id
	varString+='#play_btn_up { position:fixed; right:0; bottom:' + varYPosition + '%;z-index:'+varZIndex+'; height:36px; width:36px; cursor:pointer; background:url('+varImgUp+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
	varString+='#play_btn_dn { position:fixed; right:0; top:' + varYPosition + '%;   z-index:'+varZIndex+'; height:36px; width:36px; cursor:pointer; background:url('+varImgDown+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
	varString+='#play_btn_chk { position:fixed; right:0; top:' + (varYPosition + 15) + '%;   z-index:'+varZIndex+'; height:36px; width:36px; cursor:pointer; background:url('+varImgCheck+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; // beta version only
	// button class
	varString+='.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
	varString+='.play_btn:hover { opacity:1; }'; 
	// append
	fncAddStyle(''+varString);
} // end of function

// main
function fncCreateButtonElement() { 
	var varUpButton;
	var varDownButton;
	var varCheckButton; // beta version only
	var varDocumentHeight = fncSelectElement();
	var varHeight = fncGetScroll('Height');
	var varClickFlag = 0;

	// exit	var
	if(!varHeight) { return; } // end if
	
	// add css
	fncShareCSS(); 

	// if 
	if(varHtmlElement){ 
		// create DOM element
		varUpButton = fncCreateElement('span');
		varDownButton = fncCreateElement('span');
		varCheckButton = fncCreateElement('span'); // beta version only
		// set attribute
		varUpButton.setAttribute('id','play_btn_up');
		varDownButton.setAttribute('id','play_btn_dn');
		varCheckButton.setAttribute('id','play_btn_chk'); // beta version only
		// set class
		varUpButton.className = "play_btn";
		varDownButton.className = "play_btn";
		varCheckButton.className = "play_btn"; // beta version only
		// append element
		document.body.appendChild(varUpButton);
		document.body.appendChild(varDownButton);
		document.body.appendChild(varCheckButton); // beta version only
		
		// switch visible buttons
		function fncVisibleButtons(varFlag) {
			varUpButton.style.display = "";
			varDownButton.style.display = "";
			varCheckButton.style.display = ""; // beta version only
			return true;
		}; // end function

		// switch invisible buttons
		function fncInvisibleButtons() {
			if (varAutoHideMode = true) {
				varUpButton.style.display = "none";
				varDownButton.style.display = "none";
				varCheckButton.style.display = "none"; // beta version only
			}
			return true;
		}; // end function

		// reset timer
		function fncRestartTimer() {
			fncVisibleButtons;
			clearTimeout(varIdleTimer);
			varIdleTimer = setTimeout(fncInvisibleButtons, varIdleTimeOut);
			return true;
		}; // end function
		
		// OnScroll Event
		function fncOnScroll() {
			var varScrollTop = window.pageYOffset || varDocumentHeight.scrollTop;
			var varScrollHeight = varDocumentHeight.scrollHeight;
			var varClientHeight = varDocumentHeight.clientHeight;
			var varClientTop = varDocumentHeight.clientTop;
			var varScrollBottom = varScrollHeight - varClientHeight - varClientTop - varScrollTop;
			
			fncRestartTimer;
			
			// if scroll up
			varUpButton.style.display = ( varScrollTop > 0 )  ? "" : "none";
			// if scroll down
			varDownButton.style.display = ( varScrollBottom >= 1 )  ? "" : "none"; // remove digits after decimal point
			// always on
			varCheckButton.style.display = ""; // beta version only
			
			// if click
			if (varClickFlag < 0) {
				varUpButton.style.display = "none";
				varClickFlag = 0;
			} else if (varClickFlag > 0) {
				varDownButton.style.display = "none";
				varClickFlag = 0;
			} // end if
		}; // end function
		
		// add event loading
		window.addEventListener('load', fncRestartTimer, false);
		
		// add event click
		varUpButton.addEventListener('click', fncRestartTimer, false);
		varUpButton.addEventListener('click', fncMoveUp, false);
		varUpButton.addEventListener('click', function(){clearTimeout(varUpTimer);}, false);
		varUpButton.addEventListener('click', function(){varClickFlag = -1;}, false);
		
		varDownButton.addEventListener('click', fncRestartTimer, false);
		varDownButton.addEventListener('click', fncMoveDown, false);
		varDownButton.addEventListener('click', function(){clearTimeout(varDownTimer);}, false);
		varDownButton.addEventListener('click', function(){varClickFlag = 1;}, false);
		
		varCheckButton.addEventListener('click', fncRestartTimer, false); // beta version only
		varCheckButton.addEventListener('click', fncCheckHeight, false); // beta version only
		
		// add event scroll
		document.addEventListener('scroll', fncOnScroll, false);
		document.addEventListener('scroll', fncRestartTimer, false);
	} // end if
} // end of function

// run it
fncCreateButtonElement();
