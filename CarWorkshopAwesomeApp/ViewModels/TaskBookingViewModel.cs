using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Windows.Input;
using CarWorkshopAwesomeApp.Models;
using CarWorkshopAwesomeApp.Services;
using Microsoft.Maui.Controls;

namespace CarWorkshopAwesomeApp.ViewModels
{
    public class TaskBookingViewModel : INotifyPropertyChanged
    {
        private string _customerName;
        private string _customerAddress;
        private string _carMake;
        private string _carModel;
        private string _registrationNumber;
        private DateTime _handoverDate = DateTime.Now;
        private string _taskDescription;
        private readonly DatabaseService _databaseService;

        public string CustomerName
        {
            get => _customerName;
            set
            {
                _customerName = value;
                OnPropertyChanged();
            }
        }

        public string CustomerAddress
        {
            get => _customerAddress;
            set
            {
                _customerAddress = value;
                OnPropertyChanged();
            }
        }

        public string CarMake
        {
            get => _carMake;
            set
            {
                _carMake = value;
                OnPropertyChanged();
            }
        }

        public string CarModel
        {
            get => _carModel;
            set
            {
                _carModel = value;
                OnPropertyChanged();
            }
        }

        public string RegistrationNumber
        {
            get => _registrationNumber;
            set
            {
                _registrationNumber = value;
                OnPropertyChanged();
            }
        }

        public DateTime HandoverDate
        {
            get => _handoverDate;
            set
            {
                _handoverDate = value;
                OnPropertyChanged();
            }
        }

        public string TaskDescription
        {
            get => _taskDescription;
            set
            {
                _taskDescription = value;
                OnPropertyChanged();
            }
        }

        public ICommand SaveTaskCommand { get; }

        // Constructor for XAML binding (No parameter)
        public TaskBookingViewModel() : this(new DatabaseService(
            Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CarWorkshop.db")))
        {
        }

        // Constructor with DatabaseService parameter (For DI)
        public TaskBookingViewModel(DatabaseService databaseService)
        {
            _databaseService = databaseService ?? throw new ArgumentNullException(nameof(databaseService));
            SaveTaskCommand = new Command(async () => await SaveTaskAsync());
        }

        // Save task function
        public async Task SaveTaskAsync()
        {
            var newTask = new TaskModel
            {
                CustomerName = CustomerName,
                CustomerAddress = CustomerAddress,
                CarMake = CarMake,
                CarModel = CarModel,
                RegistrationNumber = RegistrationNumber,
                HandoverDate = HandoverDate.Date,  // Ensure only the date is saved
                TaskDescription = TaskDescription
            };

            try
            {
                int rowsAffected = await _databaseService.SaveTaskAsync(newTask);

                if (rowsAffected > 0)
                {
                    // Task saved successfully
                }
                else
                {
                    // Task was NOT saved!
                }

                // Reset fields after saving
                CustomerName = string.Empty;
                CustomerAddress = string.Empty;
                CarMake = string.Empty;
                CarModel = string.Empty;
                RegistrationNumber = string.Empty;
                HandoverDate = DateTime.Now;
                TaskDescription = string.Empty;
            }
            catch (Exception ex)
            {
                // Error saving task
            }
        }

        // PropertyChanged Implementation (For MVVM Binding)
        public event PropertyChangedEventHandler? PropertyChanged;
        private void OnPropertyChanged([CallerMemberName] string? propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
