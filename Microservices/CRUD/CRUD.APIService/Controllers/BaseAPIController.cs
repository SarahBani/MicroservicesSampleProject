﻿using CRUD.APIService.Models;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.APIService.Controllers
{
    [ApiController]
    public abstract class BaseAPIController : ControllerBase
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public BaseAPIController()
        {
        }

        #endregion /Constructors

        #region Actions

        //protected IActionResult GetOKResult()
        //{
        //    return Ok(new TransactionResult()); // Http status code 200
        //}

        //protected IActionResult GetActionResult<T>(T value)
        //{
        //    return Ok(new TransactionResult(value));
        //}

        //protected IActionResult GetCreatedActionResult<TEntity, TKey>(string actionName,
        //    TEntity createdObject)
        //    where TEntity : BaseEntity<TKey>
        //{
        //    return CreatedAtAction(actionName,
        //        new { id = createdObject.Id },
        //        createdObject);
        //}

        //protected IActionResult GetInvalidModelResult()
        //{
        //    return GetErrorResult(new TransactionResult(new CustomException(Constant.Exception_InvalidModelState), ModelState));
        //}

        // protected IActionResult GetInvalidRequestResult()
        //{
        //    return GetErrorResult(new TransactionResult(new CustomException(Constant.Exception_InvalidRequestData), ModelState));
        //}

        //protected IActionResult GetErrorResult()
        //{
        //    return GetErrorResult(new TransactionResult(Constant.Exception_HasError));
        //}

        //protected IActionResult GetErrorResult(TransactionResult transactionResult)
        //{
        //    return BadRequest(transactionResult);
        //}

        #endregion /Actions

        #region Methods

        protected Page GetPage(short? pageNo, short? pageCount)
        {
            Page page = null;
            if (pageNo.HasValue && pageCount.HasValue)
            {
                page = new Page(pageNo.Value, pageCount.Value);
            }
            return page;
        }

        #endregion /Methods

    }
}
