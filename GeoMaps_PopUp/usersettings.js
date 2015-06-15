// Core.LogOut("UserSettings : " + new Date());

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