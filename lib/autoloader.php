<?php
namespace SoundLib\Lib;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of autoload
 *
 * @author David
 */
class Autoloader
{
    /**
     * Registers the autoloader class with the PHP SPL autoloader.
     *
     * @param bool $prepend Prepend the autoloader on the stack instead of appending it.
     */
    public static function register($prepend = false)
    {
        spl_autoload_register(array(new self, 'autoload'), true, $prepend);
    }
    
    public function autoload($fqClassName)
    {
        $className = ltrim($fqClassName, '\\');
        $fileName  = '';

//        self::debug(__METHOD__ . '::' . $fqClassName);
        
        $nsParts = explode('\\', $className);
        $baseNamespace = array_shift($nsParts);

        $className = lcfirst(array_pop($nsParts));
        $filepath = strtolower(implode(DIRECTORY_SEPARATOR, $nsParts));
        
        if(strpos($fqClassName, '\\Lib')) {
            $fileName = DOCUMENT_ROOT . $filepath . DIRECTORY_SEPARATOR . $className . '.php';
        } else {
            $fileName = DOCUMENT_ROOT . 'app' . DIRECTORY_SEPARATOR . $filepath . DIRECTORY_SEPARATOR . $className . '.class.php';
        }
//        self::debug(__METHOD__ . '::' . $fileName);

        include_once $fileName;
    }

    public static function debug($message)
    {
        file_put_contents(DOCUMENT_ROOT . 'log' . DIRECTORY_SEPARATOR . 'debug.log', $message . "\n", FILE_APPEND | LOCK_EX);
    }
}

