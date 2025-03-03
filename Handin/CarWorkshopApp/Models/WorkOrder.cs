using SQLite;

namespace CarWorkshopApp.Models
{
    public class WorkOrder : BaseModel
    {
        [ForeignKey(typeof(Vehicle))]
        public int VehicleId { get; set; }
        
        public DateTime DeliveryDateTime { get; set; }
        public string WorkDescription { get; set; }
        public bool IsCompleted { get; set; }
    }
}