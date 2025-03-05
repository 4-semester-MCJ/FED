using CommunityToolkit.Mvvm.ComponentModel;

namespace CarWorkshopAwesomeApp.Models;

public partial class Car : ObservableObject
{
    [ObservableProperty]
    private string make;

    [ObservableProperty]
    private string model;

    [ObservableProperty]
    private string registrationNumber;
}
