<?php
if ($_POST["message"]) {
    mail("ericng8766@gmail.com", "Here is the subject line", $_POST["message"], "From: an@email.address");
}
?>
