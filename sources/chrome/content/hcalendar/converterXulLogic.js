		var Prefs = new HCalendar_PrefManager();
		var strParashaName = "";
		function getPref(strID) { return Prefs.getPref(strID); }
		function setPref(strID, varValue) { Prefs.setPref(strID, varValue); }
		function getElement(strID) { return document.getElementById(strID); }
		
		function onLoad() {
			centerWindowOnScreen();

			// =======================================================================

			var hmonthListPopup = document.getElementById("monthListPopup");
			FillMonths(hmonthListPopup, 12, "listMonths");
			var hdayListPopup = document.getElementById("dayListPopup");
			FillDays(hdayListPopup, 31);

			var hyearEditBox = document.getElementById("yearEditBox");
			var hmonthList = document.getElementById("monthList");
			var hdayList = document.getElementById("dayList");
			var now = new Date;
			var cyear = now.getYear();
			if (cyear < 1900)
				cyear += 1900;
			hyearEditBox.value = cyear;
			hmonthList.selectedIndex = now.getMonth();
			hdayList.selectedIndex = now.getDate() - 1;

			//Convert_Civil2Hebrew();

			// =======================================================================

			var hHebMonthListPopup = document.getElementById("hebMonthListPopup");
			FillMonths(hHebMonthListPopup, 13, "heblistMonths");
			var hHebDayListPopup = document.getElementById("hebDayListPopup");
			FillDays(hHebDayListPopup, 30);

			//Convert_Hebrew2Civil();
			InitDates();

			// =======================================================================
		}		
		function onAccept() {
			return true;
		}
		function FillMonths(hMenuPopup, monthesCountInYear, monthStringId)
		{
			var arrMonths = new Array("");
			var hBundle = document.getElementById("hcalendar-bundle");

			var strListMonths = hBundle.getString(monthStringId);
			arrMonths = arrMonths.concat(strListMonths.split(","));

			for (i = 1; i <= monthesCountInYear; i++)
			{
				var newitem = document.createElement("menuitem");
				var itemValue = i - 1;
				var itemLabel = arrMonths[i];
      				newitem.setAttribute("value", itemValue);
      				newitem.setAttribute("label", itemLabel);
      				hMenuPopup.appendChild(newitem);
			}
		}
		function FillDays(hMenuPopup, daysCountInMonth)
		{
			for (i = 1; i <= daysCountInMonth; i++)
			{
				var newitem = document.createElement("menuitem");
				var itemValue = i;
				var itemLabel = i;
      				newitem.setAttribute("value", itemValue);
      				newitem.setAttribute("label", itemLabel);
      				hMenuPopup.appendChild(newitem);
			}
		}
		function Convert_Civil2Hebrew()
		{
			var hyearEditBox = document.getElementById("yearEditBox");
			var hmonthList = document.getElementById("monthList");
			var hdayList = document.getElementById("dayList");
			var hhebrewDate = document.getElementById("convertedHebDate");
			var isEvening = document.getElementById("chkCivilDateEvening").checked;

			var cyear = parseInt(hyearEditBox.value);
			var cmonth = hmonthList.selectedIndex + 1;
			var cdate = hdayList.selectedIndex + 1;
			if (isEvening)
			{
				var uDate = new Date(cyear, cmonth, cdate + 1, 0, 1);
				
				ceyar = uDate.getFullYear();
				cmonth = uDate.getMonth();
				cdate = uDate.getDate();			
			}

			var civilDate = new Date(cyear, cmonth - 1, cdate);
			var hebDate = civ2heb(cdate, cmonth, cyear);

			var hmS = hebDate.substring(hebDate.indexOf(' ')+1, hebDate.length);
			var hDay = parseInt(hebDate.substring(0, hebDate.indexOf(' ')));
			var hMonth = parseInt(hmS.substring(0, hmS.indexOf(' ')));
			var hYear = hmS.substring(hmS.indexOf(' ')+1, hmS.length);

			var hDayStr = FormatDay(hDay);
			hhebrewDate.value = hDayStr + " of " + hebMonth[hMonth+1] + ", " + hYear;
		
			showParashaForDayImpl(civilDate);
			var hParsha = document.getElementById("parshaShabbat_Hebrew");
			hParsha.value = strParashaName;
		}
		function Convert_Hebrew2Civil()
		{
			var hCivilDate = document.getElementById("convertedCivilDate");
			var hHebYearEditBox = document.getElementById("hebYearEditBox");
			var hHebMonthList = document.getElementById("hebMonthList");
			var hHebDayList = document.getElementById("hebDayList");

			var arrMonths = new Array("");
			var hBundle = document.getElementById("hcalendar-bundle");

			var strListMonths = hBundle.getString("listMonths");
			arrMonths = arrMonths.concat(strListMonths.split(","));

			var hebYear = parseInt(hHebYearEditBox.value);
			var hebMonth = hHebMonthList.selectedIndex + 1;
			var hebDay = hHebDayList.selectedIndex + 1;
			var civilDate = hebrew_to_jd(hebYear, hebMonth, hebDay);
			var civilDateArr = jd_to_gregorian(civilDate);
			hCivilDate.value = FormatDay(civilDateArr[2]) + " of " + arrMonths[civilDateArr[1]] + ", " + civilDateArr[0] + " CE";

			var dateCivilDate = new Date(civilDateArr[0], civilDateArr[1] - 1, civilDateArr[2]);
			showParashaForDayImpl(dateCivilDate);
			var hParsha = document.getElementById("parshaShabbat_Civil");
			hParsha.value = strParashaName;			
		}
		function InitDates()
		{
			var hyearEditBox = document.getElementById("yearEditBox");
			var hmonthList = document.getElementById("monthList");
			var hdayList = document.getElementById("dayList");
			var hhebrewDate = document.getElementById("convertedHebDate");

			var cyear = parseInt(hyearEditBox.value);
			var cmonth = hmonthList.selectedIndex + 1;
			var cdate = hdayList.selectedIndex + 1;

			var civilDate = new Date(cyear, cmonth - 1, cdate);
			var hebDate = civ2heb(cdate, cmonth, cyear);

			var hmS = hebDate.substring(hebDate.indexOf(' ')+1, hebDate.length);
			var hDay = parseInt(hebDate.substring(0, hebDate.indexOf(' ')));
			var hMonth = parseInt(hmS.substring(0, hmS.indexOf(' ')));
			var hYear = hmS.substring(hmS.indexOf(' ')+1, hmS.length);

			var hDayStr = FormatDay(hDay);
			hhebrewDate.value = hDayStr + " of " + hebMonth[hMonth+1] + ", " + hYear;

			showParashaForDayImpl(civilDate);
			var hParsha = document.getElementById("parshaShabbat_Hebrew");
			hParsha.value = strParashaName;

			var hHebYearEditBox = document.getElementById("hebYearEditBox");
			var hHebMonthList = document.getElementById("hebMonthList");
			var hHebDayList = document.getElementById("hebDayList");
			hHebYearEditBox.value = hYear;
			hHebMonthList.selectedIndex = hMonth;
			hHebDayList.selectedIndex = hDay - 1;

			Convert_Hebrew2Civil();
		}
		function showParashaForDayImpl(uDate)
		{
			//alert("showParashaForDayImpl: " + uDate);
			var bIsrael = Prefs.getPref("hcalendar.hint.showParashaInIsrael");
			var bHebrewLanguage = false;
			//var uDate = new Date();
			showParashaForDay_factory(uDate, upDateParashaAnswer, bIsrael, bHebrewLanguage);
		}

		function upDateParashaAnswer(status, parashaName)
		{
			//var hParsha = document.getElementById("parshaShabbat_Hebrew");

			if (status == 0)
			{
				strParashaName = parashaName;
				
//hParsha.value = parashaName;
				//		HCalendar.currentParashaName = parashaName;
				//		var uDate = new Date();
				//		var uShabbatDate = FindShabbat(uDate);
				//		var parashaDateKey = HCalendar.dateToStr(uShabbatDate);
				//		HCalendar.setPref("hcalendar.parashaDate", parashaDateKey);
				//		HCalendar.setPref("hcalendar.parashaName", HCalendar.currentParashaName);

				//		HCalendar.showParasha();
				//		HCalendar.forceRefresh();
			} else
			{
				strParashaName = "status: " + status;
				//hParsha.value = "Connection failed. Status = " + status;
			}
		}
