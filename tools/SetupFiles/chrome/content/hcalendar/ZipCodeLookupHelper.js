//
// Example is prepared by Igor ZC (hcalendar@gmail.com), 2006.
// Should be work under IE6, Firefox 1.5.
// Web service ZipCodes can be found in page http://www.webservicelist.com/webservices/f.asp?fid=74105
//

var req;
var resultRequestHandler;
function ifNetscape()
{
	var app=navigator.appName.substring(0, 1);
	if (app=='N')
		return true;
	return false;
}
function loadXMLDoc(url) {
	if (window.XMLHttpRequest) {
//		if (ifNetscape())
//			netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
		req = new XMLHttpRequest();
	        req.onreadystatechange = processReqChange;
	        req.open("GET", url, true);
	        req.send(null);
	}
	else
	{
		if (window.ActiveXObject) 
		{
			req = new ActiveXObject("Microsoft.XMLHTTP");
			if (req) 
			{
				req.onreadystatechange = processReqChange;
				req.open("GET", url, true);
				req.send();
			}
		}

	}
	return 0;
}
function processReqChange() 
{
	// only if req shows "complete"
	if (req.readyState == 4) 
	{
		// only if "OK"
		if (req.status == 200) {
			try
			{
				//alert(req.responseText)
//				if (ifNetscape())
//					netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
				// ...processing statements go here...
				var response = req.responseXML.documentElement;

				var elLatDegrees = response.getElementsByTagName('LatDegrees')[0].firstChild;
				var elLonDegrees = response.getElementsByTagName('LonDegrees')[0].firstChild;
				var elLatRadians = response.getElementsByTagName('LatRadians')[0].firstChild;
				var elLonRadians = response.getElementsByTagName('LonRadians')[0].firstChild;

				//var elLatDegrees = response.childNodes[0];
				//var elLonDegrees = response.childNodes[1];
				//var elLatRadians = response.childNodes[2];
				//var elLonRadians = response.childNodes[3];

				if (resultRequestHandler != null)
					resultRequestHandler(0, elLatDegrees.data, elLonDegrees.data, elLatRadians.data, elLonRadians.data);
			}
			catch (e)
			{
				alert(e);
				if (resultRequestHandler != null)
					resultRequestHandler(-1, 0, 0, 0, 0);
			}

		} else 
		{
			if (resultRequestHandler != null)
				resultRequestHandler(-2, 0, 0, 0, 0);
			//alert("There was a problem retrieving the XML data:\n" + req.statusText);
		}
	}
}

function showCoordinates_google(zipCode, resultRequest) {
	alert("showCoordinates_google");
	var address = zipCode;
	alert("showCoordinates_google, address:" + address);
	try
	{
 		var geocoder = new google.maps.Geocoder();
		alert("showCoordinates_google, created geoCoder");
    	geocoder.geocode( { 'address': address}, function(results, status) 	{ alert("geoCode result");	});
		alert("showCoordinates_google, called geocoder.geocode");
	}
	catch(e)
	{
		alert(e);
	}
	return 0;
}

function showCoordinates_googleAPI(zipCode, resultRequest) {
	var address = zipCode;
	var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + address;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200)
		{
			try
			{
				var responseText = JSON.parse(req.responseText);
				var location = responseText.results[0].geometry.location;
				var lat = location.lat;
				var lng = location.lng;
				if (resultRequest != null)
					resultRequest(0, lat, lng, lat, lng);
			}
			catch(e)
			{
				alert(e);
				if (resultRequest != null)
					resultRequest(-2, 0, 0, 0, 0);
			}
		}
	}
	req.open("GET", url, true);
	req.send(null);
	return 0;
}

function showCoordinates(serviceId, zipCode, resultRequest) {
	return showCoordinates_googleAPI(zipCode, resultRequest);

	//resultRequestHandler = resultRequest;
	//var authenticationHeader = serviceId;
	//var url ="http://codebump.com/services/zipcodelookup.asmx/GetZipCodeCoordinates?AuthenticationHeader=" + authenticationHeader + "&zip=" + zipCode;
	//loadXMLDoc(url);
	//return 0;
}
