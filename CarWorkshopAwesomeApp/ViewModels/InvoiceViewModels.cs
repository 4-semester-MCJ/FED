using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;

namespace CarWorkshopAwesomeApp.ViewModels;

public class InvoiceViewModel : INotifyPropertyChanged
{
    private string _mechanicName;
    private int _hoursWorked;
    private decimal _hourlyRate = 35; // Default hourly rate
    private decimal _discountPercentage;
    private decimal _totalCost;

    public string MechanicName
    {
        get => _mechanicName;
        set { _mechanicName = value; OnPropertyChanged(); CalculateTotalCost(); }
    }

    public int HoursWorked
    {
        get => _hoursWorked;
        set { _hoursWorked = value; OnPropertyChanged(); CalculateTotalCost(); }
    }

    public decimal HourlyRate
    {
        get => _hourlyRate;
        set { _hourlyRate = value; OnPropertyChanged(); CalculateTotalCost(); }
    }

    public decimal DiscountPercentage
    {
        get => _discountPercentage;
        set { _discountPercentage = value; OnPropertyChanged(); CalculateTotalCost(); }
    }

    public decimal TotalCost
    {
        get => _totalCost;
        private set { _totalCost = value; OnPropertyChanged(); }
    }

    // New Property: Calculates Total Material Cost (Summing Price * Quantity)
    public decimal TotalMaterialCost => Materials.Sum(m => m.Price * m.Quantity);

    public ObservableCollection<MaterialItem> Materials { get; set; }

    public Command AddMaterialCommand { get; }
    public Command RemoveMaterialCommand { get; }

    public InvoiceViewModel()
    {
        Materials = new ObservableCollection<MaterialItem>();

        // Subscribe to material changes
        Materials.CollectionChanged += (s, e) =>
        {
            if (e.NewItems != null)
            {
                foreach (MaterialItem item in e.NewItems)
                {
                    item.PriceChanged += CalculateTotalCost;
                    item.QuantityChanged += CalculateTotalCost; // Now responds to quantity changes
                }
            }
            if (e.OldItems != null)
            {
                foreach (MaterialItem item in e.OldItems)
                {
                    item.PriceChanged -= CalculateTotalCost;
                    item.QuantityChanged -= CalculateTotalCost;
                }
            }
            CalculateTotalCost();
        };

        AddMaterialCommand = new Command(() =>
        {
            var newItem = new MaterialItem();
            newItem.PriceChanged += CalculateTotalCost;
            newItem.QuantityChanged += CalculateTotalCost;
            Materials.Add(newItem);
        });

        RemoveMaterialCommand = new Command<MaterialItem>(item =>
        {
            if (item != null)
            {
                item.PriceChanged -= CalculateTotalCost;
                item.QuantityChanged -= CalculateTotalCost;
                Materials.Remove(item);
            }
        });
    }

    private void CalculateTotalCost()
    {
        decimal materialCost = TotalMaterialCost; // Now includes quantity
        decimal rawTotal = (HoursWorked * HourlyRate) + materialCost;

        // Apply discount
        decimal discountAmount = rawTotal * (DiscountPercentage / 100);
        TotalCost = rawTotal - discountAmount;

        OnPropertyChanged(nameof(TotalMaterialCost)); // Ensure UI updates
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}

// Updated MaterialItem Class with Quantity Tracking
public class MaterialItem : INotifyPropertyChanged
{
    private string _name;
    private decimal _price;
    private int _quantity = 1; // Default quantity = 1

    public string Name
    {
        get => _name;
        set { _name = value; OnPropertyChanged(); }
    }

    public decimal Price
    {
        get => _price;
        set { _price = value; OnPropertyChanged(); PriceChanged?.Invoke(); }
    }

    public int Quantity
    {
        get => _quantity;
        set { _quantity = value; OnPropertyChanged(); QuantityChanged?.Invoke(); }
    }

    public event Action PriceChanged;
    public event Action QuantityChanged; // New event for quantity changes

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
