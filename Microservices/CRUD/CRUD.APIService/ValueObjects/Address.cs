﻿//using CRUD.APIService.Entities;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;

//namespace CRUD.APIService.ValueObjects
//{
//    public class Address : ValueObject<Address>
//    {

//        #region Properties

//        [Required]
//        public string CityName { get; private set; }

//        [Required]
//        public string Street { get; private set; }

//        [Required]
//        public string BlockNo { get; private set; }

//        [Required]
//        public string PostalCode { get; private set; }

//        [Required]
//        public virtual Country Country { get; private set; }

//        #endregion /Properties

//        #region Constructors

//        private Address() { }

//        public Address(Country country,
//            string cityName,
//            string street,
//            string blockNo,
//            string postalCode)
//        {
//            this.Country = country;
//            this.CityName = cityName;
//            this.Street = street;
//            this.BlockNo = blockNo;
//            this.PostalCode = postalCode;
//        }

//        #endregion /Constructors

//        #region Methods

//        protected override IEnumerable<object> GetAtomicValues()
//        {
//            // Using a yield return statement to return each element one at a time
//            yield return this.Country;
//            yield return this.CityName;
//            yield return this.Street;
//            yield return this.BlockNo;
//            yield return this.PostalCode;
//        }

//        #endregion /Methods

//    }
//}
