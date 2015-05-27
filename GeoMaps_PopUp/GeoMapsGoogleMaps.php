<?php
	$decoded = json_decode($_POST['googleMapsParams']);	
	
	for($i=0;$i<count($decoded->{'waypoints'});$i++)
   {
		// echo '<br>out : ' . $decoded->{'waypoints'}[$i]->{'lat'} . " : " . $decoded->{'waypoints'}[$i]->{'lon'};
   }
   
   function getTypeString($type){ 
   if($type == 1) return ('Distanzberechnung');
    if($type == 2) return ('Projektion');
	} 
?>
<html>
<head>
<title>Google Map</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
<style type="text/css">
	body {
		font-family: VerdanaVerdana, Geneva, Arial, Helvetica, sans-serif;
		font-size: 12px;
	}
	h1 {
		font-family: VerdanaVerdana, Geneva, Arial, Helvetica, sans-serif;
		font-size: 14px;
	}	
	.lnk {
		font-family: VerdanaVerdana, Geneva, Arial, Helvetica, sans-serif;
		font-size: 11px;
	}
	#map-canvas {
	        height: 100%;
	        margin: 0px;
	        padding: 0px
	      }
</style>

<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>


<!-- <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAjqVP3ae94BljbTCpxd-m5ofM2IgNSJR8&sensor=false"></script>-->
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<link href="http://code.google.com/apis/maps/documentation/javascript/examples/default.css" rel="stylesheet" type="text/css" /> 
<script type="text/javascript">
	

	function initMap()
	{
	  $(document).ready(function() { 
		initialize();
	  });
	}

  function initialize() {	
	var	mode =  <?php echo $decoded->{'type'} ?>;
	
	var lat1 = parseFloat(<?php echo $decoded->{'waypoints'}[0]->{'lat'} ?>), lon1 = parseFloat(<?php echo $decoded->{'waypoints'}[0]->{'lon'} ?>);
    var p1 = new google.maps.LatLng(lat1,lon1);
		
	var lat2; 	
	if(mode > 0){
		lat2 = parseFloat(<?php echo $decoded->{'waypoints'}[1]->{'lat'} ?>), lon2 = parseFloat(<?php echo $decoded->{'waypoints'}[1]->{'lon'} ?>);	
	}	
	
    var myOptions = {
      center: p1,
      zoom: 4,      
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

	var marker1 = new google.maps.Marker({
        position: p1,
        map: map,
        title: '<?php echo $decoded->{'waypoints'}[0]->{'description'} ?>',
		icon: 'images/GoogleMarker.png'
    });
	var contentStringP1 = '<div id="content"><div id="siteNotice"></div>'+
        '<h1 id="firstHeading" class="firstHeading"><?php echo $decoded->{'waypoints'}[0]->{'title'} ?></h1>'+
        '<div id="bodyContent"><p><?php echo $decoded->{'waypoints'}[0]->{'description'} ?></p></div></div>';				        
    var infowindowP1 = new google.maps.InfoWindow({
        content: contentStringP1
    });	
	
	// Add circle overlay and bind to marker
	var circle = new google.maps.Circle({
	  map: map,
	  radius: 5,    // metres
	  fillColor: '#AA0000'
	});
	circle.bindTo('center', marker1, 'position');
	
	infowindowP1.open(map,marker1);
	google.maps.event.addListener(marker1, 'click', function() { infowindowP1.open(map,marker1);});


	if(mode > 0)
	{
		var p2 = new google.maps.LatLng(lat2,lon2);
		var marker2 = new google.maps.Marker({
       		position: p2,
       		map: map,
        	title: '<?php echo $decoded->{'waypoints'}[1]->{'description'} ?>',
			icon: 'images/GoogleMarker.png'
		 });
			var contentStringP2 = '<div id="content"><div id="siteNotice"></div>'+
        '<h1 id="firstHeading" class="firstHeading"><?php echo $decoded->{'waypoints'}[1]->{'title'} ?></h1>'+
        '<div id="bodyContent"><p><?php echo $decoded->{'waypoints'}[1]->{'description'} ?></p></div></div>';				        
    var infowindowP2 = new google.maps.InfoWindow({
        content: contentStringP2
    });	
	infowindowP2.open(map,marker2);
	google.maps.event.addListener(marker2, 'click', function() {
      infowindowP2.open(map,marker2);
    });

		
		
		var bounds = new google.maps.LatLngBounds(p1,p2);
		map.fitBounds(bounds);   
	}
	
    var flightPlanCoordinates = [
    p1,
    p2
    ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

   	flightPath.setMap(map);	
  }
  
  
  function initialize2() {
  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  });
}


google.maps.event.addDomListener(window, 'load', initMap);

</script>
</head>




<body> 
<table width="100%" border="0" cellspacing="0" cellpadding="2">
  <tr>
    <td width="1%"><img src="images/Logo_24.png" width="24" height="24" alt="GeoMaps - Logo" /></td>
    <td><b>GeoMaps - <?php echo getTypeString($decoded->{'type'}); ?></b>&nbsp;&nbsp;<a class="lnk" href="http://www.c-dev.ch/geomaps">GeoMaps - Webseite</a></td>
  </tr>
</table>
<!--<?php echo '<br>Control Output : ' . $_POST["googleMapsParams"]; ?>-->
<div id="map-canvas"></div>
</body>
</html>
