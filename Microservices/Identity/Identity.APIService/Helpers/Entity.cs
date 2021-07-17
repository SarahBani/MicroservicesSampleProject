using System.ComponentModel.DataAnnotations;

namespace Identity.APIService.Entities
{
    public abstract class Entity<TKey> : IEntity<TKey>
    {

        [Key]
        public TKey Id { get; set; }

    }
}
