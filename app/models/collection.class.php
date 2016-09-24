<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Models;

use SoundLib\Data\Connection;
/**
 * Description of Playlist
 *
 * @author David
 */
class Collection
{
    //put your code here
    public static function getAllTracks()
    {
        $result = [];
        $result['collection'] = [];
        
        $cnn = new Connection();
        $stmt = $cnn->open();
        
        $sql = <<<SELECT
select art_name as artist, trk_title as title
from artist a
inner join track t on a.art_id = t.art_id
SELECT;
        
        $res = $stmt->query($sql);
        
        while ($row = $res->fetch(\PDO::FETCH_OBJ)) {
            array_push($result['collection'], $row);
        }
        
        return $result;
    }
}
