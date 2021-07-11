using System;
using System.Collections.Generic;
using System.Reflection;

//this base class comes from Jimmy Bogard
//http://grabbagoft.blogspot.com/2007/06/generic-value-object-equality.html

namespace CRUD.APIService.ValueObjects
{
    //public abstract class ValueObject : IEquatable<ValueObject>
    //{

    //    #region Methods

    //    protected abstract IEnumerable<object> GetAtomicValues();

    //    public static bool operator ==(ValueObject x, ValueObject y)
    //    {
    //        if (ReferenceEquals(x, null) && ReferenceEquals(y, null))
    //        {
    //            return true;
    //        }
    //        if (ReferenceEquals(x, null) || ReferenceEquals(y, null))
    //        {
    //            return false;
    //        }
    //        return x.Equals(y);
    //    }

    //    public static bool operator !=(ValueObject x, ValueObject y)
    //    {
    //        return !(x == y);
    //    }

    //    public bool Equals([AllowNull] ValueObject other)
    //    {
    //        IEnumerator<object> thisValues = GetAtomicValues().GetEnumerator();
    //        IEnumerator<object> otherValues = other.GetAtomicValues().GetEnumerator();
    //        while (thisValues.MoveNext() && otherValues.MoveNext())
    //        {
    //            if (ReferenceEquals(thisValues.Current, null) ^
    //                ReferenceEquals(otherValues.Current, null))
    //            {
    //                return false;
    //            }

    //            if (thisValues.Current != null &&
    //                !thisValues.Current.Equals(otherValues.Current))
    //            {
    //                return false;
    //            }
    //        }
    //        return !thisValues.MoveNext() && !otherValues.MoveNext();
    //    }

    //    public override bool Equals(object obj)
    //    {
    //        if (obj == null || obj.GetType() != GetType())
    //        {
    //            return false;
    //        }

    //        ValueObject other = (ValueObject)obj;
    //        return (Equals(other));
    //    }

    //    public override int GetHashCode()
    //    {
    //        return GetAtomicValues()
    //             .Select(x => x != null ? x.GetHashCode() : 0)
    //             .Aggregate((x, y) => x ^ y);
    //        //.Aggregate(1, (current, obj) =>
    //        //        {
    //        //            return HashCode.Combine(current, obj);
    //        //        });
    //    }

    //    #endregion /Methods

    //}
    public abstract class ValueObject<T> : IEquatable<T>
      where T : ValueObject<T>
    {

        #region Methods

        public override bool Equals(object obj)
        {
            if (obj == null)
            {
                return false;
            }

            T other = obj as T;
            return Equals(other);
        }

        public override int GetHashCode()
        {
            IEnumerable<FieldInfo> fields = GetFields();

            int startValue = 17;
            int multiplier = 59;

            int hashCode = startValue;

            foreach (FieldInfo field in fields)
            {
                object value = field.GetValue(this);

                if (value != null)
                    hashCode = hashCode * multiplier + value.GetHashCode();
            }

            return hashCode;
        }

        public virtual bool Equals(T other)
        {
            if (other == null)
            {
                return false;
            }

            Type t = GetType();
            Type otherType = other.GetType();

            if (t != otherType)
                return false;

            FieldInfo[] fields = t.GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

            foreach (FieldInfo field in fields)
            {
                object value1 = field.GetValue(other);
                object value2 = field.GetValue(this);

                if (value1 == null)
                {
                    if (value2 != null)
                        return false;
                }
                else if (!value1.Equals(value2))
                    return false;
            }

            return true;
        }

        private IEnumerable<FieldInfo> GetFields()
        {
            Type t = GetType();

            List<FieldInfo> fields = new List<FieldInfo>();

            while (t != typeof(object))
            {
                fields.AddRange(t.GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public));

                t = t.BaseType;
            }

            return fields;
        }

        public static bool operator ==(ValueObject<T> x, ValueObject<T> y)
        {
            return x.Equals(y);
        }

        public static bool operator !=(ValueObject<T> x, ValueObject<T> y)
        {
            return !(x == y);
        }

        #endregion /Methods

    }
}
