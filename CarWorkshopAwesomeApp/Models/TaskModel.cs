using SQLite;
using System;

namespace CarWorkshopAwesomeApp.Models
{
    public class TaskModel
    {
        [PrimaryKey, AutoIncrement]
        public int Id { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerAddress { get; set; }
        public string? CarMake { get; set; }
        public string? CarModel { get; set; }
        public string? RegistrationNumber { get; set; }

        [Column("HandoverDateString")]  // Make sure this matches exactly
        public string? HandoverDateString { get; set; } // This must exist in SQLite

        public string? TaskDescription { get; set; }

        // Helper property for working with DateTime
        [Ignore]
        public DateTime HandoverDate
        {
            get => DateTime.Parse(HandoverDateString);
            set => HandoverDateString = value.ToString("yyyy-MM-dd");  // Store only YYYY-MM-DD
        }
    }
}
