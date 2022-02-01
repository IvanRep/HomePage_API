<?php 

if (str_starts_with(strval($_SERVER['REMOTE_ADDR']),'192.168.1')) {
    echo 'hola: ' .$_SERVER['REMOTE_ADDR'];
} else {
    echo 'adios';
}

?>