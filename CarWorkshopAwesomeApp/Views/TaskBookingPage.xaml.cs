using CarWorkshopAwesomeApp.ViewModels;

namespace CarWorkshopAwesomeApp.Views;

public partial class TaskBookingPage : ContentPage
{
    public TaskBookingPage(TaskBookingViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
    }
}
