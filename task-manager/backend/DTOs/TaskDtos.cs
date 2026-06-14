using System;
using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public Priority Priority { get; set; } = Priority.Medium;

        public DateTime? DueDate { get; set; }
    }

    public class UpdateTaskDto
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public bool IsCompleted { get; set; }

        [Required]
        public Priority Priority { get; set; }

        public DateTime? DueDate { get; set; }
    }

    public class TaskResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        public string Priority { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
