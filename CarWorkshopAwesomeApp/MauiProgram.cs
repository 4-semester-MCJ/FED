using CarWorkshopAwesomeApp.Services;
using System.IO;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder.UseMauiApp<App>();

        string dbPath = Path.Combine(FileSystem.AppDataDirectory, "CarWorkshop.db");
        builder.Services.AddSingleton(new DatabaseService(dbPath));

        return builder.Build();
    }
}