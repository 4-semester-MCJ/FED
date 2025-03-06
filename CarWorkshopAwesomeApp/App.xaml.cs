using CarWorkshopAwesomeApp.Views;
using Microsoft.Maui.Controls;
using System;

namespace CarWorkshopAwesomeApp
{
    public partial class App : Application
    {
        public App(IServiceProvider serviceProvider)
        {
            InitializeComponent();

            MainPage = new AppShell(serviceProvider);
        }
    }
}
