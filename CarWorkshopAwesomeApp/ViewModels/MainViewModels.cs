using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace CarWorkshopAwesomeApp.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    private string _message = "Welcome to This Awesome Car Workshop App!";

    public string Message
    {
        get => _message;
        set
        {
            if (_message != value)
            {
                _message = value;
                OnPropertyChanged();
            }
        }
    }

    public event PropertyChangedEventHandler? PropertyChanged = delegate { }; // Initialize properly

    protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
