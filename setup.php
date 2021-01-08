<?php
echo "Setting up Files\n";
exec("export DISPLAY=:0.0");
exec("cd autogrow/autogrow/software/'raspberry pi' ");
exec("python3 frontend.py");
echo "You are Ready to Use the Command\n";
?>
