using Identity.APIService.Entities;
using Identity.APIService.Models;
using System.Threading.Tasks;

namespace Identity.APIService.Services
{
    public interface IAuthService
    {

        Task<TransactionResult> RegisterAsync(User user, string password);

        Task<TransactionResult> ChangePasswordAsync(string username, string oldPassword, string newPassword);

        Task<TransactionResult> LoginAsync(string email, string password);

    }
}
