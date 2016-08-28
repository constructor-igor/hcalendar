		var Prefs = new HCalendar_PrefManager();
		var loadedByZIP;
		var latDegreesValueByZIP;
		var latRadiansValueByZIP;
		var lonDegreesValueByZIP;
		var lonRadiansValueByZIP;
		function getPref(strID) { return Prefs.getPref(strID); }
		function setPref(strID, varValue) { Prefs.setPref(strID, varValue); }
		function getElement(strID) { return document.getElementById(strID); }
		
		function onLoad() {
			document.documentElement.getButton("extra1").label = getElement("extra1-label").getAttribute("label");
			centerWindowOnScreen();

			var hLanguageList = getElement("languageList");
			var hLocationList = getElement("locationList");
			var hTextColorPicker = getElement("textColorPicker");
			var hHolidayColorPicker = getElement("holidayColorPicker");
			var hDstControl = document.getElementById("dstOption");
			var hShowOmerCountingControl = document.getElementById("voShowOmerCounting");
			var hShowOmerDetailsControl = document.getElementById("voShowOmerDetails");			
			var hShowCivilHolidaysControl = document.getElementById("voShowCivilHolidays");
			var h24HourFormat = document.getElementById("chk24HourFormat");
			var hSwitchBySunSet = document.getElementById("daySwitchBySunSet");
			var hAutoDST = document.getElementById("autoDST");
			var hZip_ZipCodesMenu = document.getElementById("zipCode");
			var hZip_TimeZonesList = document.getElementById("timeZoneList");
			var hFontSizeList = document.getElementById("fontSizeList");
			var hFontSizeListPopup = document.getElementById("fontSizeListPopup");

			var hLocationListPopup = document.getElementById("locationListPopup");
			FillLocations(hLocationListPopup);

			var hZip_TimeZonesListNodes = document.getElementById("timeZoneListPopup");
			FillTimesZones(hZip_TimeZonesListNodes);

			var hCoords_TimeZonesListNodes = document.getElementById("timeCoordsZoneListPopup");
			FillTimesZones(hCoords_TimeZonesListNodes);

			hLanguageList.value = getPref("hcalendar.language");
			hLocationList.value = getPref("hcalendar.location");
			hTextColorPicker.color = getPref("hcalendar.textColor");
			hHolidayColorPicker.color = getPref("hcalendar.holidayColor");
			FillFontSize(hFontSizeListPopup);
			hFontSizeList.value = getPref("hcalendar.fontSize");

			var locationType = getPref("hcalendar.locationType");
			SetLocationType(locationType);
			hZip_ZipCodesMenu.value = getPref("hcalendar.ZIP_ZipCode");
			hZip_TimeZonesList.value = getPref("hcalendar.ZIP_TimeZone");
			loadedByZIP = getPref("hcalendar.ZIP_loaded");
			latDegreesValueByZIP = getPref("hcalendar.ZIP_latDegrees");
			latRadiansValueByZIP = getPref("hcalendar.ZIP_latRadian");
			lonDegreesValueByZIP = getPref("hcalendar.ZIP_lonDegrees");
			lonRadiansValueByZIP = getPref("hcalendar.ZIP_lonRadians");
			ShowCoordinatesByZIP();

			getElement("coordLtH").value = getPref("hcalendar.COORD_latDegrees");
			getElement("coordLtM").value = getPref("hcalendar.COORD_latRadian");
			getElement("coordLtNS").value = getPref("hcalendar.COORD_NS");
			getElement("coordLnH").value = getPref("hcalendar.COORD_lonDegrees");
			getElement("coordLnM").value = getPref("hcalendar.COORD_lonRadians");
			getElement("coordLnWE").value = getPref("hcalendar.COORD_WE");
			getElement("timeCoordsZoneList").value = getPref("hcalendar.COORD_TimeZone");
		
  			hDstControl.checked = getPref("hcalendar.dst");
			hShowOmerCountingControl.checked = getPref("hcalendar.ShowOmerCounting");
			hShowOmerDetailsControl.checked = getPref("hcalendar.ShowOmerDetails");
			hShowCivilHolidaysControl.checked = getPref("hcalendar.ShowCivilHolidays");
			
			h24HourFormat.checked = !getPref("hcalendar.24HourFormat");
			hSwitchBySunSet.checked = getPref("hcalendar.daySwitchBySunSet");
			hAutoDST.checked = getPref("hcalendar.autoDST");

			getElement("chkShowParashaInIsrael").checked = getPref("hcalendar.hint.showParashaInIsrael");

			//getElement("hintShowCivilianDate").checked = getPref("hcalendar.hint.show.CivilianDate");
			//getElement("hintShowNumberDaysBeforeShabbat").checked = getPref("hcalendar.hint.show.NumberDaysBeforeShabbat");
			//getElement("hintShowSunRise").checked = getPref("hcalendar.hint.show.SunRise");
			//getElement("hintShowSunSet").checked = getPref("hcalendar.hint.show.SunSet");
			//getElement("hintShowParasha").checked = getPref("hcalendar.hint.show.Parasha");

			getElement("chkOpenInANewTab").checked = getPref("hcalendar.openInANewTab");
			getElement("chkFocusAfterOpening").checked = getPref("hcalendar.selectAfterOpening");

			UpdateByAutoDST();
			
			var charMin = "\u00BA";
			getElement("sepLt").label = charMin;
			getElement("sepLn").label = charMin;
		}		
		function onAccept() {
			var language = getElement("languageList").value;
			var location = getElement("locationList").value;
			var textColor = getElement("textColorPicker").color;
			var holidayColor = getElement("holidayColorPicker").color;
			var dst = getElement("dstOption").checked;
			var showOmerCounting = getElement("voShowOmerCounting").checked;
			var showOmerDetails = getElement("voShowOmerDetails").checked;
			var showCivilHolidays = getElement("voShowCivilHolidays").checked;
			var chk24HourFormat = !getElement("chk24HourFormat").checked;
			setPref("hcalendar.language", language);
			setPref("hcalendar.location", location);
			setPref("hcalendar.textColor", textColor);
			setPref("hcalendar.holidayColor", holidayColor);
			setPref("hcalendar.fontSize", document.getElementById("fontSizeList").value);
			setPref("hcalendar.dst", dst);
			setPref("hcalendar.ShowOmerCounting", showOmerCounting);
			setPref("hcalendar.ShowOmerDetails", showOmerDetails);
			setPref("hcalendar.ShowCivilHolidays", showCivilHolidays);
			setPref("hcalendar.24HourFormat", chk24HourFormat);
			setPref("hcalendar.daySwitchBySunSet", document.getElementById("daySwitchBySunSet").checked);
			setPref("hcalendar.autoDST", document.getElementById("autoDST").checked);
			setPref("hcalendar.hint.showParashaInIsrael", getElement("chkShowParashaInIsrael").checked);

			//setPref("hcalendar.hint.show.CivilianDate", document.getElementById("hintShowCivilianDate").checked);
			//setPref("hcalendar.hint.show.NumberDaysBeforeShabbat", document.getElementById("hintShowNumberDaysBeforeShabbat").checked);
			//setPref("hcalendar.hint.show.SunRise", document.getElementById("hintShowSunRise").checked);
			//setPref("hcalendar.hint.show.SunSet", document.getElementById("hintShowSunSet").checked);
			//setPref("hcalendar.hint.show.Parasha", document.getElementById("hintShowParasha").checked);

			var locationType = 0;
			if (document.getElementById("checkLocationByZip").checked == true)
				locationType = 1;
			if (document.getElementById("checkLocationByCoords").checked == true)
				locationType = 2;
			setPref("hcalendar.locationType", locationType);
			setPref("hcalendar.ZIP_ZipCode", document.getElementById("zipCode").value);
			setPref("hcalendar.ZIP_TimeZone", document.getElementById("timeZoneList").value);
			setPref("hcalendar.ZIP_loaded", loadedByZIP);
			setPref("hcalendar.ZIP_latDegrees", latDegreesValueByZIP);
			setPref("hcalendar.ZIP_latRadian", latRadiansValueByZIP);
			setPref("hcalendar.ZIP_lonDegrees", lonDegreesValueByZIP);
			setPref("hcalendar.ZIP_lonRadians", lonRadiansValueByZIP);

			setPref("hcalendar.COORD_latDegrees", getElement("coordLtH").value);
			setPref("hcalendar.COORD_latRadian", getElement("coordLtM").value);
			setPref("hcalendar.COORD_NS", getElement("coordLtNS").value);
			setPref("hcalendar.COORD_lonDegrees", getElement("coordLnH").value);
			setPref("hcalendar.COORD_lonRadians", getElement("coordLnM").value);
			setPref("hcalendar.COORD_WE", getElement("coordLnWE").value);
			setPref("hcalendar.COORD_TimeZone", getElement("timeCoordsZoneList").value);

			setPref("hcalendar.openInANewTab", getElement("chkOpenInANewTab").checked);
			setPref("hcalendar.selectAfterOpening", getElement("chkFocusAfterOpening").checked);

			var topOpener = getTopWindow();
			
			try
			{
				topOpener.HCalendarRefresh();
//				try
//				{
//					topOpener.HCalendarRefresh();
//				}
//				catch(e)
//				{
//					topOpener.opener.HCalendarRefresh();
//				}
			}
			catch(e)
			{
				alert(e);
			}

			return true;
		}
        function getTopWindow()
        {
                var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                                .getService(Components.interfaces.nsIWindowMediator);
                var w = wm.getMostRecentWindow("navigator:browser");

                return w ? w : window.opener;
        }		
		function SetLocationType(newlocationType)
		{
			switch (newlocationType)
			{
				case 0: 
					document.getElementById("checkLocationByCity").checked = true;
					document.getElementById("checkLocationByZip").checked = false;
					document.getElementById("checkLocationByCoords").checked = false;
					break;
				case 1:
					document.getElementById("checkLocationByCity").checked = false;
					document.getElementById("checkLocationByZip").checked = true;
					document.getElementById("checkLocationByCoords").checked = false;
					break;
				case 2:
					document.getElementById("checkLocationByCity").checked = false;
					document.getElementById("checkLocationByZip").checked = false;
					document.getElementById("checkLocationByCoords").checked = true;
					break;
			}
		}
		function UpdateByAutoDST()
		{
			var hDstControl = document.getElementById("dstOption");
			hDstControl.disabled = document.getElementById("autoDST").checked;
			
//			if (document.getElementById("autoDST").checked == true)
//				hDstControl.disabled = true;
//			else
//				hDstControl.disabled = false;
		}
		function SendRequest_GetZipCoordinates()
		{
			getElement("coordinates").value = "Progress...";
			var serviceIdValue = "FPPiAT3zj8qUbQja263cMEsszMeygQIelNeyymHJoxkfv1grPCyxuNQBgqMXhaueUYJsEpsrhPsiyL%2BOr6rI%2BoUZvQhZBXNK";
			var zipCodeValue = getElement("zipCode").value;
			showCoordinates(serviceIdValue, zipCodeValue, ResultRequest_GetZipCoordinates);
		}
		function ResultRequest_GetZipCoordinates(status, latDegreesValue, lonDegreesValue, latRadiansValue, lonRadiansValue)
		{
			if (status == 0)
			{
				loadedByZIP = true;
				latDegreesValueByZIP = Math.abs(latDegreesValue);
				latRadiansValueByZIP = Math.abs(latRadiansValue);
				lonDegreesValueByZIP = Math.abs(lonDegreesValue);
				lonRadiansValueByZIP = Math.abs(lonRadiansValue);

				ShowCoordinatesByZIP();
			}
			else
				alert("Status: "+status+". ZIP code was not received."); 
			
		}
		function ShowCoordinatesByZIP()
		{
			var message = "coordinates are unknown";
			if (loadedByZIP)
				message = 
					"coordinates: " + 
					latDegreesValueByZIP + "\u00BA" + latRadiansValueByZIP + "' N, " + 
					lonDegreesValueByZIP + "\u00BA" + lonRadiansValueByZIP + "' W";
			getElement("coordinates").value = message;
		}
		function Sign(number)
		{
			if(number>0)
				return "+";
			if(number<0)
				return "-";
			return "";
		}
		function zeroed(numIn) 
		{
			return (numIn > 9) ? numIn : ("0" + numIn);
	
		}	
	
		function FillTimesZones(hMenuPopup)
		{
			FillTimesZonesInterval(hMenuPopup, -12, -5);
			FillTimeZone(hMenuPopup, -4.30, -4, "30");
			FillTimesZonesInterval(hMenuPopup, -4, 9);
			FillTimeZone(hMenuPopup, 9.30, 9, "30");
			FillTimesZonesInterval(hMenuPopup, 10, 13);
		}
		function FillTimesZonesInterval(hMenuPopup, startIndex, finishIndex)
		{
			for (i = startIndex; i <= finishIndex; i++)
			{
				var newitem = document.createElement("menuitem");
				var itemValue = i;
				var itemLabel = "GMT";
				if (i!=0)
					itemLabel += Sign(i)+zeroed(Math.abs(i))+":00";
				
      				newitem.setAttribute("value", itemValue);
      				newitem.setAttribute("label", itemLabel);
      				hMenuPopup.appendChild(newitem);
			}
		}
		function FillTimeZone(hMenuPopup, zoneValue, zoneHrLabel, zoneMnLabel)
		{
			var newitem = document.createElement("menuitem");
			var itemValue = zoneValue;
			var itemLabel = "GMT";
			if (zoneHrLabel!=0 && zoneMnLabel!=0)
				itemLabel += Sign(zoneHrLabel)+zeroed(Math.abs(zoneHrLabel)) + ":" + zoneMnLabel;
				
      			newitem.setAttribute("value", itemValue);
      			newitem.setAttribute("label", itemLabel);
      			hMenuPopup.appendChild(newitem);
		}
		function FillFontSize(hMenuPopup)
		{
			for (i = 9; i <= 18; i++)
			{
				var newitem = document.createElement("menuitem");
				var itemValue = i;
				var itemLabel = i;
      				newitem.setAttribute("value", itemValue);
      				newitem.setAttribute("label", itemLabel);
      				hMenuPopup.appendChild(newitem);
			}
		}
		function FillLocations(hMenuPopup)
		{
			var hLocations = document.getElementById("hcalendar-locations");


			ReadLocations(hMenuPopup, hLocations, 1, 99);
			ReadLocations(hMenuPopup, hLocations, 101, 199);
			ReadLocations(hMenuPopup, hLocations, 500, 599);
			ReadLocations(hMenuPopup, hLocations, 901, 999);
		}
		function ReadLocations(hMenuPopup, hLocations, startId, finishId)
		{
			for (locationId = startId; locationId <= finishId; locationId++)
			{
				var locationDataString;
				try
				{
					locationDataString = hLocations.getString("location_" + locationId.toString());
				}
				catch(e)
				{
					return;
				}

				var locationDataStr = new Array();
				locationDataStr = locationDataString.split(",");

				var locationName = locationDataStr[0] +" (" +
					locationDataStr[1] + "\u00BA" + locationDataStr[2] + "' " + locationDataStr[3] + ", " +
					locationDataStr[4] + "\u00BA" + locationDataStr[5] + "' " + locationDataStr[6] + ")";

				var newItem = document.createElement("menuitem");
				newItem.setAttribute("value", locationId);
				newItem.setAttribute("label", locationName);
				hMenuPopup.appendChild(newItem);
			}
		}
