using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using CarWorkshopAwesomeApp.Models;
using CarWorkshopAwesomeApp.Services;

namespace CarWorkshopAwesomeApp.ViewModels
{
    public class TaskOverviewViewModel : INotifyPropertyChanged
{
    private DateTime _selectedDate = DateTime.Now.Date;
    private readonly DatabaseService _databaseService;

    public ObservableCollection<TaskModel> Tasks { get; set; } = new ObservableCollection<TaskModel>();

    public DateTime SelectedDate
    {
        get => _selectedDate;
        set
        {
            _selectedDate = value.Date;
            OnPropertyChanged();
            LoadTasksForDate();
        }
    }

      public TaskOverviewViewModel() 
    {
        // Initialize with default behavior, or leave it empty for XAML binding
    }

    public TaskOverviewViewModel(DatabaseService databaseService)
    {
        _databaseService = databaseService ?? throw new ArgumentNullException(nameof(databaseService));
        LoadTasksForDate(); 
    }

    private async void LoadTasksForDate()
    {
        Console.WriteLine($"🔎 LoadTasksForDate() called for {SelectedDate:yyyy-MM-dd}");

        if (_databaseService == null)
        {
            Console.WriteLine("⚠️ DatabaseService is NULL in LoadTasksForDate!");
            return;
        }

        Console.WriteLine($"🔎 Fetching tasks for date: {SelectedDate:yyyy-MM-dd}");
        var tasks = await _databaseService.GetTasksByDateAsync(SelectedDate);

        if (tasks == null || tasks.Count == 0)
        {
            Console.WriteLine($"⚠️ No tasks found for date: {SelectedDate:yyyy-MM-dd}");
            Tasks.Clear();
            return;
        }

        Console.WriteLine($"✅ Found {tasks.Count} tasks for {SelectedDate:yyyy-MM-dd}");

        Tasks.Clear();
        foreach (var task in tasks)
        {
            Console.WriteLine($"📌 Task: {task.Id} - {task.TaskDescription}, Date: {task.HandoverDateString}");
            Tasks.Add(task);
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}

}
