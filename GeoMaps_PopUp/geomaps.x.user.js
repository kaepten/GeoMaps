// ==UserScript==
// @name		GeoMaps_Proto
// @namespace	http://www.c-dev.ch/
// @version 	2.1.0
// @date	 	15.06.2015
// @author		neisgei
// @description	GeoMaps - Karten und Koordinaten umrechnen
// @run-at      document-end
// 
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/jquery-1.11.3.min.js
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/geo.js
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/latlon.js
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/wgs84_ch1903.js
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/core.js
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/language.js
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/GeoMaps_PopUp.js
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/usersettings.js
//
// @require		http://www.c-dev.ch/geocaching/greasemonkey/geomaps/2.0/jquery.ezpz_tooltip.js
//
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_listValues
// @grant       GM_getResourceURL
//
// ==/UserScript==


//region Geocaching.com Seitenelemente, evtl. Änderungen unterworfen



//endregion

if (window.top != window.self) { return; } //don't run on frames or iframes
$ = jQuery.noConflict(true);

var currentUserSettings;

// region UserSettings load, save delete

UserSettings.prototype.Save = function () {
    GM_setValue('UserSettings', JSON.stringify(this.OptionList));
};

UserSettings.Load = function() {
    tmpUserSettings = new UserSettings();
    if (GM_getValue('UserSettings') != undefined) {
        tmpUserSettings.OptionList = JSON.parse(GM_getValue('UserSettings'));
    }
    // Core.LogOut(JSON.stringify(tmpUserSettings));
    return tmpUserSettings;
};

UserSettings.Delete = function() {
    GM_deleteValue("UserSettings");
    GM_setValue('SUC_last_update', -86400000);
};

currentUserSettings = UserSettings.Load();

//endregion

function ExtendLocationDataDiv(insertElement) {

    var cacheInfoArea = $('#ctl00_ContentBody_LocationSubPanel'); // Cache-Info Bereich -> span mit UTM Kooridnate
    var cacheCoordinate = $('#uxLatLon'); // span-tag mit der Cache-Koodinate (original, oder umgerechnet, je nachdem was aktiv ist!)

    // Gemäss Konfiguration Elemente ausblenden
    if (currentUserSettings.OptionList.CacheInfoHideUMT) cacheInfoArea.empty();
    if (currentUserSettings.OptionList.CacheInfoHideOther) $('#ctl00_ContentBody_lnkConversions').remove();

    try {
        // Core.LogOut(cacheCoordinate.text());
        Core.LogOut(Geo.parseDMS(cacheCoordinate.text()));



        // var coords = ParseDeg(cacheCoordinate);
        // InsertCoordinates(coords, cacheInfoArea, 99995, true);

        /*
         var latLon = point.LatLon();
         insertElement.prepend(Core.Format(html_infoCoord, languageString.SymbDms, Core.Format(html_coordDms, latLon.toFormat('dms', 2))));
         insertElement.prepend(Core.Format(html_infoCoord, languageString.SymbDec, Core.Format(html_coordDec, latLon.toFormat('d', 6))));
         if (point.SwissGrid().Y() >= 485000 && point.SwissGrid().Y() <= 835000 && point.SwissGrid().X() >= 75000 && point.SwissGrid().X() <= 300000) {
         var swissGrid = point.SwissGrid();
         insertElement.prepend(Core.Format(html_infoCoord, languageString.SymbSwiss, Core.Format(html_coordSwiss, swissGrid.toFormat('f'))));
         }
         */
    }
    catch(err)
    {
        Core.LogOut(err);
    }
}


$(document).ready(
    function() {
        ExtendLocationDataDiv();

    }
);

Core.LogOut(" ## Script - Ende ## ");

