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
            if (_databaseService == null)
            {
                return;
            }

            var tasks = await _databaseService.GetTasksByDateAsync(SelectedDate);

            if (tasks == null || tasks.Count == 0)
            {
                Tasks.Clear();
                return;
            }

            Tasks.Clear();
            foreach (var task in tasks)
            {
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
