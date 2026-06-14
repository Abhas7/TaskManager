using System;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            int userId = GetUserId();
            var tasks = await _taskService.GetTasksForUserAsync(userId);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            int userId = GetUserId();
            var task = await _taskService.GetTaskByIdAsync(id, userId);
            if (task == null)
            {
                return NotFound(new { message = "Task not found." });
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto createTaskDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int userId = GetUserId();
            var task = await _taskService.CreateTaskAsync(createTaskDto, userId);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskDto updateTaskDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int userId = GetUserId();
            var updatedTask = await _taskService.UpdateTaskAsync(id, updateTaskDto, userId);
            if (updatedTask == null)
            {
                return NotFound(new { message = "Task not found or you are not authorized to edit it." });
            }

            return Ok(updatedTask);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            int userId = GetUserId();
            bool deleted = await _taskService.DeleteTaskAsync(id, userId);
            if (!deleted)
            {
                return NotFound(new { message = "Task not found or you are not authorized to delete it." });
            }

            return Ok(new { message = "Task deleted successfully." });
        }

        [HttpPatch("{id}/complete")]
        public async Task<IActionResult> ToggleComplete(int id)
        {
            int userId = GetUserId();
            var updatedTask = await _taskService.ToggleCompleteAsync(id, userId);
            if (updatedTask == null)
            {
                return NotFound(new { message = "Task not found or you are not authorized to edit it." });
            }

            return Ok(updatedTask);
        }

        private int GetUserId()
        {
            string? userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdStr) || !int.TryParse(userIdStr, out int userId))
            {
                throw new UnauthorizedAccessException("User is not authenticated or user claim is invalid.");
            }
            return userId;
        }
    }
}
