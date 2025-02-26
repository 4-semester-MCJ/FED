using SelectImages.Models;
using SQLite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace SelectImages.Data
{
    internal class Database
    {
        // SQLite connection to the database
        private readonly SQLiteAsyncConnection? _connection;

        // Constructor to initialize the database connection
        public Database()
        {
            try
            {
                var ImageDatabase = Path.Combine(@"C:\Users\cchri\Christopher\Skole\4_Semester\fedFrontend\FED\dolan\SelectImages", "StoredImages");

                // Ensure the directory exists
                if (!Directory.Exists(ImageDatabase))
                {
                    Directory.CreateDirectory(ImageDatabase);
                }

                // Define the path for the database file
                var databasePath = Path.Combine(ImageDatabase, "ImageCarousel.db");
                // Create SQLite connection options
                var dbOptions = new SQLiteConnectionString(databasePath, true);
                // Initialize the SQLite connection
                _connection = new SQLiteAsyncConnection(dbOptions);
                // Initialize the database (create tables if they don't exist)
                _ = Initialise();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        // Method to initialize the database (create tables if they don't exist)
        private async Task Initialise()
        {
            try
            {
                if (_connection != null)
                {
                    // Create the ImageInfo table if it doesn't exist
                    await _connection.CreateTableAsync<ImageInfo>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        // Method to retrieve all ImageInfo objects from the database
        public async Task<List<ImageInfo>> GetImageInfos()
        {
            try
            {
                if (_connection != null)
                {
                    // Retrieve all ImageInfo objects from the ImageInfo table
                    return await _connection.Table<ImageInfo>().ToListAsync();
                }
                return new List<ImageInfo>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<ImageInfo>();
            }
        }

        // Method to retrieve a specific ImageInfo object by its ID
        public async Task<ImageInfo> GetImageInfo(int id)
        {
            try
            {
                if (_connection != null)
                {
                    // Retrieve the ImageInfo object with the specified ID
                    var query = _connection.Table<ImageInfo>().Where(t => t.Id == id);
                    return await query.FirstOrDefaultAsync();
                }
                return new ImageInfo();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new ImageInfo();
            }
        }

        // Method to add a new ImageInfo object to the database
        public async Task<int> AddImageInfo(ImageInfo item)
        {
            try
            {
                if (_connection != null)
                {
                    // Insert the new ImageInfo object into the ImageInfo table
                    return await _connection.InsertAsync(item);
                }
                return 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }

        // Method to delete an ImageInfo object from the database
        public async Task<int> DeleteImageInfo(ImageInfo item)
        {
            try
            {
                if (_connection != null)
                {
                    // Delete the specified ImageInfo object from the ImageInfo table
                    return await _connection.DeleteAsync(item);
                }
                return 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }

        // Method to update an existing ImageInfo object in the database
        public async Task<int> UpdateImageInfo(ImageInfo item)
        {
            try
            {
                if (_connection != null)
                {
                    // Update the specified ImageInfo object in the ImageInfo table
                    return await _connection.UpdateAsync(item);
                }
                return 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return 0;
            }
        }

        // Method to add a new ImageInfo object to the database (wrapper for AddImageInfo)
        public void AddImage(ImageInfo imageInfo)
        {
            _ = AddImageInfo(imageInfo);
        }
    }
}
