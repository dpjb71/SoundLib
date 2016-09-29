<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of log
 *
 * @author David
 */
class Log
{
    //put your code here
    public static function debug($message)
    {
        if(!file_exists(DOCUMENT_ROOT . 'log')) {
            mkdir(DOCUMENT_ROOT . 'log', 0777);
        }
        file_put_contents(DOCUMENT_ROOT . 'log' . DIRECTORY_SEPARATOR . 'debug.log', $message . "\n", FILE_APPEND | LOCK_EX);
    }
}
