<?php
echo "Setting up Files\n";
exec("export DISPLAY=:0.0");
exec("cd autogrow/software/raspi ");
exec("python3 frontend.py");
echo "let's go :)";
?>
