using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Identity.APIService.Models
{
    public class UserCredentialModel 
    {

        #region Properties


        [Required(AllowEmptyStrings = false)]
        [JsonProperty("username")]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [JsonProperty("password")]
        public string Password { get; set; }

        #endregion /Properties

    }
}
