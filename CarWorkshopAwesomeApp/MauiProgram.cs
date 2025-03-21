using System.IO;
using CarWorkshopAwesomeApp;
using CarWorkshopAwesomeApp.Services;
using CarWorkshopAwesomeApp.ViewModels;
using CarWorkshopAwesomeApp.Views;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CarWorkshopAwesomeApp;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
            });

        // Register Services
        string dbPath = Path.Combine(Environment.GetFolderPath(
            Environment.SpecialFolder.LocalApplicationData), "CarWorkshop.db");

        builder.Services.AddSingleton<DatabaseService>(provider => new DatabaseService(dbPath));

        // Register ViewModels
        builder.Services.AddTransient<TaskBookingViewModel>();
        builder.Services.AddTransient<TaskOverviewViewModel>();
        builder.Services.AddTransient<InvoiceViewModel>();
        builder.Services.AddTransient<MainViewModel>();

        // Register Pages
        builder.Services.AddTransient<TaskBookingPage>();
        builder.Services.AddTransient<TaskOverviewPage>();
        builder.Services.AddTransient<InvoicePage>();
        builder.Services.AddTransient<MainPage>();

#if DEBUG
        builder.Logging.AddDebug();
#endif

        return builder.Build();
    }
}
