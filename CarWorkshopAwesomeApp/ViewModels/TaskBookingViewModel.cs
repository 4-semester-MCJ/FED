using CommunityToolkit.Mvvm.ComponentModel;
using CarWorkshopAwesomeApp.Models;
using System.Windows.Input;

namespace CarWorkshopAwesomeApp.ViewModels;

public partial class TaskBookingViewModel : ObservableObject
{
    private Customer _customer;
    private Car _car;
    private Service _service;

    public TaskBookingViewModel()
    {
        Customer = new Customer();
        Car = new Car();
        Service = new Service();
        BookTaskCommand = new Command(BookTask);
    }

    public Customer Customer
    {
        get => _customer;
        set => SetProperty(ref _customer, value);
    }

    public Car Car
    {
        get => _car;
        set => SetProperty(ref _car, value);
    }

    public Service Service
    {
        get => _service;
        set => SetProperty(ref _service, value);
    }

    public ICommand BookTaskCommand { get; }

    private void BookTask()
    {
        Console.WriteLine($"Task booked: {Customer.Name}, {Car.Make} {Car.Model}, {Car.RegistrationNumber}");
    }
}
