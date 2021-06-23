using Identity.APIService.Entities;
using Identity.APIService.Models;
using System.Threading.Tasks;

namespace Identity.APIService.Services
{
    public interface IAuthService
    {

        Task<TransactionResult> Register(User user, string password);

        Task<TransactionResult> Login(string username, string password);

        Task<TransactionResult> ChangePassword(string username, string oldPassword, string newPassword);

    }
}
