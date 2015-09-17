<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="css/master.php?path=main.css&min=true" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <div class="logo link" href="http://www.lavancier.com/">
      L<span style='letter-spacing: -4pt'>A</span><span style='letter-spacing: -4.5pt'>V</span>ANCI<span style='letter-spacing: -1pt'>ER</span>
    </div>
    <canvas id="myCanvas" width="2000" height="1200"></canvas>
    <h1>Highlighted Car</h1>
    <div class="city-section" style="width: 500px; margin: 0 auto; float: none">
      <h2>Highlighted Sample Car</h2>
      <div id="special-car">
        <p id="special-car-stats">

        </p>
      </div>
    </div>
    <h1>Route Use Statistics</h1>
    <div id="city-stats">

    </div>

    <script src="js/ecosystem.js" charset="utf-8"></script>
    <script src="js/findRoute.js" charset="utf-8"></script>
    <script src="js/cities.js" charset="utf-8"></script>
    <script src="js/latlong.js" charset="utf-8"></script>
    <script src="js/drawing.js" charset="utf-8"></script>
    <script src="js/print.js" charset="utf-8"></script>
    <script src="js/cars.js" charset="utf-8"></script>
    <script src="js/init.js" charset="utf-8"></script>
    <script src="js/us-data.js" charset="utf-8"></script>
    <script src="js/europe-data.js" charset="utf-8"></script>
    <script src="js/master.js" charset="utf-8"></script>
  </body>
</html>
<script type="text/javascript">
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
var num = "<?php echo base64_encode($_SERVER['REMOTE_ADDR']); ?>";
ga('create', 'UA-56819347-1', 'auto');
ga('send', 'pageview');
</script>
