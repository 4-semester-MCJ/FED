// MauiProgram.cs
using Microsoft.Extensions.Logging;
using CarWorkshopApp.Database;
using CarWorkshopApp.ViewModels;
using CarWorkshopApp.Views;

namespace CarWorkshopApp
{
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

            // Register services
            builder.Services.AddSingleton<DatabaseService>();

            // Register view models
            builder.Services.AddSingleton<NewWorkOrderViewModel>();
            builder.Services.AddSingleton<CalendarViewModel>();
            builder.Services.AddTransient<WorkDetailsViewModel>();

            // Register views
            builder.Services.AddSingleton<NewWorkOrderPage>();
            builder.Services.AddSingleton<CalendarPage>();
            builder.Services.AddTransient<WorkDetailsPage>();

#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}