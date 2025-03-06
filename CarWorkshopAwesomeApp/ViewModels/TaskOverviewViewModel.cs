using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using CarWorkshopAwesomeApp.Models;
using CarWorkshopAwesomeApp.Services;
using System;

namespace CarWorkshopAwesomeApp.ViewModels;

public class TaskOverviewViewModel : INotifyPropertyChanged
{
    private DateTime _selectedDate = DateTime.Now;
    private readonly DatabaseService _databaseService;
    public ObservableCollection<TaskModel> Tasks { get; set; }

    public DateTime SelectedDate
    {
        get => _selectedDate;
        set
        {
            _selectedDate = value;
            OnPropertyChanged();
            LoadTasksForDate();
        }
    } 
    // Parameterless constructor for XAML
    public TaskOverviewViewModel()
    {
    }

    // Constructor with DatabaseService parameter for DI
    public TaskOverviewViewModel(DatabaseService databaseService)
    {
        _databaseService = databaseService;
        Tasks = new ObservableCollection<TaskModel>();
        LoadTasksForDate();
    }

    private async void LoadTasksForDate()
    {
        try 
        {
            var tasksForDate = await _databaseService.GetTasksByDateAsync(SelectedDate);

            Tasks.Clear();
            foreach (var task in tasksForDate)
            {
                Tasks.Add(task);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}