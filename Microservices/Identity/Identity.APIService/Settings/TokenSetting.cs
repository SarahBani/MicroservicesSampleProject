namespace Identity.APIService.Settings
{
    public class TokenSetting
    {

        #region Properties

        public virtual string SecretKey { get; set; }

        public virtual string Issuer { get; set; }

        public virtual string Audience { get; set; }

        public virtual string AccessExpiration { get; set; }

        #endregion /Properties

    }
}
