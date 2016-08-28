		var Prefs = new HCalendar_PrefManager();
		function getPref(strID) { return Prefs.getPref(strID); }
		function setPref(strID, varValue) { Prefs.setPref(strID, varValue); }
		function getElement(strID) { return document.getElementById(strID); }
		
		function onLoad() {
			centerWindowOnScreen();
		}		
		function onAccept() {
			return true;
		}
		function _insertLetter(letter) 
		{
			//insert letters typed on virtual keyboard
			var el = document.getElementById("phraseEditBox");
			//grab current text in search box
			var str = el.value;
			//get pointers to where cursor is or what parts of the text is selected
	  
			//el = el.boxObject.QueryInterface(Components.interfaces.nsIEditor).element.inputField;  //special for editable menulist
			el = el.inputField;
	  
			var selstart = el.selectionStart;  //returns either cursor location or left edge of selection
			var selend = el.selectionEnd;  //returns either cursor location or right edge of selection
  
			//cut the string in 2 pieces and insert the new letter in the middle
			el.value = str.substring(0, selstart) + letter + str.substring(selend);
			el.focus();
			//move cursor to after inserted letter
			el.selectionStart = el.selectionEnd = selstart + 1;
	  	}		
		function AddChar(hebrew_letter)
		{
			_insertLetter(hebrew_letter);
			//var hphraseEditBox = document.getElementById("phraseEditBox");
			//hphraseEditBox.value = hphraseEditBox.value + hebrew_letter;
		}
		function CalculateGematriya()
		{
			var hphraseEditBox = document.getElementById("phraseEditBox");
			var hgematriyaValue = document.getElementById("gematriyaValue");

			var inputValue = hphraseEditBox.value;
			var phraseString = inputValue;
			var geoValue = 0;
			for (var i=0; i<phraseString.length; i++){
				var uniSymbol = phraseString.charCodeAt(i);

				// Aleph - Yod
				if (uniSymbol >= 0x05D0 && uniSymbol <= 0x05D9)
					geoValue += uniSymbol - 0x05D0 + 1;
				// Kaf
				if (uniSymbol == 0x05DA || uniSymbol == 0x05DB)
					geoValue += 20;
				// Lamed
				if (uniSymbol == 0x05DC)
					geoValue += 30;
				// Mem
				if (uniSymbol == 0x05DD || uniSymbol == 0x05DE)
					geoValue += 40;
				// Nun
				if (uniSymbol == 0x05DF || uniSymbol == 0x05E0)
					geoValue += 50;
				// Samekh
				if (uniSymbol == 0x05E1)
					geoValue += 60;
				// Ayin
				if (uniSymbol == 0x05E2)
					geoValue += 70;
				// Pe
				if (uniSymbol == 0x05E3 || uniSymbol == 0x05E4)
					geoValue += 80;
				// Tsadi
				if (uniSymbol == 0x05E5 || uniSymbol == 0x05E6)
					geoValue += 90;
				// Kof - Tav
				if (uniSymbol >= 0x05E7 && uniSymbol <= 0x05EA)
					geoValue += (uniSymbol - 0x05E7 + 1) * 100;
			}
			hgematriyaValue.value = geoValue;
		}
//		function convertHebrew(txt) 
//		{
//    			var p=txt; var q="";
//    			for(i=0; i< p.length; i++) {
//        			j=p.charCodeAt(i);
//        			q+=(j<1488||j>1600)?String.fromCharCode(j-1270):j;
//        		}
//    			return q;
//		}
//		function convertHebrew(txt) 
//		{
//    			var p=txt; var q="";
//    			for(i=0; i< p.length; i++) {
//        			j=p.charCodeAt(i);
//        			q+=(j<1488||j>1600)?p.charAt(i):String.fromCharCode(j-1270);
//        		}
//    			return q;
//		}
