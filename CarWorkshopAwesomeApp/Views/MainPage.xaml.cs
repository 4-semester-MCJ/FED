using CarWorkshopAwesomeApp.ViewModels;

namespace CarWorkshopAwesomeApp.Views;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent(); // This must be here
        BindingContext = new MainViewModel(); // Ensure ViewModel is set
    }
}
