using SQLite;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarWorkshopAwesomeApp.Models;

namespace CarWorkshopAwesomeApp.Services;

public class DatabaseService
{
    private readonly SQLiteAsyncConnection _database;

    public DatabaseService(string dbPath)
    {
        _database = new SQLiteAsyncConnection(dbPath);
        _database.CreateTableAsync<TaskModel>().Wait();
    }

    public Task<List<TaskModel>> GetTasksAsync()
    {
        return _database.Table<TaskModel>().ToListAsync();
    }

    public async Task<List<TaskModel>> GetTasksByDateAsync(DateTime date)
    {
        return await _database.Table<TaskModel>()
            .Where(t => t.HandoverDate.Year == date.Year &&
                        t.HandoverDate.Month == date.Month &&
                        t.HandoverDate.Day == date.Day)
            .ToListAsync();
    }

    public Task<int> SaveTaskAsync(TaskModel task)
    {
        return _database.InsertAsync(task);
    }

    public Task<int> DeleteTaskAsync(TaskModel task)
    {
        return _database.DeleteAsync(task);
    }
}