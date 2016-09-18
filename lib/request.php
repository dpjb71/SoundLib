<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of request
 *
 * @author David
 */
class Request 
{
    //put your code here
    private $requestUri = '';
    private $queryString = '';
    private $rootName = '';
    private $requestUriParts = '';

    public function __construct()
    {
        $this->requestUri = REQUEST_URI;
        $this->queryString = QUERY_STRING;
        $this->requestUriParts = explode('/', $this->requestUri);
        $this->rootName = array_pop($this->requestUriParts);
        $rootNameParts = explode('.',$this->rootName);
        $this->rootName = array_shift($rootNameParts);
        
    }
    
    public function getRequestUriParts()
    {
        return $this->requestUriParts;
    }
    
    public function getRootName()
    {
        return $this->rootName;
    }
    
    public function getRequestUri()
    {
        return REQUEST_URI;
    }

    public function getQueryString()
    {
        return QUERY_STRING;
    }

    public function getScriptName()
    {
        return $_SERVER['SCRIPT_NAME'];
    }
    
    public function getMethod()
    {
        return $_SERVER['REQUEST_METHOD'];
    }
    
    
}
