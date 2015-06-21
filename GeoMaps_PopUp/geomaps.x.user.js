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

if (window.top != window.self) { return; } //don't run on frames or iframes
$ = jQuery.noConflict(true);

// region UserSettings load, save delete

function UserSettings() {
    this.OptionList = new Options();
    function Options() {
        this.HighlightCoordinate = true;
        this.HighlightCoordinateMaster = true;
        this.SendTo = true;
        this.CacheInfoHideUMT = true;
        this.CacheInfoHideOther = true;
        this.MapGoogle = true;
        this.MapTopoDe = true;
        this.MapMapGeoAdmin = true;
        this.MapMapPlus = true;
        this.MapMapSearch = true;
        this.MapGeocaching = true;
        this.Format1 = '[deg.lat.p] [deg.lat.d]° [deg.lat.mv].[deg.lat.mn:3]\u2032 [deg.lon.p] [deg.lon.d]° [deg.lon.mv].[deg.lon.mn:3]\u2032';
        this.Format2 = '[swi.x:0-3] [swi.x:3-6] / [swi.y:0-3] [swi.y:3-6]';
        this.Format3 = '[dec.lat.p] [dec.lat.v].[dec.lat.n:6]° [dec.lon.p] [dec.lon.v].[dec.lon.n:6]°';
        this.Format4 = '[dms.lat.p] [dms.lat.d]° [dms.lat.m]\u2032[dms.lat.s].[dms.lat.z:2]\u2033 [dms.lon.p] [dms.lon.d]° [dms.lon.m]\u2032[dms.lon.s].[dms.lon.z:2]\u2033';
        this.Format1Show = false;
        this.Format2Show = true;
        this.Format3Show = true;
        this.Format4Show = true;
        this.CalculatorAsSidePop = true; // true = default, false = sidebox
        this.SelectClickMap = 0;
        this.Position=10;
        this.Language=0;
    };
};

UserSettings.prototype.Save = function () {
    GM_setValue('UserSettings', JSON.stringify(this.OptionList));
};

UserSettings.prototype.Load = function() {
    var tmpUserSettings = new UserSettings();
    if (GM_getValue('UserSettings') != undefined) {
        tmpUserSettings.OptionList = JSON.parse(GM_getValue('UserSettings'));
    }
    Core.LogOut(JSON.stringify(tmpUserSettings));
    return tmpUserSettings;
};

UserSettings.prototype.Delete = function() {
    GM_deleteValue("UserSettings");
    GM_setValue('SUC_last_update', -86400000);
};

var currentUserSettings = new UserSettings();
currentUserSettings.Load();

//endregion

function ExtendLocationDataDiv(insertElement) {

    var cacheInfoArea = $('#ctl00_ContentBody_LocationSubPanel'); // Cache-Info Bereich -> span mit UTM Kooridnate
    var cacheCoordinate = $('#uxLatLon'); // span-tag mit der Cache-Koodinate (original, oder umgerechnet, je nachdem was aktiv ist!)

    // Gemäss Konfiguration Elemente ausblenden
    if (currentUserSettings.OptionList.CacheInfoHideUMT) cacheInfoArea.empty();
    if (currentUserSettings.OptionList.CacheInfoHideOther) $('#ctl00_ContentBody_lnkConversions').remove();

    try {
        Core.LogOut(cacheCoordinate.text());
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

