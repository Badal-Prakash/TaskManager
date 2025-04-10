using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Database;

public class AppdbContext : IdentityDbContext
{
    public AppdbContext(DbContextOptions<AppdbContext> options) : base(options)
    {

    }
    public DbSet<Dto.TaskDto> Tasks { get; set; }
}
