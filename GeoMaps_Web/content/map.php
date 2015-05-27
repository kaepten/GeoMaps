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
echo renderAccountPageHeader(array("#SITE_ROOT#" => SITE_ROOT, "#SITE_TITLE#" => SITE_TITLE, "#PAGE_TITLE#" => "Karte"));
?>

<body>

<div style="background-color: #006dcc; top: 50px; bottom: 0px; width: 100%; position: absolute; ">

    <!-- Sidebar -->
    <?php
    echo renderMenu("dashboard", true);
    ?>

    <iframe src="../fragments/GeoMapsPlanner.php" HEIGHT="100%" WIDTH="100%"></iframe>


</div><!-- /#wrapper -->

<script>
    $(document).ready(function() {
        alertWidget('display-alerts');
    });
</script>
</body>
</html>


