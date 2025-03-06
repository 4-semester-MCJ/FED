using SQLite;
using System;

namespace CarWorkshopAwesomeApp.Models;

public class TaskModel
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

    public string CustomerName { get; set; }
    public string CustomerAddress { get; set; }
    public string CarMake { get; set; }
    public string CarModel { get; set; }
    public string RegistrationNumber { get; set; }
    public DateTime HandoverDate { get; set; }
    public string TaskDescription { get; set; }
}