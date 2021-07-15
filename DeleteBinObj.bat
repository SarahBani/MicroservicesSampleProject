echo "Deleting Folder - Gateway"
@RD /S /Q "H:\Project\Microservices\MicroservicesSampleProject\APIManager\APIManager.APIGateway\bin"
@RD /S /Q "H:\Project\Microservices\MicroservicesSampleProject\APIManager\APIManager.APIGateway\obj"

echo "Deleting Folder - CRUDAPIService
@RD /S /Q "H:\Project\Microservices\MicroservicesSampleProject\Microservices\CRUD\CRUD.APIService\bin"
@RD /S /Q "H:\Project\Microservices\MicroservicesSampleProject\Microservices\CRUD\CRUD.APIService\obj"

echo "Deleting Folder - IdentityAPIService"
@RD /S /Q "H:\Project\Microservices\MicroservicesSampleProject\Microservices\Identity\Identity.APIService\bin"
@RD /S /Q "H:\Project\Microservices\MicroservicesSampleProject\Microservices\Identity\Identity.APIService\obj"

echo "Deleting Folder - ClientSPA
@RD /S /Q "H:\Project\Microservices\MicroservicesSampleProject\Client\Client.SPA\bin"
@RD /S /Q "H:\Project\Microservices\MicroservicesSampleProject\Client\Client.SPA\obj"
