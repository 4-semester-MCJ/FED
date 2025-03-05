using CommunityToolkit.Mvvm.ComponentModel;

namespace CarWorkshopAwesomeApp.Models;

public partial class Customer : ObservableObject
{
    [ObservableProperty]
    private string name;

    [ObservableProperty]
    private string address;
}
