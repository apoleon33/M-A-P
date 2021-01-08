<?php
echo "Setting up Files\n";
exec("sudo chmod +x apachange");
exec("sudo chmod +x apachange.php");
exec("sudo chmod 777 /etc/apache2/sites-available/000-default.conf");
exec("sudo chmod 777 /etc/apache2/apache2.conf");
exec("sudo cp -n apachange /usr/bin");
exec("sudo \cp  apachange.php /usr/bin");
echo "You are Ready to Use the Command\n";
?>
