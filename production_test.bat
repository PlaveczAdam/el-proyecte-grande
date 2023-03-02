docker build -t grande-management .
docker run -d -p 80:80 -p 443:443 -e ASPNETCORE_DB_CONNECTION_STRING="your-connection-string-here" --name production-test grande-management 