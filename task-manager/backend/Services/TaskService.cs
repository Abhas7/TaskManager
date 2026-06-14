using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskResponseDto>> GetTasksForUserAsync(int userId)
        {
            var tasks = await _context.Tasks
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            return tasks.Select(MapToResponseDto);
        }

        public async Task<TaskResponseDto?> GetTaskByIdAsync(int id, int userId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (task == null)
            {
                return null;
            }

            return MapToResponseDto(task);
        }

        public async Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createTaskDto, int userId)
        {
            var task = new TaskItem
            {
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                Priority = createTaskDto.Priority,
                DueDate = createTaskDto.DueDate,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow,
                UserId = userId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return MapToResponseDto(task);
        }

        public async Task<TaskResponseDto?> UpdateTaskAsync(int id, UpdateTaskDto updateTaskDto, int userId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (task == null)
            {
                return null;
            }

            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;
            task.IsCompleted = updateTaskDto.IsCompleted;
            task.Priority = updateTaskDto.Priority;
            task.DueDate = updateTaskDto.DueDate;

            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();

            return MapToResponseDto(task);
        }

        public async Task<bool> DeleteTaskAsync(int id, int userId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (task == null)
            {
                return false;
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<TaskResponseDto?> ToggleCompleteAsync(int id, int userId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (task == null)
            {
                return null;
            }

            task.IsCompleted = !task.IsCompleted;

            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();

            return MapToResponseDto(task);
        }

        private static TaskResponseDto MapToResponseDto(TaskItem task)
        {
            return new TaskResponseDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                IsCompleted = task.IsCompleted,
                Priority = task.Priority.ToString(),
                DueDate = task.DueDate,
                CreatedAt = task.CreatedAt
            };
        }
    }
}
