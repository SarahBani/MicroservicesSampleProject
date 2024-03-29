﻿using System;

namespace CRUD.APIService.Models
{

    public enum SortDirection
    {
        ASC = 0,
        DESC = 1
    }

    [Serializable]
    public class Sort
    {

        #region Properties

        public string SortField { get; private set; }

        public SortDirection SortDirection { get; private set; }

        #endregion /Properties

        #region Constructors

        public Sort()
        {
            this.SortField = string.Empty;
            this.SortDirection = SortDirection.ASC;
        }

        public Sort(string field)
        {
            this.SortField = field ?? string.Empty;
            this.SortDirection = SortDirection.ASC;
        }

        public Sort(string field, SortDirection dir)
        {
            this.SortField = field ?? string.Empty;
            this.SortDirection = dir;
        }

        #endregion /Constructors

    }

}
