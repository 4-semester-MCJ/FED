using SQLite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using CarWorkshopAwesomeApp.Models;

namespace CarWorkshopAwesomeApp.Services
{
    public class DatabaseService
    {
        private readonly SQLiteAsyncConnection _database;
        private readonly string _dbPath;

        public DatabaseService(string dbPath)
        {
            _dbPath = dbPath;
            _database = new SQLiteAsyncConnection(dbPath);

            // Ensure table creation with updated structure
            _database.CreateTableAsync<TaskModel>().Wait();
        }

        public async Task<int> SaveTaskAsync(TaskModel task)
        {
            task.HandoverDateString = task.HandoverDate.ToString("yyyy-MM-dd"); // Store only date
            return await _database.InsertAsync(task);
        }

        public async Task<List<TaskModel>> GetTasksByDateAsync(DateTime date)
        {
            string dateString = date.ToString("yyyy-MM-dd"); // Ensure correct date format
            var allTasks = await _database.Table<TaskModel>().ToListAsync();
            var tasks = await _database.QueryAsync<TaskModel>(
                "SELECT * FROM TaskModel WHERE HandoverDateString = ?", dateString
            );
            return tasks;
        }

        public async Task<int> DeleteTaskAsync(TaskModel task)
        {
            return await _database.DeleteAsync(task);
        }
    }
}
