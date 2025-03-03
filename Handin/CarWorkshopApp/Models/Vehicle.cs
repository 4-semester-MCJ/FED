using SQLite;

namespace CarWorkshopApp.Models
{
    public class Vehicle : BaseModel
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public string RegistrationNumber { get; set; }
        
        [ForeignKey(typeof(Customer))]
        public int CustomerId { get; set; }
    }
}