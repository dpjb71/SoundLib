<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR);
define('REQUEST_URI', $_SERVER['REQUEST_URI']);
define('REQUEST_PARAMS', $_REQUEST);
define('QUERY_STRING', $_SERVER['QUERY_STRING']);
define('APP_DATA', DOCUMENT_ROOT . 'data' . DIRECTORY_SEPARATOR);
define('REQUEST_METHOD', $_SERVER['REQUEST_METHOD']);