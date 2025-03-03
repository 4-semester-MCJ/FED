// Views/NewWorkOrderPage.xaml.cs
using CarWorkshopApp.ViewModels;

namespace CarWorkshopApp.Views
{
    public partial class NewWorkOrderPage : ContentPage
    {
        public NewWorkOrderPage(NewWorkOrderViewModel viewModel)
        {
            InitializeComponent();
            BindingContext = viewModel;
        }
    }
}