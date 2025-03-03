using SQLite;

namespace CarWorkshopApp.Models
{
    public class Customer : BaseModel
    {
        public string Name { get; set; }
        public string Address { get; set; }
    }
}