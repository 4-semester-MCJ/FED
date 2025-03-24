using CarWorkshopAwesomeApp.ViewModels;

namespace CarWorkshopAwesomeApp.Views;

public partial class InvoicePage : ContentPage
{
    private readonly InvoiceViewModel _viewModel;

    public InvoicePage(InvoiceViewModel viewModel)
    {
        InitializeComponent();
        BindingContext = viewModel;
        _viewModel = viewModel;
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await _viewModel.LoadTasks();
    }
}
