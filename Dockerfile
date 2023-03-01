#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM node AS frontend
WORKDIR /app
COPY el-proyecte-grande-frontend .
RUN npm ci 
RUN npm run build
#COPY --from=frontend /app/build .

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["el-proyecte-grande-backend/el-proyecte-grande-backend.csproj", "el-proyecte-grande-backend/"]
RUN dotnet restore "el-proyecte-grande-backend/el-proyecte-grande-backend.csproj"
COPY . .
WORKDIR "/src/el-proyecte-grande-backend"
COPY --from=frontend /app/build wwwroot
RUN dotnet build "el-proyecte-grande-backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "el-proyecte-grande-backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "el-proyecte-grande-backend.dll"]