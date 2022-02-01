<?php 

include_once('connection.php');

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $ip =  $_SERVER['REMOTE_ADDR'];
        $user_id = $_GET['user_id'];
        substr($ip,0,9) == '192.168.1' ? $user_home = " OR user_id = -1" : $user_home = '';
        $query = "SELECT id, type, user_id, number_link, name, url, visible_url, folder FROM LINKS WHERE user_id = $user_id $user_home ORDER BY number_link asc";
        $result = $mysqli->query($query);

        if (!$result) {
            die('Query Fail: '.$mysqli->error);
        }
          
        $json = array();
        $result->data_seek(0);
        while($row = $result->fetch_assoc()) {

            if ($row['folder'] == 0) {

                $json[] = array (
                    'folder' => $row['folder'],
                    'id' => $row['id'],
                    'user_id' => $row['user_id'],
                    'type' => $row['type'],
                    'number_link' => $row['number_link'],
                    'name' => $row['name'],
                    'url' => $row['url'],
                    'visible_url' => $row['visible_url'],
                );
            } else {
                //Si es una carpeta
                $folder_query = "SELECT id, name, folder_id, url, visible_url FROM STORED_LINKS WHERE folder_id = {$row['id']}";
                $folder_result = $mysqli->query($folder_query);
                if (!$folder_query) {
                    die('Folder Query Fail: '.$mysqli->error);
                }

                $folder_json = array();
                $folder_result->data_seek(0);
                while ($folder_row = $folder_result->fetch_assoc()) {
                    $folder_json[] = array (
                        'id' => $folder_row['id'],
                        'name' => $folder_row['name'],
                        'folder_id' => $folder_row['folder_id'],
                        'url' => $folder_row['url'],
                        'visible_url' => $folder_row['visible_url']
                    );
                }
                $json[] = array(
                    'folder' => $row['folder'],
                    'id' => $row['id'],
                    'user_id' => $row['user_id'],
                    'type' => $row['type'],
                    'number_link' => $row['number_link'],
                    'name' => $row['name'],
                    'visible_url' => $row['visible_url'],
                    'links' => $folder_json,
                );
            }
        }
        $jsonstring = json_encode($json, JSON_UNESCAPED_UNICODE);
        echo $jsonstring;

        break;

    case 'POST':
        $params = json_decode(file_get_contents('php://input'),true);
        $type = $params['type'];
        $user_id = $params['user_id'];
        $number_link = $params['number_link'];
        $name = $params['name'];
        $url = $params['url'];
        $visible_url = $params['visible_url'];
        $folder = $params['folder'];
        $query = "INSERT INTO LINKS (type,user_id,number_link,name,url,visible_url,folder) VALUES ('$type',$user_id,$number_link,'$name','$url','$visible_url',$folder)";
        
        $result = $mysqli->query($query);

        
        if (!$result) {
            die('Query Fail: '.$mysqli->error);
        }
        break;
    case 'PUT':
        $id = $_GET['id'];
        $number_link = $_GET['number_link'];
        if (isset($_GET['url'])) {
            $name = $_GET['name'];
            $url = $_GET['url'];
            $visible_url = $_GET['visible_url'];
            $query = "UPDATE LINKS SET number_link = $number_link, name = '$name', url = '$url', visible_url = '$visible_url' WHERE id = $id";
            $result = $mysqli->query($query);
            if (!$result) {
                die('Query Error: '.$mysqli->error);
            }
        } else { //Si es una carpeta actualizo todos sus links
            $links = json_decode($_GET['links'],true);
            $query = "UPDATE LINKS SET number_link = $number_link WHERE id = $id";
            $result = $mysqli->query($query);
            if (!$result) {
                die('Query Error: '.$mysqli->error);
            }

            foreach ($links as $link) {
                $link_id = $link['id'];
                $name = $link['name'];
                $url = $link['url'];
                $visible_url = $link['visible_url'];
                
                $query = "UPDATE `STORED_LINKS` SET `name`='$name',`url`='$url',`visible_url`='$visible_url' WHERE `id` = $link_id AND `folder_id` = $id";
                //die('Query: '.$query);
                $result = $mysqli->query($query);
                if (!$result) {
                    die('Query Error: '.$mysqli->error);
                }
            }
        }
        
        break;
    case 'DELETE':
        $id = $_GET['id'];
        $query = "DELETE FROM LINKS WHERE id = $id";
        $result = $mysqli->query($query);
        if (!$result) {
            die('Query Error: '.$mysqli->error);
        }
        break;

    default:
        die('REQUEST METHOD ERROR');  
}

$mysqli->close();

?>