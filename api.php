<?php
include 'lib/core.php';

\SoundLib\Lib\RestApplication::create();

\SoundLib\Lib\Log::debug(date('Y-m-d:H:i:s') . '::' . REQUEST_METHOD . '::' . REQUEST_URI);