@echo Launch CRUD APIService

title  CRUD API Service
dotnet build --configuration "Debug"
set ASPNETCORE_ENVIRONMENT=Development
dotnet run --configuration "Debug" 
