using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTOs;

namespace backend.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskResponseDto>> GetTasksForUserAsync(int userId);
        Task<TaskResponseDto?> GetTaskByIdAsync(int id, int userId);
        Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createTaskDto, int userId);
        Task<TaskResponseDto?> UpdateTaskAsync(int id, UpdateTaskDto updateTaskDto, int userId);
        Task<bool> DeleteTaskAsync(int id, int userId);
        Task<TaskResponseDto?> ToggleCompleteAsync(int id, int userId);
    }
}
