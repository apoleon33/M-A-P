<?php
echo "starting...\n";
exec("export DISPLAY=:0.0");
exec("python3 frontend.py");
?>
