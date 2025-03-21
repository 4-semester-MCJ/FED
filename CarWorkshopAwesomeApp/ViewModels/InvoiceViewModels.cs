using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using CarWorkshopAwesomeApp.Models;
using CarWorkshopAwesomeApp.Services;
using Microsoft.Maui.Controls;

namespace CarWorkshopAwesomeApp.ViewModels;

public class InvoiceViewModel : INotifyPropertyChanged
{
    private readonly DatabaseService _databaseService;
    private TaskModel _selectedTask;
    private string _mechanicName;
    private int _hoursWorked;
    private decimal _hourlyRate = 35; // Default hourly rate
    private decimal _discountPercentage;
    private decimal _totalCost;
    private string _taskDescription;
    private string _customerName;

    public TaskModel SelectedTask
    {
        get => _selectedTask;
        set
        {
            _selectedTask = value;
            OnPropertyChanged();
            if (value != null)
            {
                TaskDescription = value.TaskDescription;
                CustomerName = value.CustomerName;
            }
        }
    }

    public string TaskDescription
    {
        get => _taskDescription;
        private set
        {
            _taskDescription = value;
            OnPropertyChanged();
        }
    }

    public string CustomerName
    {
        get => _customerName;
        private set
        {
            _customerName = value;
            OnPropertyChanged();
        }
    }

    public string MechanicName
    {
        get => _mechanicName;
        set
        {
            _mechanicName = value;
            OnPropertyChanged();
            CalculateTotalCost();
        }
    }

    public int HoursWorked
    {
        get => _hoursWorked;
        set
        {
            _hoursWorked = value;
            OnPropertyChanged();
            CalculateTotalCost();
        }
    }

    public decimal HourlyRate
    {
        get => _hourlyRate;
        set
        {
            _hourlyRate = value;
            OnPropertyChanged();
            CalculateTotalCost();
        }
    }

    public decimal DiscountPercentage
    {
        get => _discountPercentage;
        set
        {
            _discountPercentage = value;
            OnPropertyChanged();
            CalculateTotalCost();
        }
    }

    public decimal TotalCost
    {
        get => _totalCost;
        private set
        {
            _totalCost = value;
            OnPropertyChanged();
        }
    }

    // New Property: Calculates Total Material Cost (Summing Price * Quantity)
    public decimal TotalMaterialCost => Materials.Sum(m => m.Price * m.Quantity);

    public decimal LaborCost => HoursWorked * HourlyRate;

    public ObservableCollection<MaterialItem> Materials { get; set; }
    public ObservableCollection<TaskModel> AvailableTasks { get; set; }

    public Command AddMaterialCommand { get; }
    public Command RemoveMaterialCommand { get; }

    public InvoiceViewModel(DatabaseService databaseService)
    {
        _databaseService = databaseService;
        Materials = new ObservableCollection<MaterialItem>();
        AvailableTasks = new ObservableCollection<TaskModel>();

        // Subscribe to material changes
        Materials.CollectionChanged += (s, e) =>
        {
            if (e.NewItems != null)
            {
                foreach (MaterialItem item in e.NewItems)
                {
                    item.PriceChanged += CalculateTotalCost;
                    item.QuantityChanged += CalculateTotalCost;
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

        LoadTasks();
    }

    private async void LoadTasks()
    {
        var tasks = await _databaseService.GetTasksByDateAsync(DateTime.Now);
        AvailableTasks.Clear();
        foreach (var task in tasks)
        {
            AvailableTasks.Add(task);
        }
    }

    private void CalculateTotalCost()
    {
        decimal materialCost = TotalMaterialCost;
        decimal laborCost = LaborCost;
        decimal rawTotal = laborCost + materialCost;

        decimal discountAmount = rawTotal * (DiscountPercentage / 100);
        TotalCost = rawTotal - discountAmount;

        OnPropertyChanged(nameof(TotalMaterialCost));
        OnPropertyChanged(nameof(LaborCost));
    }

    public event PropertyChangedEventHandler PropertyChanged;
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

    public event PropertyChangedEventHandler PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
