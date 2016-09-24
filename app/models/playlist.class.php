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
class Playlist
{
    //put your code here
    public static function getUserFavorites($userId)
    {
        $result = [];
        $result['playlist'] = [];

        $cnn = new Connection();
        $stmt = $cnn->open();
        
        $sql = <<<SELECT
select art_name as artist, trk_title as title
from user u
inner join playlist p on p.usr_id = u.usr_id
inner join playlist_content c on c.pls_id = p.pls_id
inner join track t on c.trk_id = t.trk_id
inner join artist a on t.art_id = a.art_id
where u.usr_id = $userId
SELECT;
         
        $res = $stmt->query($sql);
        
        while ($row = $res->fetch(\PDO::FETCH_OBJ)) {
            array_push($result['playlist'], $row);
        }
        
        return $result;
    }
}
