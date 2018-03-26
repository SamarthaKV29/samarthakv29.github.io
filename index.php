<?php
$ch = curl_init('https://urlxray.expeditedaddons.com/?api_key=20NPDES854TL7B9MOH5RYQW730FV816U6G1XAC4ZJI92K3&url=http://www.wikipedia.org&fetch_content=false');

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
header( 'Location: /index.html' ) ;  


?>

