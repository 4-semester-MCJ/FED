using System.IO;
using CarWorkshopAwesomeApp;
using CarWorkshopAwesomeApp.Services;
using CarWorkshopAwesomeApp.ViewModels;
using CarWorkshopAwesomeApp.Views;
using Microsoft.Extensions.DependencyInjection;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder.UseMauiApp<App>(); 

        // Register Services
        string dbPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CarWorkshop.db");
        Console.WriteLine($"Corrected Database Path: {dbPath}");

        builder.Services.AddSingleton<DatabaseService>(provider => new DatabaseService(dbPath));

        // Register ViewModels
        builder.Services.AddTransient<TaskOverviewViewModel>();
        builder.Services.AddTransient<TaskBookingViewModel>();

        // Register Pages
        builder.Services.AddTransient<TaskOverviewPage>();

        return builder.Build();
    }
}
