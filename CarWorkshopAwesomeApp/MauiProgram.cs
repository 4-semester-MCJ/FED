using System.IO;
using CarWorkshopAwesomeApp;  // ✅ Ensure this is included
using CarWorkshopAwesomeApp.Services;
using CarWorkshopAwesomeApp.ViewModels;
using CarWorkshopAwesomeApp.Views;
using Microsoft.Extensions.DependencyInjection;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder.UseMauiApp<App>();  // ✅ Now App is recognized

        // ✅ Ensure the database is created in the correct location
        string dbPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CarWorkshop.db");
        Console.WriteLine($"🗂️ Corrected Database Path: {dbPath}");

        builder.Services.AddSingleton<DatabaseService>(provider => new DatabaseService(dbPath));

        // Register ViewModels
        builder.Services.AddTransient<TaskOverviewViewModel>();
        builder.Services.AddTransient<TaskBookingViewModel>();

        // Register Pages
        builder.Services.AddTransient<TaskOverviewPage>();

        return builder.Build();
    }
}
