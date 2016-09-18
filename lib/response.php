<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of response
 *
 * @author David
 */
class Response
{
    //put your code here
    public function returnCode($httpCode)
    {
        return http_response_code($httpCode);
    }
    
    public function sendXmlData($data)
    {  
        header('Content-type: application/xml; charset=UTF-8');
        echo XmlUtils::convertArray($data);
    }
    
    public function sendJsonData($data)
    {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($data);
    }
}
