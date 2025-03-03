// Views/WorkDetailsPage.xaml.cs
using CarWorkshopApp.ViewModels;

namespace CarWorkshopApp.Views
{
    public partial class WorkDetailsPage : ContentPage
    {
        private readonly WorkDetailsViewModel _viewModel;
        
        public WorkDetailsPage(WorkDetailsViewModel viewModel)
        {
            InitializeComponent();
            _viewModel = viewModel;
            BindingContext = viewModel;
        }
        
        protected override async void OnAppearing()
        {
            base.OnAppearing();
            await _viewModel.LoadWorkOrderCommand.ExecuteAsync(null);
        }
    }
}