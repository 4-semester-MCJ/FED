using CarWorkshopAwesomeApp.ViewModels;
using Microsoft.Maui.Controls;

namespace CarWorkshopAwesomeApp.Views
{
    public partial class TaskOverviewPage : ContentPage
    {
        public TaskOverviewPage(TaskOverviewViewModel viewModel)
        {
            InitializeComponent();
            BindingContext = viewModel; 
        }
    }
}
