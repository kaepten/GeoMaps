// Core.LogOut("GeoMaps_PopUp : " + new Date());

if (window.top != window.self) {
    // return;
    throw new FatalError("Something went badly wrong!");
} //don't run on frames or iframes
$ = jQuery.noConflict(true);

var appName = "GeoMaps";
var versionsNummer = '2.1.0 BETA';
var projektHomepage = 'http://www.c-dev.ch/geomaps';

//region geocaching.com spezifische Elemente und Funktionen

var el_GC_cacheCoordinate = $('#uxLatLon'); // span-tag mit der Cache-Koodinate (original, oder umgerechnet, je nachdem was aktiv ist!)
var hasCorrectedCoordinates = true;
var cacheCoordinate = el_GC_cacheCoordinate.text(); // Cache-Info Bereich Startkoordinaten-String

//endregion

//region Element Definitions

var elc_coordinate = 'geoMapsPopUpCoord';
var elc_coordPopUp = 'geoMapsPopUp';

//endregion

//region CSS

Core.AddCSS('.coordWrap { background-color: #ffffa1;  border-bottom: 1px dashed #d1d200;  border-top: 1px dashed #d1d200; }');
Core.AddCSS('.coordWrapCorrected { background-color: #ffe6dd;  border-bottom: 1px dashed #D7B9BE;  border-top: 1px dashed #D7B9BE; }');

Core.AddCSS('.' + elc_coordPopUp + '-content {font: 10px "Verdana"; text-align:left; margin-left:10px; display: none; position: absolute; padding: 10px; border: 1px solid; border-color:#826f00; background-color: #ffffd2; z-index:999; color:black;}');
Core.AddCSS('.' + elc_coordPopUp + '-content table, .' + elc_coordPopUp + '-content td {margin-bottom: 0.0em; line-height: 1.0; padding:1px;}');


//endregion

//region Images

var img_coordPopUp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMTAvMjEvMTAJEOK6AAAB9UlEQVQokWWSTUjTYQCHn/fddJu6lTPUbCgxpCRwCzLq0Bde1qVDXaLIQgIxtGOHOtYp6BBEHTpFCOUhyk3JPhBkmkWkppZL2tS2uTbmNqfuw/3/b4eggx2ey4/n9ntQSrEdUIb/9vd3783faFsVfwVoPz8q3Ye0noIeOpvXo/XLqbVcaNk09rqjccxZnuicGPIeH3g7fV8opejzRnakNkOjtoZ3reaGl1htOeyxFqyTB9ivR1iZneDRcGD4zozyGAF+Rr89OXxqtFU3D9BsbMIx6cTyIw6/n0E2zsjsFlMF2wMA45Wb/muutqkzytLHvqFmnKtlkPVBKghCEds0M5avYNByzAP4jMm16O0GZ0BYdxf44nyDGJc4yi2Um40gJP6QYs/FDWr60yeEAJneWLMnkksE59JEqw1MdxuIoqOVKljJmljYpWFuKSFzOTMg5eLS1oe8bsXtkjjqJHuPCGZ6S8S0Ip8DRWou6SBNZBIyrhS6DAfpetFvzwSXS/wK6IQWFaEtxccLRb47CmxUa7x6bKcYNjwHEEopRNP17qOeqYdXu/xYqhS5dUmZDSJBnXFfNd6njjmZ1t2ami39O07UXu5pPBi+5XIt1tfWrZOMCeanrYX5T1WDZLROpb5mALYl0eGm8twIO08rKtujcLJ3eyJ/AERyEA4mIUEAAAAAAElFTkSuQmCC";

//endregion

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
}

var currentUserSettings = new UserSettings();

//endregion

//region HTML Fragmente

var html_coordinateWrapString       = '&nbsp;<span id=\"' + elc_coordinate + '{0}\">{1}</span>&nbsp;';
var html_coordinateWrapStringMaster = '<span id=\"' + elc_coordinate + '{0}\">{1}</span>';
var html_popUpDiv                   = '<div class="' + elc_coordPopUp + '-content fancy" id="' + elc_coordPopUp + '-content-{0}"></div>';
var html_popUpImage = '{2}<img class=\"' + elc_coordPopUp + '-target\" src=\"{0}\" id=\"' + elc_coordPopUp + '-target-{1}\" hspace="3">';
var html_footerLink                 = Core.Format('<div style="font-size:10px; padding-left:2px; padding-top:5px;"><a href="{0}" target="_blank" class="lnkGeoMaps">{1} {2}</a></div>',projektHomepage, appName, versionsNummer);

//endregion

var parsePageCoords = [];

function ParsePageCoords() {

    $.fn.egrep = function(pat) {
        var out = [];
        var lastParent;
        var textNodes = function(n) {
            if (n.nodeType == 3) {
                Core.LogOut(n.nodeValue);
                // Core.LogOut(pat.test(n.nodeValue));
                var t = typeof pat == 'string' ? n.nodeValue.indexOf(pat) != -1 : pat.test(n.nodeValue);
                if (t) {
                    Core.LogOut("P.Node: " + n.parentNode.nodeValue);
                    if (lastParent == undefined || lastParent != n.parentNode) {
                        lastParent = n.parentNode;
                        out.push(n.parentNode);
                    }
                }
            }
            else {
                $.each(n.childNodes, function(a, b) {
                    textNodes(b);
                });
            }
        };
        this.each(function() {
            textNodes(this);
        });
        return out;
    };

    var n = $('body').egrep(CoordPaser.pageParserRegExp);
    var popIndex = 0;
    for (var i = 0; i < n.length; ++i) {
        try {
            var coordText = ($(n[i]).html());
            var validCoordinates = coordText.match(CoordPaser.pageParserRegExp);
            var replaceHtml = $(n[i]).html();

            for (var ii = 0; ii < validCoordinates.length; ++ii) {
                replaceHtml = WrapCoodinate(replaceHtml, validCoordinates[ii], popIndex);
                parsePageCoords.push(validCoordinates[ii].trim());
                popIndex++;
            }
            $(n[i]).html(replaceHtml);
        } catch(err) {
            // GM_log('## ERROR ## ' + coordText);
            // GM_log(err);
        }
    }

    for (var cordsIndex = 0; cordsIndex < parsePageCoords.length; cordsIndex++) {
        InsertPopUp(cordsIndex, parsePageCoords[cordsIndex]);
    }

    for (var iP = 0; iP < popIndex; ++iP) {
        var coord = $('#' + elc_coordinate + iP).text().trim();
        $('#' + elc_coordinate + iP).html(Core.Format(html_popUpImage, img_coordPopUp, iP, coord));
        if (currentUserSettings.OptionList.HighlightCoordinate) {
            if (el_GC_cacheCoordinate.children('span').attr('id') == elc_coordinate + iP) {
                if (currentUserSettings.OptionList.HighlightCoordinateMaster) {
                    if (hasCorrectedCoordinates) {
                        $('#' + elc_coordinate + iP).addClass('coordWrapCorrected');
                    }
                    else {
                        $('#' + elc_coordinate + iP).addClass('coordWrap');
                    }
                }
            } else {
                $('#' + elc_coordinate + iP).addClass('coordWrap');
            }
        }
    }

    $('.' + elc_coordPopUp + '-target').ezpz_tooltip({
        // contentPosition: 'rightStatic',
        stayOnContent: true,
        offset:-10
    }); // configuration of pop-up
}

function WrapCoodinate(replaceHtml, coordString, popIndex) {
    if (cacheCoordinate && popIndex == 0) {
        return replaceHtml.replace(coordString, Core.Format(html_coordinateWrapStringMaster, popIndex, coordString));
    }
    return replaceHtml.replace(coordString, Core.Format(html_coordinateWrapString, popIndex, coordString));
}

function InsertPopUp(popIndex, coordinate) {
    $('body').append(Core.Format(html_popUpDiv, popIndex));
    var elem = $('#' + elc_coordPopUp + '-content-' + popIndex);
    var coords = CoordPaser.ParseDeg(coordinate.trim());
        // InsertCoordinates(coords, elem, popIndex);
        // InsertSendTo(coords, elem, popIndex);
        // InsertMaps(coords, null, elem, popIndex);
    elem.append(html_footerLink);
}



$(document).ready(
    function() {
        ParsePageCoords();
    }
);
