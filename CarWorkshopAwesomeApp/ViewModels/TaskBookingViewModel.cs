using System.ComponentModel;
using System.Runtime.CompilerServices;

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

    public Command BookTaskCommand { get; }

    public TaskBookingViewModel()
    {
        BookTaskCommand = new Command(BookTask);
    }

    private void BookTask()
    {
        // Simulate saving task (you can extend this to save to a database)
        Console.WriteLine($"Task booked: {CustomerName}, {CarMake} {CarModel}, {RegistrationNumber}");
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
