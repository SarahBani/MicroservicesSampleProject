using Common;
using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CRUD.APIService.Repository
{
    public interface IBaseReadOnlyRepository<TEntity, TKey>
        where TEntity : Entity<TKey>
    {

        Task<TEntity> GetByIdAsync(TKey id);

        Task<int> GetCountAsync(Expression<Func<TEntity, bool>> filter = null);

        Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> filter);

        IQueryable<TEntity> GetQueryable();

        IEnumerable<TEntity> GetEnumerable(Expression<Func<TEntity, bool>> filter = null,
              IList<Sort> sorts = null,
              Page page = null);

    }

}
