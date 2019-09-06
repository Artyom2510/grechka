<?php

require_once 'mobile_detect.php';
$detect = new Mobile_Detect;

if ($detect->isMobile() || $detect->isTablet()) {
	require_once 'index-mobile.html';
} else {
	require_once 'index.html';
}
