using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace CarWorkshopAwesomeApp.ViewModels;

public class InvoiceViewModel : INotifyPropertyChanged
{
    private string _mechanicName;
    private int _hoursWorked;
    private decimal _hourlyRate = 500; // Default hourly rate in currency
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

    public decimal TotalCost
    {
        get => _totalCost;
        private set { _totalCost = value; OnPropertyChanged(); }
    }

    public ObservableCollection<MaterialItem> Materials { get; set; }

    public Command AddMaterialCommand { get; }
    public Command RemoveMaterialCommand { get; }

    public InvoiceViewModel()
    {
        Materials = new ObservableCollection<MaterialItem>();
        AddMaterialCommand = new Command(() => Materials.Add(new MaterialItem()));
        RemoveMaterialCommand = new Command<MaterialItem>(item => Materials.Remove(item));
    }

    private void CalculateTotalCost()
    {
        decimal materialCost = Materials.Sum(m => m.Price);
        TotalCost = (HoursWorked * HourlyRate) + materialCost;
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}

public class MaterialItem : INotifyPropertyChanged
{
    private string _name;
    private decimal _price;

    public string Name
    {
        get => _name;
        set { _name = value; OnPropertyChanged(); }
    }

    public decimal Price
    {
        get => _price;
        set { _price = value; OnPropertyChanged(); }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
