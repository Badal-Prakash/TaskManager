using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dto;

public enum TaskStatus
{
    ToDo,
    InProgress,
    Done
}

public class TaskDto
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    [Required]
    public string? UserId { get; set; }
    [Required]
    public string Status { get; set; } = "ToDo";
}
