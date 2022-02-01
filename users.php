<?php 

include('connection.php');

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $name = $_GET['name'];
        $hashed_password = md5(trim($_GET['password']));

        $query = "SELECT id, name, hashed_password FROM USERS WHERE name = '$name' AND hashed_password = '$hashed_password'";

        $result = $mysqli->query($query);

        if (!$result) {
            die('Query Fail: '.$mysqli->error);
        }

        if (isset($result)) {
            
            $json = array();
            $result->data_seek(0);
            while($row = $result->fetch_assoc()) {
                $json = array (
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'hashed_password' => $row['hashed_password'],
                );
            }
            $jsonstring = json_encode($json, JSON_UNESCAPED_UNICODE);
            echo $jsonstring;

        } else {
            echo '-1';
        }
        break;

    case 'POST':
        $params = json_decode(file_get_contents('php://input'),true);
        $name = $params['name'];
        $hashed_password = md5(trim($params['password']));
        $query = "INSERT INTO USERS (name,hashed_password) VALUES ('$name','$hashed_password')";
        
        $result = $mysqli->query($query);

        
        if (!$result) {
            die('Query Fail: '.$mysqli->error);
        }
        break;
    
    case 'DELETE':
        $id = $_GET['id'];
        $query = "DELETE FROM USERS WHERE id = $id";
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