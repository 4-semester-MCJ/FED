var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

// statiske filer
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
