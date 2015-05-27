<?php
/*

UserFrosting Version: 0.2.2
By Alex Weissman
Copyright (c) 2014

Based on the UserCake user management system, v2.0.2.
Copyright (c) 2009-2012

UserFrosting, like UserCake, is 100% free and open-source.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

require_once("../models/config.php");

// Request method: GET
$ajax = checkRequestMode("get");

if (!securePage(__FILE__)){
    apiReturnError($ajax);
}

setReferralPage(getAbsoluteDocumentPath(__FILE__));

?>

<!DOCTYPE html>
<html lang="de">
<?php
echo renderAccountPageHeader(array("#SITE_ROOT#" => SITE_ROOT, "#SITE_TITLE#" => SITE_TITLE, "#PAGE_TITLE#" => "Dashboard GeoMaps Web"));
?>

<body>

<div id="wrapper">

    <!-- Sidebar -->
    <?php
    echo renderMenu("dashboard");
    ?>

    <div id="page-wrapper">
    	
        <div class="row">
            <div id='display-alerts' class="col-lg-12">

            </div>
        </div>

<div class="jumbotron">
  <h1>GeoMaps 2 Pro!</h1>
  
  <?php if(PermissionValidators::isLoggedInUserInGroup(3))  { ?>
	<h2> Hallo BETA Tester </h2>
	<?php } else { ?>
	<h2> Hallo Besucher </h2>		
	<p>
		Willkommen auf dem GeoMaps Web.
		</p>
		<p>
			<b>Du bist nicht als BETA-Tester eingetragen, aus diesem Grund hast Du keinen Zugriff auf die Karte und den GeoMaps Script Download.</b>
			</p>
	
	<?php }  ?>
  
  <p>Auf der GeoMaps Web Platform wird GeoMaps 2 Pro entwickelt und getestet. GeoMaps Web kann von registrierten BETA-Testern genutzt werden.</p>
  <p>Es ist geplant, dass der Zugang zur Released GeoMaps Pro Karte gegen eine einmalige Gebühr ermöglicht wird.</p>
  <p>&nbsp;</p>
  <p>Du hast Fragen, oder möchtest BETA Tester sein? Dann melde Dich bitte auf <a href="mailto:geomapsweb@c-dev.ch">geomapsweb@c-dev.ch</a> oder im <a href="http://c-dev.ch/category/geomaps" role="button">GeoMaps Blog</a>.</p>
  
  <?php if(PermissionValidators::isLoggedInUserInGroup(3))  { ?>  
                  <div class="text-left"><br/>
                  <a href="http://www.c-dev.ch/sdm_downloads/geomaps-2-pro/">GeoMaps Pro 2.0.0 BETA Greasemonkey Script Download <i class="fa fa-arrow-circle-right"></i></a><br/>
                  Für den Download das Passwort verwenden: <b>testGeoMP2b</b>
                  <p>Der Download des Scripts und das Passwort sind persönlich und dürfen nicht weitergegeben werden!</p>
                </div>  
<?php } ?>                
  <p>&nbsp;</p>
  <p><a class="btn btn-primary btn-lg" href="http://c-dev.ch/category/geomaps" role="button">Mehr lesen im Blog</a></p>
</div>

						<div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="panel-title">Diskussionen</h3>
              </div>
              <div class="panel-body"> 

<iframe id="forum_embed"
  src="javascript:void(0)"
  scrolling="no"
  frameborder="0"
  width="100%"
  height="700">
</iframe>
<script type="text/javascript">
  document.getElementById('forum_embed').src =
     'https://groups.google.com/forum/embed/?place=forum/geomaps'
     + '&showsearch=true&showpopout=true&showtabs=false'
     + '&parenturl=' + encodeURIComponent(window.location.href);
</script> 
</div>
</div>
						<div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="panel-title">Versionshistory</h3>
              </div>
              <div class="panel-body">            	
                <br/>
              	<b>v. 2.0.0</b>(19.05.2015)<br/>
                <ul class="list-group">
								  <li class="list-group-item">GeoMaps Planner arbeitet mit GeoMaps PopUp auf geocaching.com zusammen</li>
								  <li class="list-group-item">Koordinaten erstellen, bearbeiten und löschen</li>								  
								  <li class="list-group-item">Koordinaten Umrechnung WGS83 - LV95</li>
								  <li class="list-group-item">Koordinaten(-Zahl) Genauigkeit Signalisation</li>		
								  <li class="list-group-item">Koordinaten Projektion</li>								  
								  <li class="list-group-item">Projektionsdistanzen und Richtungen werden f. jede Koordinaten angezeigt</li>
								  <li class="list-group-item">Projektions-Linie kann angezeigt werden</li>
								</ul>

              </div>
            </div>
            	
            		<!--
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title"><i class="fa fa-clock-o"></i> Letzte Aktivitäten</h3>
                    </div>
                    <div class="panel-body">
												<div class="list-group">
                            <a href="#" class="list-group-item">
                                <span class="badge">18.05.2015</span>
                                <i class="fa fa-calendar"></i> GreaseMonkey Script GeoMaps 2 Pro zum Download bereit für registrierte BETA Test
                            </a>
                        </div>                    	
                        <div class="list-group">
                            <a href="#" class="list-group-item">
                                <span class="badge">04.05.2015</span>
                                <i class="fa fa-calendar"></i> GeoMaps Web aufgeschaltet
                            </a>
                        </div>
                        <div class="text-right">
                            <a href="#">View All Activity <i class="fa fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                </div> -->
            </div>
        </div><!-- /.row -->

    </div><!-- /#page-wrapper -->

</div><!-- /#wrapper -->

<script>
    $(document).ready(function() {
        alertWidget('display-alerts');
    });
</script>
</body>
</html>


