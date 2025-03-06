using CommunityToolkit.Mvvm.ComponentModel;

namespace CarWorkshopAwesomeApp.Models;

public partial class Customer : ObservableObject
{
    [ObservableProperty]
    private string? _name;

    [ObservableProperty]
    private string? _address;
}
