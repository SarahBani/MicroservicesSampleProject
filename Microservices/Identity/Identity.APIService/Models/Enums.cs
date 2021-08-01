namespace Identity.APIService.Models
{
    public enum RoleEnum
    {
        Admin,
        Clerk,
        Client,
        Guest
        //Manager,
        //Employee,
        //Member,
    }

    public enum SubSystemEnum
    {
        Auth,
        CRUD,
        FileManager,
        CQRS
    }

}
