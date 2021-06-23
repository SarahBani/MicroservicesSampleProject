using System;
using System.ComponentModel.DataAnnotations;

namespace Common.Entities
{
    public abstract class Entity<TKey> : IEntity<TKey>
    {

        [Key]
        public TKey Id { get; set; }

    }
}
