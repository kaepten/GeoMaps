<?php
	$decoded = json_decode($_POST['googleMapsTopoDeParams']);	
	
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
    <title>GeoMaps - outdooractive platform</title>
    
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
	#map_canvas {
	        height: 100%;
	        margin: 0px;
	        padding: 0px
	      }
</style>
    
  </head>
  <body>
<table width="100%" border="0" cellspacing="0" cellpadding="2">
  <tr>
    <td width="1%"><img src="images/Logo_24.png" width="24" height="24" alt="GeoMaps - Logo" /></td>
    <td><b>GeoMaps - <?php echo getTypeString($decoded->{'type'}); ?></b>&nbsp;&nbsp;<a class="lnk" href="http://www.c-dev.ch/geomaps">GeoMaps - Webseite</a></td>
  </tr>
</table>

    <div id="map_canvas"></div>

    <script type="text/javascript">
    	   	
      function initOAX() {
      	
					var	mode =  <?php echo $decoded->{'type'} ?>;
					
					var lat1 = parseFloat(<?php echo $decoded->{'waypoints'}[0]->{'lat'} ?>), lon1 = parseFloat(<?php echo $decoded->{'waypoints'}[0]->{'lon'} ?>);
				    var p1 = new google.maps.LatLng(lat1,lon1);
						
					var lat2; 	
					if(mode > 0){
						lat2 = parseFloat(<?php echo $decoded->{'waypoints'}[1]->{'lat'} ?>), lon2 = parseFloat(<?php echo $decoded->{'waypoints'}[1]->{'lon'} ?>);	
					}		
				      	
      	
          // call the outdooractive maps api initialization method with a callback function
          oax.api.maps(
              function (maps, gm) {
          
          	// list all outdooractive maps you want to enable
          	var mapTypeIds = ['alpstein_map', 'alpstein_hybrid', gm.MapTypeId.SATELLITE, 'alpstein_map_winter', gm.MapTypeId.TERRAIN];
          
          	// set map center, zoom level, map types and more
          	var config = {
                      center : p1,
                      zoom : 15,
                      mapTypeId : mapTypeIds[ 0 ],
                      mapTypeControlOptions : { mapTypeIds: mapTypeIds }
                  };
                    	// instatiate a new outdooractive map
          	// params: dom id of map canvas div, configuration object
          	var map = new maps.Map( document.getElementById("map_canvas"), config );
			  
				  	var marker1 = new google.maps.Marker({
			        position: p1,
			        map: map,
			        title: '<?php echo $decoded->{'waypoints'}[0]->{'description'} ?>',
							icon: 'images/GoogleMarker.png'
				    });
				  
				  
          
          
          

          });
      }
      
      function loadScripts() {
      
          var documentHead = document.head  ||  document.getElementsByTagName('head')[0];
      
          // load google maps API
          var element = document.createElement('script');
      
          element.setAttribute('type', 'text/javascript');
          element.setAttribute('src',  "http://www.google.com/jsapi?autoload={'modules':[{name:'maps',version:3.13,callback:'isNaN',other_params:'sensor=false'},{name:'earth',version:1,callback:'isNaN'}]}");
      
          documentHead.appendChild(element);
      
          // load outdooractive javascript API
          element = document.createElement('script');
      
          element.setAttribute('type', 'text/javascript');
          element.setAttribute('src',  "http://www.outdooractive.com/alpportal/oax_head.js?build=mobile&proj=api-dev-oa&key=yourtest-outdoora-ctiveapi&callback=initOAX");
      
          documentHead.appendChild(element);
      }
      
      window.onload = loadScripts;
    </script>

  </body>
</html>