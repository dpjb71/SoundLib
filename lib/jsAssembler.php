<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace SoundLib\Lib;
/**
 * Description of js_assembler
 *
 * @author david
 */
$dir = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'js' . DIRECTORY_SEPARATOR;

$js_filename = DOCUMENT_ROOT . 'js' . DIRECTORY_SEPARATOR . 'soundlib.js';

$filenames = [
        'soundlib.js'
    ,   'soundlib.rest.js'
    ,   'soundlib.ui.js'
];

$js_content = '';

foreach ($filenames as $filename) {
    $js_content .= file_get_contents($dir . $filename);
}

file_put_contents($js_filename, $js_content);
