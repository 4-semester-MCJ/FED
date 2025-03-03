using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CarWorkshopApp.Database;
using CarWorkshopApp.Models;
using System.Collections.ObjectModel;

namespace CarWorkshopApp.ViewModels
{
    [QueryProperty(nameof(WorkOrderId), "WorkOrderId")]
    public partial class WorkDetailsViewModel : BaseViewModel
    {
        private readonly DatabaseService _databaseService;
        
        [ObservableProperty]
        private int _workOrderId;
        
        [ObservableProperty]
        private string _customerName;
        
        [ObservableProperty]
        private string _vehicleInfo;
        
        [ObservableProperty]
        private string _mechanicName;
        
        [ObservableProperty]
        private double _hoursWorked;
        
        [ObservableProperty]
        private double _hourlyRate = 450; // Default hourly rate
        
        [ObservableProperty]
        private string _materialsUsed;
        
        [ObservableProperty]
        private double _materialsCost;
        
        [ObservableProperty]
        private double _totalCost;
        
        public WorkDetailsViewModel(DatabaseService databaseService)
        {
            _databaseService = databaseService;
            Title = "Work Details";
        }
        
        [RelayCommand]
        private async Task LoadWorkOrder()
        {
            if (IsBusy || WorkOrderId == 0)
                return;
                
            IsBusy = true;
            
            try
            {
                var workOrder = await _databaseService.GetByIdAsync<WorkOrder>(WorkOrderId);
                var vehicle = await _databaseService.GetByIdAsync<Vehicle>(workOrder.VehicleId);
                var customer = await _databaseService.GetByIdAsync<Customer>(vehicle.CustomerId);
                
                CustomerName = customer.Name;
                VehicleInfo = $"{vehicle.Make} {vehicle.Model} ({vehicle.RegistrationNumber})";
                
                // Load work details if already exists
                var workDetails = (await _databaseService.GetAsync<WorkDetails>(wd => wd.WorkOrderId == WorkOrderId)).FirstOrDefault();
                
                if (workDetails != null)
                {
                    MechanicName = workDetails.MechanicName;
                    HoursWorked = workDetails.HoursWorked;
                    HourlyRate = workDetails.HourlyRate;
                    MaterialsUsed = workDetails.MaterialsUsed;
                    MaterialsCost = workDetails.MaterialsCost;
                    
                    CalculateTotalCost();
                }
            }
            catch (Exception ex)
            {
                await Application.Current.MainPage.DisplayAlert("Error", $"An error occurred: {ex.Message}", "OK");
            }
            finally
            {
                IsBusy = false;
            }
        }
        
        partial void OnHoursWorkedChanged(double value)
        {
            CalculateTotalCost();
        }
        
        partial void OnHourlyRateChanged(double value)
        {
            CalculateTotalCost();
        }
        
        partial void OnMaterialsCostChanged(double value)
        {
            CalculateTotalCost();
        }
        
        private void CalculateTotalCost()
        {
            TotalCost = (HoursWorked * HourlyRate) + MaterialsCost;
        }
        
        [RelayCommand]
        private async Task SaveWorkDetails()
        {
            if (IsBusy || WorkOrderId == 0)
                return;
                
            if (string.IsNullOrWhiteSpace(MechanicName) || 
                string.IsNullOrWhiteSpace(MaterialsUsed))
            {
                await Application.Current.MainPage.DisplayAlert("Error", "Please fill in all required fields", "OK");
                return;
            }
            
            IsBusy = true;
            
            try
            {
                // Get existing work details or create new one
                var workDetails = (await _databaseService.GetAsync<WorkDetails>(wd => wd.WorkOrderId == WorkOrderId)).FirstOrDefault() 
                                  ?? new WorkDetails { WorkOrderId = WorkOrderId };
                
                workDetails.MechanicName = MechanicName;
                workDetails.HoursWorked = HoursWorked;
                workDetails.HourlyRate = HourlyRate;
                workDetails.MaterialsUsed = MaterialsUsed;
                workDetails.MaterialsCost = MaterialsCost;
                
                await _databaseService.SaveAsync(workDetails);
                
                // Mark work order as completed
                var workOrder = await _databaseService.GetByIdAsync<WorkOrder>(WorkOrderId);
                workOrder.IsCompleted = true;
                await _databaseService.SaveAsync(workOrder);
                
                await Application.Current.MainPage.DisplayAlert("Success", "Work details saved successfully", "OK");
                
                // Navigate back
                await Shell.Current.GoToAsync("..");
            }
            catch (Exception ex)
            {
                await Application.Current.MainPage.DisplayAlert("Error", $"An error occurred: {ex.Message}", "OK");
            }
            finally
            {
                IsBusy = false;
            }
        }
    }
}