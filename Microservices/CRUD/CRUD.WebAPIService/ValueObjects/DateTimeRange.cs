using System;

namespace CRUD.APIService.ValueObjects
{
    public class DateTimeRange : ValueObject<DateTimeRange>
    {

        #region Properties

        public DateTime Start { get; private set; }

        public DateTime End { get; private set; }

        #endregion /Properties

        #region Constructors

        public DateTimeRange(DateTime start, DateTime end)
        {
            this.Start = start;
            this.End = end;
        }

        public DateTimeRange(DateTime start, TimeSpan duration)
        {
            this.Start = start;
            this.End = start.Add(duration);
        }
        protected DateTimeRange() { }

        #endregion /Constructors

        #region Methods

        public int DurationInMinutes()
        {
            return (this.End - this.Start).Minutes;
        }

        public DateTimeRange NewEnd(DateTime newEnd)
        {
            return new DateTimeRange(this.Start, newEnd);
        }
        public DateTimeRange NewDuration(TimeSpan newDuration)
        {
            return new DateTimeRange(this.Start, newDuration);
        }
        public DateTimeRange NewStart(DateTime newStart)
        {
            return new DateTimeRange(newStart, this.End);
        }

        public static DateTimeRange CreateOneDayRange(DateTime day)
        {
            return new DateTimeRange(day, day.AddDays(1));
        }

        public static DateTimeRange CreateOneWeekRange(DateTime startDay)
        {
            return new DateTimeRange(startDay, startDay.AddDays(7));
        }

        public bool Overlaps(DateTimeRange dateTimeRange)
        {
            return this.Start < dateTimeRange.End && this.End > dateTimeRange.Start;
        }

        #endregion /Methods

    }
}
