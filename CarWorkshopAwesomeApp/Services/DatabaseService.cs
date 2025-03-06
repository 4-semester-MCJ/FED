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

        public DatabaseService(string dbPath)  // ✅ Ensure this constructor exists only once
        {
            _dbPath = dbPath;
            Console.WriteLine($"📂 Database Path Used: {_dbPath}");

            _database = new SQLiteAsyncConnection(dbPath);

            // ✅ Ensure table creation with updated structure
            _database.CreateTableAsync<TaskModel>().Wait();

            Console.WriteLine("✅ TaskModel table checked/created in database.");
        }

        public async Task<int> SaveTaskAsync(TaskModel task)
        {
            task.HandoverDateString = task.HandoverDate.ToString("yyyy-MM-dd"); // ✅ Store only date

            Console.WriteLine($"💾 Saving task: {task.TaskDescription} - {task.HandoverDateString}");
            Console.WriteLine($"🔍 Saving task to database at: {_dbPath}");
    
            return await _database.InsertAsync(task);
        }

        public async Task<List<TaskModel>> GetTasksByDateAsync(DateTime date)
        {
            string dateString = date.ToString("yyyy-MM-dd"); // ✅ Ensure correct date format

            Console.WriteLine($"🔎 Querying tasks for date: {dateString}");
            Console.WriteLine($"🔍 Querying database at: {_dbPath}");  

            var allTasks = await _database.Table<TaskModel>().ToListAsync();
            Console.WriteLine($"📋 Total tasks in DB: {allTasks.Count}");

            foreach (var task in allTasks)
            {
                Console.WriteLine($"📌 Stored Task: {task.Id} - {task.TaskDescription}, Date: {task.HandoverDateString}");
            }

            var tasks = await _database.QueryAsync<TaskModel>(
                "SELECT * FROM TaskModel WHERE HandoverDateString = ?", dateString
            );

            Console.WriteLine($"✅ Found {tasks.Count} matching tasks");
            return tasks;
        }

        public async Task<int> DeleteTaskAsync(TaskModel task)
        {
            Console.WriteLine($"🗑️ Deleting task: {task.Id} - {task.TaskDescription}");
            return await _database.DeleteAsync(task);
        }
    }
}
