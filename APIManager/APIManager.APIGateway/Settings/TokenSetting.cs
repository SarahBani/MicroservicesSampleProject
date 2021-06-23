namespace APIManager.WebAPIGateway.Settings
{
    public class TokenSetting
    {

        #region Properties

        public virtual string SecretKey { get; set; }

        public virtual string ProviderKey { get; set; }

        public virtual string Issuer { get; set; }

        public virtual string Audiences { get; set; }

        #endregion /Properties

    }
}
