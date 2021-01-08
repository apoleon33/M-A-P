<?php
echo "Setting up Files\n";
exec("export DISPLAY=:0.0");
exec("cd autogrow/software");
exec("mv 'raspberry pi' raspi");
exec("cd raspi ");
exec("python3 frontend.py");
echo "let's go :)";
?>
