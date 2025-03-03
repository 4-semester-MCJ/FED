// Database/DatabaseService.cs
using SQLite;
using CarWorkshopApp.Models;
using System.Linq.Expressions;

namespace CarWorkshopApp.Database
{
    public class DatabaseService
    {
        private SQLiteAsyncConnection _database;
        
        public DatabaseService()
        {
        }

        public async Task InitializeAsync()
        {
            if (_database != null)
                return;

            // Get the database path
            string dbPath = Path.Combine(FileSystem.AppDataDirectory, "carworkshop.db");
            
            // Create the database connection
            _database = new SQLiteAsyncConnection(dbPath);
            
            // Create tables
            await _database.CreateTableAsync<Customer>();
            await _database.CreateTableAsync<Vehicle>();
            await _database.CreateTableAsync<WorkOrder>();
            await _database.CreateTableAsync<WorkDetails>();
        }

        // Generic methods for database operations
        public async Task<List<T>> GetAllAsync<T>() where T : new()
        {
            await InitializeAsync();
            return await _database.Table<T>().ToListAsync();
        }

        public async Task<List<T>> GetAsync<T>(Expression<Func<T, bool>> predicate) where T : new()
        {
            await InitializeAsync();
            return await _database.Table<T>().Where(predicate).ToListAsync();
        }

        public async Task<T> GetByIdAsync<T>(int id) where T : new()
        {
            await InitializeAsync();
            return await _database.FindAsync<T>(id);
        }

        public async Task<int> SaveAsync<T>(T item)
        {
            await InitializeAsync();
            if (item is BaseModel model && model.Id != 0)
                return await _database.UpdateAsync(item);
            else
                return await _database.InsertAsync(item);
        }

        public async Task<int> DeleteAsync<T>(T item)
        {
            await InitializeAsync();
            return await _database.DeleteAsync(item);
        }
    }
}