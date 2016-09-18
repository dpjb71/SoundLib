<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of controller
 *
 * @author David
 */
abstract class RestController
{
    use HttpTransport;
    //put your code here
    private $data = [];
    private $application = null;
    private $className = '';
    private $action = '';
    private $parameter = '';

    public function __construct(RestApplication $app)
    {

        $this->request = $app->getRequest();
        $this->response = $app->getResponse();

        
        
//        Log::debug($this->className . '::' . $this->method . '(' . $this->parameter . ')');
        
    }

    public function load() {}
    
    public function get() {}
    public function put() {}
    public function post() {}
    public function delete() {}

    public function render()
    {
        $this->load();
        
        $qstring = str_replace('/api/', '', $this->request->getRequestUri());
        $qParts = explode('/', $qstring);
        
        $this->apiName = $qParts[0];
        $this->className = ucfirst($this->apiName);
        $action = isset($qParts[1]) ? $qParts[1] : '';
        $parameter = isset($qParts[2]) ? $qParts[2] : null;

        if(method_exists($this, $action)) {
            if(isset($parameter)) {
                $this->$action($parameter);
            } else {
                $this->$action();
            }
        }
        
        if($this->request->getMethod() === 'GET') {
            $this->get();
        }
        
        if($this->request->getMethod() === 'PUT') {
            $this->put();
        }
        
        if($this->request->getMethod() === 'POST') {
            $this->post();
        }
        
        if($this->request->getMethod() === 'DELETE') {
            $this->delete();
        }
        
        $this->response->sendJsonData($this->data);
    }


    
}
