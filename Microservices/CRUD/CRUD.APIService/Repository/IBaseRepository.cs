using CRUD.APIService.Entities;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CRUD.APIService.Repository
{
    public interface IBaseRepository<TEntity, TKey> : IBaseReadOnlyRepository<TEntity, TKey>
        where TEntity : Entity<TKey>
    {

        Task InsertAsync(TEntity entity);

        void Update(TEntity entity);

        void Delete(TKey id);

        void Delete(TEntity entity);

        void Delete(Expression<Func<TEntity, bool>> filter);

    }
}
