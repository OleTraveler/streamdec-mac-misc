/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

const myAction = new Action('com.github.oletraveler.streamdeck-mac-misc.action');
let websocket

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
	console.log('Stream Deck connected!');
});

myAction.onKeyUp(({ action, context, device, event, payload }) => {
	console.log('Your key code goes here!');
});

myAction.onDialRotate(({ action, context, device, event, payload }) => {
	console.log('Your dial code goes here!');
});


function connectElgatoStreamDeckSocket(port, uuid, registerPlugin, appInfoString, actionInfo) {
	console.log("macMisc connectElgatoStreamDeckSocket called", port, uuid, registerPlugin, appInfoString, actionInfo)

	websocket = new WebSocket("ws://localhost:" + port);
	websocket.onopen = function()
	{
		// WebSocket is connected, register the plugin
		var json = {
			"event": registerPlugin,
			"uuid": uuid
		};

		websocket.send(JSON.stringify(json));
	};

	websocket.onmessage = function (evt) {
		console.log('EVENT: ', evt);
	}


	// const delay = window?.initialConnectionDelay || 0;
	//
	//
	// setTimeout(() => {
	// 	$SD.connect(port, uuid, messageType, appInfoString, actionInfo);
	// }, delay);
}


