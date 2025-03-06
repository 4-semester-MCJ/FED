using CommunityToolkit.Mvvm.ComponentModel;

namespace CarWorkshopAwesomeApp.Models;

public partial class Service : ObservableObject
{
    [ObservableProperty]
    private string taskDescription;

    [ObservableProperty]
    public DateTime HandoverDate { get; set; }
}
