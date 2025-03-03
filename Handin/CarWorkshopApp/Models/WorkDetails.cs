using SQLite;

namespace CarWorkshopApp.Models
{
    public class WorkDetails : BaseModel
    {
        [ForeignKey(typeof(WorkOrder))]
        public int WorkOrderId { get; set; }
        
        public string MechanicName { get; set; }
        public double HoursWorked { get; set; }
        public double HourlyRate { get; set; }
        public string MaterialsUsed { get; set; }
        public double MaterialsCost { get; set; }
    }
}