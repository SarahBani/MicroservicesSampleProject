namespace CRUD.APIService.Models
{
    public class Page
    {

        #region Constructors

        public Page(short pageNo, short count)
        {
            this.FirstRowIndex = ((pageNo - 1) * count);
            this.Count = count;
        }

        #endregion /Constructors

        #region Properties

        public int FirstRowIndex { get; private set; }

        public int Count { get; private set; }

        #endregion /Properties

    }
}
