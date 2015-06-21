var CoordPaser = {};

CoordPaser.pageParserRegExp = /(id="geoMapsCoord\d*">)?\s*([N|S])\s*(\d\d*)\s*[grad|°]*\s*(\d\d*)\s*[.,]\s*(\d\d\d)'*.*?([EOW])\s*(\d\d*)\s*[grad|°]*\s*(\d\d*)\s*[.,]\s*(\d\d\d)'*\s*/gmi;

CoordPaser.degRegExp = /^(([NS-]?)\s*(\d\d)\s*[°|\s]\s*(\d\d)[.,](\d\d\d))\s*['\u2032]?[\s-:/\\]*(([EOW-]?)\s*(\d{1,3})\s*[°|\s]\s*(\d\d)[.,](\d\d\d))\s*['\u2032]?$/gmi; // DD°MM.MMMM
CoordPaser.swissRegExp = /^(\d\d\d)[\s.]*(\d\d\d)[\s\/]*\s*(\d\d\d)[\s.]*(\d\d\d)$/gmi; // ddd ddd / ddd ddd
CoordPaser.decRegExp = /^(([NS-])?\s*(\d{1,2})\.(\d{1,6}))\s*°?\s*(([EOW-])?\s*(\d{1,3})\.(\d{1,6}))\s*°?$/gmi; // DD.DDDDDD°
CoordPaser.dmsRegExp = /^(([NS-])\s*(\d{1,2})°\s*(\d{1,2})['']\s*(\d{1,2}).?(\d)*['|"|\u2033]+)\s*(([EOW-])\s*(\d{1,3})°\s*(\d{1,2})['']\s*(\d{1,2}).?(\d)*['|"|\u2033]+)/gmi; // DD°DD'DD.DD''
CoordPaser.distanceRegEx = /^(\d+'?\d*[\.|,]?\d*)([m|km]*)/gmi;
CoordPaser.degreeRegEx = /\d*[\.|,]?\d+/gmi;

CoordPaser.ParseDeg = function (degString) {
    // parse coord from format = DD°MM.MMMM (Deg)
    var myPattern = new RegExp(this.degRegExp);
    var match = myPattern.exec(degString.toString());
    if (degString.match(this.degRegExp)) {
        var coords = new Coords(new LatLon(Geo.parseDMS(match[1]), Geo.parseDMS(match[6])));
        return coords;
    }
};

CoordPaser.ParseDec = function (decString) {
    // parse coord from format = DD.DDDDDD° (Dec)
    var myPattern = new RegExp(this.decRegExp);
    var match = myPattern.exec(decString.toString());
    if (decString.match(this.decRegExp)) {
        var lat = parseFloat(match[2] + '.' + match[3]);
        var lng = parseFloat(match[5] + '.' + match[6]);
        return new Coords(new LatLon(Geo.parseDMS(match[1]), Geo.parseDMS(match[5])));
    }
};

CoordPaser.ParseDms = function (dmsString) {
    // parse coord from format = DD° DD' DD.DDD'' (Dms)
    var myPattern = new RegExp(this.dmsRegExp);
    var match = myPattern.exec(dmsString.toString());
    if (dmsString.match(this.dmsRegExp)) {
        return new Coords(new LatLon(Geo.parseDMS(match[1]), Geo.parseDMS(match[7])));
    }
};

CoordPaser.ParseSwiss = function (swissString) {
    // parse coord from format = dddddd / dddddd (swiss)
    var myPattern = new RegExp(this.swissRegExp);
    var match = myPattern.exec(swissString.toString());
    if (swissString.match(this.swissRegExp)) {
        var y = parseFloat(match[1] + match[2]);
        var x = parseFloat(match[3] + match[4]);
        var swiss = new SwissGrid(y, x);
        var lat = SwissGrid.CHtoWGSlat(y, x);
        var lon = SwissGrid.CHtoWGSlng(y, x);
        return new Coords(new LatLon(lat, lon), swiss);
    }
};

CoordPaser.ParsPoint = function (pointString) {

    var coordString = pointString.trim();
    var pattdegRegExp=new RegExp(this.degRegExp);
    var pattdecRegExp=new RegExp(this.decRegExp);
    var pattswissRegExp=new RegExp(this.swissRegExp);
    var pattdmsRegExp=new RegExp(this.dmsRegExp);

    if (pattdegRegExp.test(coordString)) {
        return ParseDeg(coordString);
    } else if (pattdecRegExp.test(coordString)) {
        return ParseDec(coordString);
    } else if (pattswissRegExp.test(coordString)) {
        return ParseSwiss(coordString);
    } else if (pattdmsRegExp.test(coordString)) {
        return ParseDms(coordString);
    }
};