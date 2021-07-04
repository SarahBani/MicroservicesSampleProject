using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Identity.APIService.Models
{
    public class UserCredentialModel 
    {

        #region Properties

        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.EmailAddress)]
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        [DataType(DataType.Password)]
        [JsonProperty("password")]
        public string Password { get; set; }

        #endregion /Properties

    }
}
