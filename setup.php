<?php
echo "Setting up Files\n";
exec("cd autogrow/software/raspi");
exec("export DISPLAY=:0.0");
exec("python3 frontend.py")
?>
