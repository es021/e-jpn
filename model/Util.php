<?php

function X($x) {
    echo "<pre>";
    print_r($x);
    echo "</pre>";
}

define("ROOT_PATH", $_SERVER["REQUEST_URI"]);

class Util {

    public static function includeStyleSheet() {
        ob_start();
        $styles = array("app");

        foreach ($styles as $s) {
            ?>
            <link rel="stylesheet" type="text/css" href="<?= ROOT_PATH ?>css/<?= $s ?>.css">
            <?php
        }
        $ret = ob_get_contents();
        ob_end_clean();
        return $ret;
    }

}
