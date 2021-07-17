namespace CRUD.APIService.Entities
{
    public interface IEntity<TKey>
    {

        TKey Id { get; set; }

    }
}
