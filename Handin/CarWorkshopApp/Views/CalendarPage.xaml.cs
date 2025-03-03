using CarWorkshopApp.ViewModels;

namespace CarWorkshopApp.Views
{
    public partial class CalendarPage : ContentPage
    {
        private readonly CalendarViewModel _viewModel;
        
        public CalendarPage(CalendarViewModel viewModel)
        {
            InitializeComponent();
            _viewModel = viewModel;
            BindingContext = viewModel;
        }
        
        protected override async void OnAppearing()
        {
            base.OnAppearing();
            await _viewModel.LoadWorkOrdersCommand.ExecuteAsync(null);
        }
        
        private async void OnDateSelected(object sender, DateChangedEventArgs e)
        {
            await _viewModel.DateSelectedCommand.ExecuteAsync(null);
        }
        
        private async void OnWorkOrderSelected(object sender, SelectionChangedEventArgs e)
        {
            if (e.CurrentSelection.FirstOrDefault() is WorkOrderViewModel selectedWorkOrder)
            {
                await _viewModel.WorkOrderSelectedCommand.ExecuteAsync(selectedWorkOrder);
                ((CollectionView)sender).SelectedItem = null;
            }
        }
    }
}