using System.ComponentModel.DataAnnotations;

namespace CRUD.APIService.Entities
{
    public abstract class Entity<TKey> : IEntity<TKey>
    {

        [Key]
        public TKey Id { get; set; }

    }
}
