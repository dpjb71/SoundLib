<?php
namespace SoundLib\Lib;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of router
 *
 * @author David
 */
class RestRouter
{
    use HttpTransport;
    
    //put your code here
    private $application = null;
    private $apiName = '';    
    private $baseNamespace = '';
    private $apiFileName = '';

    public function __construct(RestApplication $app)
    {
        $this->application = $app;
        $this->request = $app->getRequest();
        $this->response = $app->getResponse();
    }

    public function translate()
    {

        $nsParts = explode('\\', __NAMESPACE__);
        $this->baseNamespace = array_shift($nsParts);
        
        $qstring = str_replace('/api/', '', REQUEST_URI);
        
        $qParts = explode('/', $qstring);
        
        $this->apiName = $qParts[0];
        
        $this->apiFileName = DOCUMENT_ROOT . 'app' . DIRECTORY_SEPARATOR . 'rest' . DIRECTORY_SEPARATOR . $this->apiName . '.class.php';
        
        return file_exists($this->apiFileName);
    }

    public function dispatch()
    {
        $fqObject = $this->baseNamespace . '\\Rest\\' . ucfirst($this->apiName);

        include $this->apiFileName;

        $instance = new $fqObject($this->application);
        
        $instance->render();
    }
}
