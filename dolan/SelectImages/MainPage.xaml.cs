using System.Collections.ObjectModel;
using Microsoft.Maui.Controls;
using SelectImages.Data;
using SelectImages.Models;
using SQLite;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SelectImages
{
    public partial class MainPage : ContentPage
    {
        private Database _database;
        public ObservableCollection<ImageInfo> Images { get; set; } = new();
        private string? _imagePath;

        public MainPage()
        {
            InitializeComponent();
            _database = new Database();
            BindingContext = this;

            // Load images from the database
            LoadImagesFromDatabase();
        }

        private async void LoadImagesFromDatabase()
        {
            var images = await _database.GetImageInfos();
            foreach (var image in images)
            {
                Images.Add(image);
            }
        }

        private async void OnSelectImagesClicked(object sender, EventArgs e)
        {
            var image = await FilePicker.Default.PickAsync(new PickOptions
            {
                PickerTitle = "Pick Image",
                FileTypes = FilePickerFileType.Images
            });

            if (image != null)
            {
                // Define the folder path for saving images
                var rootPath = AppDomain.CurrentDomain.BaseDirectory; // Gets project root
                var folderPath = Path.Combine(rootPath, "DatabaseImages");

				Console.WriteLine("Images are saved in: " + folderPath);


                // Ensure the directory exists
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                // Define the path for the new image file in the DatabaseImages folder
                var newImagePath = Path.Combine(folderPath, image.FileName);

                using (var sourceStream = await image.OpenReadAsync())
                using (var targetStream = File.Create(newImagePath))
                {
                    await sourceStream.CopyToAsync(targetStream);
                }

                _imagePath = newImagePath; // Use the new image path
                Image.Source = _imagePath;
            }
        }

        private async void OnAddClicked(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(_imagePath))
            {
                // Create a new ImageInfo object and set its properties
                var newImageInfo = new ImageInfo
                {
                    ImagePath = _imagePath,
                    ImageTitle = Entry.Text, // Use Entry text as the image name
                    Description = Editor.Text // Use Editor text as the description
                };

                // Add the new ImageInfo object to the Images collection
                Images.Add(newImageInfo);

                // Insert the new ImageInfo object into the database
                await _database.AddImageInfo(newImageInfo);

                // Reset the controls (e.g., Image and any text boxes)
                Image.Source = null; // Remove the displayed image
                _imagePath = null; // Reset the path
                Entry.Text = string.Empty; // Clear the Entry text
                Editor.Text = string.Empty; // Clear the Editor text
            }
        }
    }
}
