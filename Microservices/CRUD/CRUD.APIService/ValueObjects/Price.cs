namespace CRUD.APIService.ValueObjects
{
    public class Price : ValueObject<Price>
    {

        #region Properties

        public decimal Amount { get; private set; }

        public string MonetaryUnit { get; private set; }

        #endregion /Properties

        #region Constructors

        public Price()
        {

        }
        public Price(decimal amount, string monetaryUnit)
        {
            this.Amount = amount;
            this.MonetaryUnit = monetaryUnit;
        }

        #endregion /Constructors

    }
}
