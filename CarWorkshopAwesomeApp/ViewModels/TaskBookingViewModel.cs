using System.ComponentModel;
using System.Runtime.CompilerServices;
using CarWorkshopAwesomeApp.Models;
using CarWorkshopAwesomeApp.Services;
using System.Threading.Tasks;
using System.Windows.Input;
using System;

namespace CarWorkshopAwesomeApp.ViewModels;

public class TaskBookingViewModel : INotifyPropertyChanged
{
    private string _customerName;
    private string _customerAddress;
    private string _carMake;
    private string _carModel;
    private string _registrationNumber;
    private DateTime _handoverDate = DateTime.Now;
    private string _taskDescription;
    private readonly DatabaseService _databaseService;

    public string CustomerName
    {
        get => _customerName;
        set { _customerName = value; OnPropertyChanged(); }
    }

    public string CustomerAddress
    {
        get => _customerAddress;
        set { _customerAddress = value; OnPropertyChanged(); }
    }

    public string CarMake
    {
        get => _carMake;
        set { _carMake = value; OnPropertyChanged(); }
    }

    public string CarModel
    {
        get => _carModel;
        set { _carModel = value; OnPropertyChanged(); }
    }

    public string RegistrationNumber
    {
        get => _registrationNumber;
        set { _registrationNumber = value; OnPropertyChanged(); }
    }

    public DateTime HandoverDate
    {
        get => _handoverDate;
        set { _handoverDate = value; OnPropertyChanged(); }
    }

    public string TaskDescription
    {
        get => _taskDescription;
        set { _taskDescription = value; OnPropertyChanged(); }
    }

    public ICommand SaveTaskCommand { get; }

    
    // Parameterless constructor for XAML
    public TaskBookingViewModel()
    {
    }

    // Constructor with DatabaseService parameter for DI
    public TaskBookingViewModel(DatabaseService databaseService)
    {
        _databaseService = databaseService;
        SaveTaskCommand = new Command(async () => await SaveTaskAsync());
    }

    private async Task SaveTaskAsync()
    {
        var newTask = new TaskModel
        {
            CustomerName = CustomerName,
            CustomerAddress = CustomerAddress,
            CarMake = CarMake,
            CarModel = CarModel,
            RegistrationNumber = RegistrationNumber,
            HandoverDate = HandoverDate,
            TaskDescription = TaskDescription
        };

        await _databaseService.SaveTaskAsync(newTask);
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}