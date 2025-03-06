using System;
using Microsoft.Maui.Controls;
using Microsoft.Extensions.DependencyInjection;
using CarWorkshopAwesomeApp.Views;

namespace CarWorkshopAwesomeApp
{
    public partial class AppShell : Shell
    {
        private readonly IServiceProvider _serviceProvider;

        public AppShell(IServiceProvider serviceProvider)
        {
            InitializeComponent();
            _serviceProvider = serviceProvider ?? throw new ArgumentNullException(nameof(serviceProvider));

            Routing.RegisterRoute(nameof(TaskOverviewPage), typeof(TaskOverviewPage));
        }

        private async void OpenTaskOverviewPage(object sender, EventArgs e)
        {
            var page = _serviceProvider.GetService<TaskOverviewPage>();
            if (page != null)
            {
                await Shell.Current.Navigation.PushAsync(page);
            }
            else
            {
                Console.WriteLine("⚠️ TaskOverviewPage could not be resolved from DI.");
            }
        }
    }
}
