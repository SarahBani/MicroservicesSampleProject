using Identity.APIService.Entities;
using Identity.APIService.Models;
using Identity.APIService.Repository;
using Identity.APIService.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Identity.APIService.Services
{
    public class AuthService : BaseService, IAuthService
    {

        #region Properties

        private readonly TokenSetting _tokenSetting;

        private readonly UserManager<User> _userManager;

        //private (string Email, string Password) _sampleLogin = ("sarah@yahoo.com", "123456");

        #endregion /Properties

        #region Constructors

        public AuthService(IUnitOfWork unitOfWork,
            IOptions<TokenSetting> tokenSetting,
            UserManager<User> userManager) :
            base(unitOfWork)
        {
            this._tokenSetting = tokenSetting.Value;
            this._userManager = userManager;
        }

        #endregion

        #region Methods

        public async Task<TransactionResult> RegisterAsync(User user, string password)
        {
            try
            {
                if (this._userManager.FindByEmailAsync(user.Email).Result != null)
                {
                    throw new CustomException(Constant.Exception_EmailAlreadyRegistered);
                }
                if (this._userManager.FindByNameAsync(user.UserName).Result != null)
                {
                    throw new CustomException(Constant.Exception_DuplicateUserName);
                }
                base.BeginTransaction();
                var identityResult = await this._userManager.CreateAsync(user, password);
                if (identityResult.Succeeded)
                {
                    await AddRole(user, RoleEnum.Guest.ToString());
                    await AddClaims(user, RoleEnum.Guest);
                }
                else
                {
                    string errors = string.Empty;
                    if (identityResult.Errors.Count() > 0)
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            errors += error.Description;
                        }
                        throw new CustomException(errors);
                    }
                    throw new CustomException(Constant.Exception_RegistrationFailed);
                }
                return await CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private async Task<TransactionResult> AddRole(User user, string role)
        {
            var result = await this._userManager.AddToRoleAsync(user, role);
            if (result.Succeeded)
            {
                return new TransactionResult();
            }
            else
            {
                string errors = string.Empty;
                if (result.Errors.Count() > 0)
                {
                    foreach (var error in result.Errors)
                    {
                        errors += error.Description;
                    }
                    throw new CustomException(errors);
                }
                throw new CustomException(Constant.Exception_RegistrationFailed);
            }
        }

        private async Task<TransactionResult> AddClaims(User user, RoleEnum role)
        {
            string subSystems = role switch
            {
                RoleEnum.Admin => string.Join(";",
                    SubSystemEnum.Auth.ToString().ToLower(),
                    SubSystemEnum.CRUD.ToString().ToLower(),
                    SubSystemEnum.FileManager.ToString().ToLower(),
                    SubSystemEnum.CQRS.ToString().ToLower()),
                RoleEnum.Clerk => string.Join(";",
                    SubSystemEnum.CRUD.ToString().ToLower(),
                    SubSystemEnum.CQRS.ToString().ToLower()),
                var x when x == RoleEnum.Client || x == RoleEnum.Guest =>
                    SubSystemEnum.CRUD.ToString(),
                _ =>
                    string.Empty
            };
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.System, subSystems)
            };
            claims.Add(new Claim(ClaimTypes.Role, role.ToString()));

            var result = await this._userManager.AddClaimsAsync(user, claims);
            if (result.Succeeded)
            {
                return new TransactionResult();
            }
            else
            {
                string errors = string.Empty;
                if (result.Errors.Count() > 0)
                {
                    foreach (var error in result.Errors)
                    {
                        errors += error.Description;
                    }
                    throw new CustomException(errors);
                }
                throw new CustomException(Constant.Exception_RegistrationFailed);
            }
        }

        public async Task<TransactionResult> ChangePasswordAsync(string username, string oldPassword, string newPassword)
        {
            var user = await this._userManager.FindByNameAsync(username);
            if (user != null)
            {
                var identityResult = await this._userManager.ChangePasswordAsync(user, oldPassword, newPassword);
                if (identityResult.Succeeded)
                {
                    return new TransactionResult();
                }
            }
            return new TransactionResult(new CustomException(Constant.Exception_ChangePasswordFailed));
        }

        //public async Task<TransactionResult> CreateRole(string name)
        //{
        //    var role = new Role()
        //    {
        //        Name = name,
        //        NormalizedName = name.ToUpper(),
        //        ConcurrencyStamp = Guid.NewGuid().ToString(),
        //        Description = null
        //    };
        //    var result = await this._roleManager.CreateAsync(role);
        //    if (result.Succeeded)
        //    {
        //        return new TransactionResult();
        //    }
        //    else
        //    {
        //        return new TransactionResult(new CustomException(Constant.Exception_RoleCreationFailed));
        //    }
        //}    

        public async Task<TransactionResult> LoginAsync(string email, string password)
        {
            try
            {
                //await Task.Delay(3000); // for a delay to simulate real database fetch                
                //if (email.Equals(_sampleLogin.Email, StringComparison.OrdinalIgnoreCase) &&
                //    password.Equals(_sampleLogin.Password))
                var user = await this._userManager.FindByEmailAsync(email);
                if (user != null && await this._userManager.CheckPasswordAsync(user, password))
                {
                    var roles = await this._userManager.GetRolesAsync(user);
                    var authenticationToken = GetAuthenticationResponse(user, roles);
                    return new TransactionResult(authenticationToken);
                }
                else
                {
                    throw new CustomException(ExceptionKey.AuthenticationFailed);
                }
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private AuthenticationResponse GetAuthenticationResponse(User user, IList<string> roles)
        {
            DateTime expirationTime = DateTime.UtcNow.AddMinutes(double.Parse(this._tokenSetting.AccessExpiration));
            string token = GenerateJwtToken(user, roles, expirationTime);
            return new AuthenticationResponse(user.Email, token, expirationTime);
        }

        private string GenerateJwtToken(User user, IList<string> roles, DateTime expirationTime)
        {
            //var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._tokenSetting.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature); //  HmacSha256Signature);

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
            };
            // Add roles as multiple claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
            //claims.Add(new Claim("Role", "Admin")); // customized claim
            claims.Add(new Claim("sss", "ddd"));

            var tokeOptions = new JwtSecurityToken(
                issuer: this._tokenSetting.Issuer,
                audience: this._tokenSetting.Audience,
                claims: claims,
                expires: expirationTime,
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }

        #endregion /Methods

    }
}
