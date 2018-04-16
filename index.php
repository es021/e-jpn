<?php
/*
 * @author Wan Zulsarhan
 * Developed for Infomina
 */

include_once './model/Util.php';

$title = "eJPN";
$description = "This is description for eJPN";
?>

<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <base href="/" />
        <!--       
                <link rel="icon" href="https://seedsjobfair.com/career-fair/wp-content/uploads/2017/04/cropped-icon-32x32.png" sizes="32x32"/>
                <link rel="icon" href="https://seedsjobfair.com/career-fair/wp-content/uploads/2017/04/cropped-icon-192x192.png" sizes="192x192"/>
                <link rel="apple-touch-icon-precomposed" href="https://seedsjobfair.com/career-fair/wp-content/uploads/2017/04/cropped-icon-180x180.png"/>
                <meta name="msapplication-TileImage" content="https://seedsjobfair.com/career-fair/wp-content/uploads/2017/04/cropped-icon-270x270.png"/>
        -->        
        <meta name="description" content="<?= $description ?>" />
        <title><?= $title ?></title>
        <?= Util::includeStyleSheet() ?>
    </head>
    <body class="jpn-main"> 
        <?php
        include_once './component/header.php';
        ?>
        <div class="jpn-bar-content">
            <?php
            include_once './component/left-bar.php';
            include_once './component/content.php';
            ?>
        </div>
        <?php include_once './component/footer.php'; ?>
    </body>
</html>