using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CarWorkshopApp.Database;
using CarWorkshopApp.Models;
using System.Collections.ObjectModel;

namespace CarWorkshopApp.ViewModels
{
    public partial class CalendarViewModel : BaseViewModel
    {
        private readonly DatabaseService _databaseService;
        
        [ObservableProperty]
        private DateTime _selectedDate = DateTime.Today;
        
        [ObservableProperty]
        private ObservableCollection<WorkOrderViewModel> _workOrders = new();
        
        public CalendarViewModel(DatabaseService databaseService)
        {
            _databaseService = databaseService;
            Title = "Calendar";
        }
        
        [RelayCommand]
        private async Task LoadWorkOrders()
        {
            if (IsBusy)
                return;
                
            IsBusy = true;
            
            try
            {
                WorkOrders.Clear();
                
                // Get work orders for the selected date
                var startDate = SelectedDate.Date;
                var endDate = startDate.AddDays(1);
                
                var workOrders = await _databaseService.GetAsync<WorkOrder>(
                    wo => wo.DeliveryDateTime >= startDate && wo.DeliveryDateTime < endDate);
                
                foreach (var workOrder in workOrders)
                {
                    var vehicle = await _databaseService.GetByIdAsync<Vehicle>(workOrder.VehicleId);
                    var customer = await _databaseService.GetByIdAsync<Customer>(vehicle.CustomerId);
                    
                    WorkOrders.Add(new WorkOrderViewModel
                    {
                        Id = workOrder.Id,
                        CustomerName = customer.Name,
                        VehicleMake = vehicle.Make,
                        VehicleModel = vehicle.Model,
                        RegistrationNumber = vehicle.RegistrationNumber,
                        DeliveryTime = workOrder.DeliveryDateTime.TimeOfDay,
                        WorkDescription = workOrder.WorkDescription
                    });
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
        
        [RelayCommand]
        private async Task DateSelected()
        {
            await LoadWorkOrders();
        }
        
        [RelayCommand]
        private async Task WorkOrderSelected(WorkOrderViewModel workOrder)
        {
            if (workOrder == null)
                return;
                
            // Navigate to work details page
            var parameters = new Dictionary<string, object>
            {
                { "WorkOrderId", workOrder.Id }
            };
            
            await Shell.Current.GoToAsync("workdetails", parameters);
        }
    }
    
    public class WorkOrderViewModel : ObservableObject
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string VehicleMake { get; set; }
        public string VehicleModel { get; set; }
        public string RegistrationNumber { get; set; }
        public TimeSpan DeliveryTime { get; set; }
        public string WorkDescription { get; set; }
    }
}