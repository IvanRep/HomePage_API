<?php 

include_once('connection.php');

switch($_SERVER['REQUEST_METHOD']) {
    
    case 'GET':
        
        $folder_id = $_GET['folder_id'];
    
        $folder_query = "SELECT id, name, folder_id, url, visible_url FROM STORED_LINKS WHERE folder_id = $folder_id";
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
        $jsonstring = json_encode($folder_json, JSON_UNESCAPED_UNICODE);
        echo $jsonstring;
        break;

    //Insertar nuevo link en un folder
    case 'POST':
        $params = json_decode(file_get_contents('php://input'),true);
        $folder_id = $_GET['folder_id'];
        $name = $params['name'];
        $url = $params['url'];
        $visible_url = $params['visible_url'];
        $query = "INSERT INTO STORED_LINKS (folder_id,name,url,visible_url) VALUES ($folder_id,'$name','$url','$visible_url')";
        
        $result = $mysqli->query($query);

        
        if (!$result) {
            die('Query Fail: '.$mysqli->error);
        }
        break;
    
    case 'DELETE':
        $id = $_GET['id'];
        $query = "DELETE FROM STORED_LINKS WHERE id = $id";
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