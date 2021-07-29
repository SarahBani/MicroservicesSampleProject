@echo Launch FileManager API Service

title  FileManager API Service
dotnet build --configuration "Debug"
set ASPNETCORE_ENVIRONMENT=Development
dotnet run --configuration "Debug" 