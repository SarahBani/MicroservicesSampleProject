using System;

namespace Identity.APIService.Models
{
    public class AuthenticationResponse
    {

        #region Properties

        public string Email { get; private set; }

        public string Token { get; private set; }

        public DateTime TokenExpiration { get; private set; }

        #endregion /Properties

        #region Constructors

        public AuthenticationResponse(string email, string token, DateTime tokenExpiration)
        {
            this.Email = email;
            this.Token = token;
            this.TokenExpiration = tokenExpiration;
        }

        #endregion /Constructors

    }
}
