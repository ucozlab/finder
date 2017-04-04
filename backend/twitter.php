<?php

//This is all you need to configure.
$app_key = '3nnMcXVV5JIGanoGTJtTiSKyb';
$app_token = 'WPcdzaXvT6sQxW9JhHTOT0MJXb0gv5WlrN5FgTGRsqD0xIJDQz';
$bearer_token = 'AAAAAAAAAAAAAAAAAAAAAMDGzwAAAAAA31UFI8YeZgztGIfCsLnG9A5XJhY%3DvhrE3d3Ajlx5Wx06yuJ9gI6C8d13GBB5VuyqvOBDagKbJdpvpY';

//These are our constants.
$api_base = 'https://api.twitter.com/';
$bearer_token_creds = base64_encode($app_key.':'.$app_token);

//Get a bearer token.
$opts = array(
  'http'=>array(
    'method' => 'POST',
    'header' => 'Authorization: Basic '.$bearer_token_creds."\r\n".
               'Content-Type: application/x-www-form-urlencoded;charset=UTF-8',
    'content' => 'grant_type=client_credentials'
  )
);

if(isset($_POST)) {
    $context = stream_context_create($opts);
    $json = file_get_contents($api_base.'oauth2/token',false,$context);

    $result = json_decode($json,true);

    if (!is_array($result) || !isset($result['token_type']) || !isset($result['access_token'])) {
        die("Something went wrong. This isn't a valid array: ".$json);
    }

    if ($result['token_type'] !== "bearer") {
        die("Invalid token type. Twitter says we need to make sure this is a bearer.");
    }

//Set our bearer token. Now issued, this won't ever* change unless it's invalidated by a call to /oauth2/invalidate_token.
//*probably - it's not documentated that it'll ever change.
    $bearer_token = $result['access_token'];

    /*$opts2 = array(
        'http'=>array(
            'method' => 'GET',
            'header' => 'Authorization: Bearer '.$bearer_token
        )
    );
    $context = stream_context_create($opts);
    $json = file_get_contents($api_base.'1.1/search/tweets.json?q='.$_POST.'&result_type=recent');
    $tweets = json_decode($json,true);*/

    echo $_POST;
    return true;
}


//Try a twitter API request now.
/*$opts = array(
  'http'=>array(
    'method' => 'GET',
    'header' => 'Authorization: Bearer '.$bearer_token
  )
);

$context = stream_context_create($opts);
$json = file_get_contents($api_base.'1.1/statuses/user_timeline.json?count=1&screen_name=lgladdy',false,$context);

$tweets = json_decode($json,true);

echo "@lgladdy's last tweet was: ".$tweets[0]['text']."\r\n";*/

return true;
?>