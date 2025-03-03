using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CarWorkshopApp.Database;
using CarWorkshopApp.Models;
using System.Collections.ObjectModel;

namespace CarWorkshopApp.ViewModels
{
    public partial class NewWorkOrderViewModel : BaseViewModel
    {
        private readonly DatabaseService _databaseService;
        
        [ObservableProperty]
        private string _customerName;
        
        [ObservableProperty]
        private string _customerAddress;
        
        [ObservableProperty]
        private string _vehicleMake;
        
        [ObservableProperty]
        private string _vehicleModel;
        
        [ObservableProperty]
        private string _registrationNumber;
        
        [ObservableProperty]
        private DateTime _deliveryDate = DateTime.Today;
        
        [ObservableProperty]
        private TimeSpan _deliveryTime = new TimeSpan(8, 0, 0);
        
        [ObservableProperty]
        private string _workDescription;
        
        public NewWorkOrderViewModel(DatabaseService databaseService)
        {
            _databaseService = databaseService;
            Title = "New Work Order";
        }
        
        [RelayCommand]
        private async Task SaveWorkOrder()
        {
            if (IsBusy)
                return;
                
            if (string.IsNullOrWhiteSpace(CustomerName) || 
                string.IsNullOrWhiteSpace(CustomerAddress) ||
                string.IsNullOrWhiteSpace(VehicleMake) ||
                string.IsNullOrWhiteSpace(VehicleModel) ||
                string.IsNullOrWhiteSpace(RegistrationNumber) ||
                string.IsNullOrWhiteSpace(WorkDescription))
            {
                await Application.Current.MainPage.DisplayAlert("Error", "Please fill in all required fields", "OK");
                return;
            }
            
            IsBusy = true;
            
            try
            {
                // Save customer
                var customer = new Customer
                {
                    Name = CustomerName,
                    Address = CustomerAddress
                };
                
                await _databaseService.SaveAsync(customer);
                
                // Save vehicle
                var vehicle = new Vehicle
                {
                    Make = VehicleMake,
                    Model = VehicleModel,
                    RegistrationNumber = RegistrationNumber,
                    CustomerId = customer.Id
                };
                
                await _databaseService.SaveAsync(vehicle);
                
                // Save work order
                var workOrder = new WorkOrder
                {
                    VehicleId = vehicle.Id,
                    DeliveryDateTime = DeliveryDate.Add(DeliveryTime),
                    WorkDescription = WorkDescription,
                    IsCompleted = false
                };
                
                await _databaseService.SaveAsync(workOrder);
                
                // Reset form
                CustomerName = string.Empty;
                CustomerAddress = string.Empty;
                VehicleMake = string.Empty;
                VehicleModel = string.Empty;
                RegistrationNumber = string.Empty;
                DeliveryDate = DateTime.Today;
                DeliveryTime = new TimeSpan(8, 0, 0);
                WorkDescription = string.Empty;
                
                await Application.Current.MainPage.DisplayAlert("Success", "Work order saved successfully", "OK");
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