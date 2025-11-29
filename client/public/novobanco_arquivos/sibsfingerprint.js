function loadScript(callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    //script.src = 'https://www.sibs.com/fingerprint/fingerprintjs2/fingerprint2.js';
	script.src = '/web/Resources/js/fingerprint2.js';
    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
	if (script.onreadystatechange === undefined) {
	    script.onload = callback;
	} else {
	    script.onreadystatechange = callback;
	}

    // Fire the loading
    head.appendChild(script);
}

function getFingerprint(version , callback) {

	loadScript( function(){

    var fingerprintReport = function (callback) {
      var d1 = new Date();
      Fingerprint2.get(function(components) {
        murmur = Fingerprint2.x64hash128(components.map(function (pair) { return pair.value }).join(), 31);
		callback( murmur);
      })
    }
	
	setTimeout(fingerprintReport(callback) , 500);
	
	});
	
}