using API.Database;
using API.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly AppdbContext _context;

        public TaskController(AppdbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();
            return task;
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask([FromBody] TaskDto task)
        {

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // [HttpPost]
        // public async Task<ActionResult<TaskDto>> CreateTask([FromBody] TaskDto task)
        // {
        //     var userId = User.FindFirst("nameid")?.Value; // Use "nameid" from the JWT

        //     if (string.IsNullOrEmpty(userId))
        //     {
        //         return Unauthorized("Invalid or missing user ID in token.");
        //     }

        //     if (task == null)
        //     {
        //         return BadRequest("Task data is missing.");
        //     }

        //     task.UserId = userId; // ✅ Set userId from the token

        //     _context.Tasks.Add(task);
        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        // }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskDto task)
        {
            if (id != task.Id) return BadRequest();

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}