using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace CarWorkshopAwesomeApp.ViewModels;

public class TaskOverviewViewModel : INotifyPropertyChanged
{
    private DateTime _selectedDate = DateTime.Now;
    private ObservableCollection<string> _filteredTasks;

    public DateTime SelectedDate
    {
        get => _selectedDate;
        set
        {
            if (_selectedDate != value)
            {
                _selectedDate = value;
                OnPropertyChanged();
                LoadTasksForDate();
            }
        }
    }

    public ObservableCollection<string> FilteredTasks
    {
        get => _filteredTasks;
        set
        {
            _filteredTasks = value;
            OnPropertyChanged();
        }
    }

    public TaskOverviewViewModel()
    {
        // Simulated tasks (normally, these would come from a database)
        AllTasks = new List<(DateTime date, string task)>
        {
            (DateTime.Today, "Oil change - Honda Civic"),
            (DateTime.Today, "Brake replacement - Toyota Corolla"),
            (DateTime.Today.AddDays(1), "Tire replacement - Ford Focus"),
            (DateTime.Today.AddDays(1), "Engine check - BMW X5")
        };

        FilteredTasks = new ObservableCollection<string>();
        LoadTasksForDate();
    }

    private List<(DateTime date, string task)> AllTasks;

    private void LoadTasksForDate()
    {
        // Filter tasks based on selected date
        var tasksForDate = AllTasks
            .Where(task => task.date.Date == SelectedDate.Date)
            .Select(task => task.task)
            .ToList();

        // Update ObservableCollection
        FilteredTasks.Clear();
        foreach (var task in tasksForDate)
        {
            FilteredTasks.Add(task);
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged;
    private void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
