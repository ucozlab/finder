<?php

if (file_exists('../vendor/vimeo/vimeo-api/autoload.php')) {
	require_once('../vendor/vimeo/vimeo-api/autoload.php');
} else {
	die ( 'Vimeo not found. Please contact developers');
}

use Vimeo\Vimeo;

const client_id = 'd2dc82abc8a130f15121b249d6f5727eb540315b',
	  client_secret = 'xqiXDg9LTR42ldcJi3Dfwht+vdVZhymmAG8IRxgvEdwxMrq5lPq/KbiC14teIyZ//51S0S1S6xv2+QfiTrAaiTL1GYVJK8rZT+M6JkNRjam/VwY+mFuHuMtMOsNIfNcB',
	  access_token = '';

	$lib = new Vimeo(client_id, client_secret);
	$token = $lib->clientCredentials(scope);
	$lib->setToken($token['body']['access_token']);

	if(isset ($_POST['video_id'])) {
		$search_results = $lib->request('/videos/' . $_POST['video_id']);		
		header('Content-Type: application/json');
		echo json_encode($search_results);
		
	} else if(isset($_POST['query'])) {
		$search_results = $lib->request('/videos', array('page' => 1, $_POST['per_page'], 'query' => urlencode($_POST['query']), 'sort' => 'relevant', 'direction' => 'desc', 'filter' => 'CC'));
		
		header('Content-Type: application/json');
		echo json_encode($search_results);
	}
	
return true;

?>