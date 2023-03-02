@echo off
set container_name=grande_container
set db_user=<your db username>
set db_password=<your db password>
::You don't need to chane this if the db sever is on your host computer
set db_host=host.docker.internal
:: You don't need to change this if the db is listening on the default port
set db_port=5432
:: The directory of the pfx certificate on the host computer. You can use %CD% as an alias of the current directory
set cert_dir=<the directory of your certificate>
:: The filename of the (pfx) certificate
set cert_filename=<e.g.: grande-hotel.pfx>
set cert_password=<the very secure password of the certificate>

docker build -t grande-management .
docker run -d -p 80:80 -p 443:443 -e ASPNETCORE_URLS="https://+:443;http://+:80" -e ASPNETCORE_HTTPS_PORT=443 -e ASPNETCORE_Kestrel__Certificates__Default__Password="%cert_password%" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/%cert_filename% -v "%cert_dir%:/https/" -e ASPNETCORE_DB_CONNECTION_STRING="User ID=%db_user%;Password=%db_password%;Host=%db_host%;Port=%db_port%;Database=GrandeHotelManagement;Pooling=true;" --name %container_name% grande-management 