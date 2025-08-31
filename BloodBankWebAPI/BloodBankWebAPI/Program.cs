using BloodBankWebAPI.Data;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("con")));
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReactApp",
        policy => {
            policy.AllowAnyOrigin()
         .AllowAnyHeader().AllowAnyMethod();
        });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();
app.Run();