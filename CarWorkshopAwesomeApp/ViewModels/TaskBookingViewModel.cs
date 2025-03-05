using CarWorkshopAwesomeApp.Models;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace CarWorkshopAwesomeApp.ViewModels;

public class TaskBookingViewModel : INotifyPropertyChanged
{
    private Customer _customer = new Customer();
    private Car _car = new Car();
    private Service _service = new Service();

    public string? CustomerName
    {
        get => _customer.Name;
        set { _customer.Name = value; OnPropertyChanged(); }
    }

    public string? CustomerAddress
    {
        get => _customer.Address;
        set { _customer.Address = value; OnPropertyChanged(); }
    }

    public string? CarMake
    {
        get => _car.Make;
        set { _car.Make = value; OnPropertyChanged(); }
    }

    public string? CarModel
    {
        get => _car.Model;
        set { _car.Model = value; OnPropertyChanged(); }
    }

    public string? RegistrationNumber
    {
        get => _car.RegistrationNumber;
        set { _car.RegistrationNumber = value; OnPropertyChanged(); }
    }

    public string? TaskDescription
    {
        get => _service.TaskDescription;
        set { _service.TaskDescription = value; OnPropertyChanged(); }
    }

    public DateTime HandoverDate
    {
        get => _service.HandoverDate;
        set { _service.HandoverDate = value; OnPropertyChanged(); }
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
    private void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
