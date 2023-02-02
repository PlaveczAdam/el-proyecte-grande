using el_proyecte_grande_backend.Configurations;
using el_proyecte_grande_backend.Data;
using el_proyecte_grande_backend.Repositories.HotelNs;
using el_proyecte_grande_backend.Repositories.Room;
using el_proyecte_grande_backend.Repositories.Reservations;

using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string connectionString = builder.Configuration["ConnectionStrings:GrandeHotelConnection"];

builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<GrandeHotelContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IHotelRepository, HotelRepository>();
builder.Services.AddAutoMapper(typeof(AutoMapperConfiguration));

var app = builder.Build();
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
