<?php
echo "Setting up Files\n";
exec("export DISPLAY=:0.0");
exec("cd autogrow/autogrow/software/'raspberry pi' ");
exec("python3 frontend.py");
exec("sudo chmod 777 /etc/apache2/apache2.conf");
exec("sudo cp -n apachange /usr/bin");
exec("sudo \cp  apachange.php /usr/bin");
echo "You are Ready to Use the Command\n";
?>
